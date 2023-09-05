import { GoogleCalendarApiEvent } from './types';
import { CalendarEvent, GoogleCalendarEvent } from "../../model/event";
import { calendar } from './calendar'; // Adjust this import path if needed
import { DateTime } from 'luxon';

export const fetchEvents: () => Promise<GoogleCalendarEvent[]> = async () => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const calendarIds = process.env.GOOGLE_CALENDAR_IDS?.split(",");
  if (!calendarIds) {
    throw new Error('The GOOGLE_CALENDAR_IDS environment variable is not set.');
  }

  const eventFetchPromises = calendarIds.map((calendarId: string) => {
    return calendar.events.list({
      calendarId: calendarId.trim(),
      timeMin: sevenDaysAgo.toISOString(),
      maxResults: 500,
      singleEvents: true,
      orderBy: 'startTime',
    });
  });

  const eventResults = await Promise.all(eventFetchPromises);

  const allEvents: GoogleCalendarApiEvent[] = eventResults.reduce((acc: any[], eventResult: any) => {
    return acc.concat(eventResult.data.items || []);
  }, [] as any[]);

  const customEvents: GoogleCalendarEvent[] = allEvents.map(event => ({
    id: event.id,
    title: event.summary,
    calendarId: event.organizer.id,
    startTime: DateTime.fromISO(event.start.dateTime).toJSDate(),
    endTime: DateTime.fromISO(event.end.dateTime).toJSDate(),
    source: 'google-calendar',
  }));

  return customEvents;
};
