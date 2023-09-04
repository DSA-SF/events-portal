export interface GoogleCalendarEvent {
  id: string;
  summary: string;
  organizer: { displayName: string };
  start: { dateTime: string };
  end: { dateTime: string };
}


