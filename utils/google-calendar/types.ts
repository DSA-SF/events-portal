export interface GoogleCalendarApiEvent {
  id: string;
  summary: string;
  organizer: { displayName: string; id: string };
  start: { dateTime: string };
  end: { dateTime: string };
}
