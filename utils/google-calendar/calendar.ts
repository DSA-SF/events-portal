import { google } from 'googleapis';
import { Buffer } from 'buffer';

// Load base64 encoded credentials from .env
const credentialsBase64 = process.env.GOOGLE_CALENDAR_CREDENTIAL_BASE64;

if (!credentialsBase64) {
  throw new Error('The GOOGLE_CALENDAR_CREDENTIAL_BASE64 environment variable is not set.');
}

// Decode and parse credentials
const credentials = JSON.parse(Buffer.from(credentialsBase64, 'base64').toString('utf-8'));

// Extract necessary fields
const { client_email, private_key } = credentials;

// Initialize auth object
const auth = new google.auth.JWT(
  client_email,
  null,
  private_key,
  ['https://www.googleapis.com/auth/calendar'],
  null
);

// Initialize and export Google Calendar API client
export const calendar = google.calendar({ version: 'v3', auth });
