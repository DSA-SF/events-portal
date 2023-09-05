import { DateTime } from "luxon";

export interface CalendarableEvent {
  title: string;
  startTime: Date;
  endTime: Date;
  source: 'google-calendar' | 'zoom' | 'draft';
}

export type DraftEvent = Partial<CalendarableEvent> & Partial<{
  destinationCalendarId: string;
  destinationZoomAccountId: string;
  source: 'draft';
}>

export type ZoomMeeting = CalendarableEvent & Identifiable & {
  zoomAccountId: string;
  agenda: string;
  topic: string;
  meetingType: string;
  source: 'zoom';
}

export type GoogleCalendarEvent = CalendarableEvent & Identifiable & {
  calendarId: string;
  source: 'google-calendar';
}

export type Identifiable = {
  id: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  calendarName?: string;
  zoomAccountName?: string;
  startTime: Date;
  endTime: Date;

  source: 'google-calendar' | 'zoom' | 'draft';
}

type RequiredOnly<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>;
