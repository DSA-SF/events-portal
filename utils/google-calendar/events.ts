import { GoogleCalendarEvent } from './types';
import { CalendarEvent } from "../../model/event";
import { calendar } from './calendar'; // Adjust this import path if needed
import { DateTime } from 'luxon';

export const fetchEvents: () => Promise<(CalendarEvent & { source: 'google-calendar' })[]> = async () => {
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

  const allEvents: GoogleCalendarEvent[] = eventResults.reduce((acc: any[], eventResult: any) => {
    return acc.concat(eventResult.data.items || []);
  }, [] as any[]);

  const customEvents: (CalendarEvent & { source: 'google-calendar' })[] = allEvents.map(event => ({
    id: event.id,
    title: event.summary,
    calendarName: event.organizer.displayName,
    startTime: DateTime.fromISO(event.start.dateTime).toJSDate(),
    endTime: DateTime.fromISO(event.end.dateTime).toJSDate(),
    source: 'google-calendar',
  }));

  return customEvents;
};
