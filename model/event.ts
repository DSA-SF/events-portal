import { DateTime } from "luxon";

export interface CalendarEvent {
  id: string;
  title: string;
  calendarName: string;
  startTime: Date;
  endTime: Date;

  source: 'google-calendar' | 'zoom' | 'draft';
}

type RequiredOnly<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>;
