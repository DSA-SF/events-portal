"use server";
import { google } from 'googleapis';
import { Buffer } from 'buffer';
import {getRedisClient }from '../redis';

// Load base64 encoded credentials from .env
const credentialsBase64 = process.env.GOOGLE_CALENDAR_CREDENTIAL_BASE64;

if (typeof window !== 'undefined' && !credentialsBase64) {
  throw new Error('The GOOGLE_CALENDAR_CREDENTIAL_BASE64 environment variable is not set.');
}

// Decode and parse credentials
const credentials = !!credentialsBase64 && JSON.parse(Buffer.from(credentialsBase64, 'base64').toString('utf-8'));

// Extract necessary fields
const { client_email, private_key } = credentials;

// Initialize auth object
const auth = new google.auth.JWT(
  client_email,
  undefined,
  private_key,
  ['https://www.googleapis.com/auth/calendar'],
  undefined
);

// Initialize and export Google Calendar API client
const calendar = google.calendar({ version: 'v3', auth });

export async function getGoogleCalendarClient() {
  return calendar;
}

export interface CalendarDetails {
  id: string;
  name: string;
  accessRole: 'reader' | 'writer' | 'owner' | 'none';
}

async function insertCalendarToAccountCalendarList(calendarId: string) {
  await calendar.calendarList.insert({ requestBody: { id: calendarId } })
}

export async function fetchCalendarDetailsById(calendarIds: string[]): Promise<Record<string, CalendarDetails>> {
  const redis = await getRedisClient();
  const calendarDetails: Record<string, CalendarDetails> = {};


  // Check Redis for cached details
  const fetchPromises = calendarIds.map(async (id) => {
    const cachedDetail = await redis.get(id);
    if (cachedDetail) {
      calendarDetails[id] = JSON.parse(cachedDetail);
    }
    return cachedDetail === null ? id : null;
  });

  // Get list of calendarIds not found in cache
  const results = await Promise.all(fetchPromises);
  const idsNotInCache = results.filter(id => id !== null) as string[];


  if (idsNotInCache.length > 0) {
    // Fetch details from Google Calendar API for ids not found in cache
    const apiFetchPromises = idsNotInCache.map(async (id) => {
      try {
        // The calendar must be added to the service account's calendar list to fetch its details
        // Re-adding an existing calendar has no effect, so we do it
        await insertCalendarToAccountCalendarList(id);
        const res = await calendar.calendarList.get({ calendarId: id });
        const details: CalendarDetails = {
          id: res.data.id || id,
          name: res.data.summary || 'No Name',
          accessRole: (res.data.accessRole as any) || 'none',
        };

        // Save details in Redis and in the result object
        await redis.set(id, JSON.stringify(details), "EX", 60 * 3);
        calendarDetails[id] = details;
      } catch (error) {
        console.error(`Failed to fetch details for calendar ID ${id}:`, error);
        calendarDetails[id] = { id, name: 'Error', accessRole: 'none' };
      }
    });

    await Promise.all(apiFetchPromises);
  }

  return calendarDetails;
}

export async function fetchCalendarDetails(): Promise<Record<string, CalendarDetails>> {
  if (!process.env.GOOGLE_CALENDAR_IDS || process.env.GOOGLE_CALENDAR_IDS.split(',').length === 0) {
    return {}
  }
  return fetchCalendarDetailsById(process.env.GOOGLE_CALENDAR_IDS.split(','))
}