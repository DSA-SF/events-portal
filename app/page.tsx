"use server";
import Home from "../components/pages/home";
import EventPrimaryFields from '../components/ui/EventPrimaryFields';
import GoogleCalendarSection from '../components/ui/google-calendar/GoogleCalendarSection';
import { fetchEvents } from '../utils/google-calendar/events';
import { CalendarEvent, GoogleCalendarEvent, ZoomMeeting } from "../model/event";
// import { DateTime } from 'luxon';
import { GoogleCalendarDetails, fetchGoogleCalendarDetails } from '../utils/google-calendar/calendar';
import { ZoomAccount, getAllUserMeetings, getLicensedUsers } from '../utils/zoom';
import ZoomSection from '../components/ui/zoom/ZoomSection';

interface IndexProps {
  googleCalendarEvents: GoogleCalendarEvent[];
  googleCalendarDetails: GoogleCalendarDetails[];
  zoomAccounts: ZoomAccount[];
  zoomMeetings: ZoomMeeting[];
}

export default  async function Page() {
  const pageData = await fetchData();
    return <Home {...pageData}/>
}

async function fetchData(): Promise<IndexProps> {
  const googleCalendarEvents = await fetchEvents();
  const googleCalendarDetails: any = [];//await fetchCalendarDetails();
  const zoomAccounts: ZoomAccount[] = await getLicensedUsers();
  const zoomMeetings: ZoomMeeting[] = await getAllUserMeetings(zoomAccounts);

  return { googleCalendarEvents, googleCalendarDetails, zoomAccounts, zoomMeetings };
}
