'use server';
import Home from '../components/pages/home';
import EventPrimaryFields from '../components/ui/EventPrimaryFields';
import GoogleCalendarSection from '../components/ui/google-calendar/GoogleCalendarSection';
import { fetchGoogleCalendarEvents } from '../utils/google-calendar/events';
import {
  CalendarEvent,
  GoogleCalendarEvent,
  ZoomMeeting,
} from '../model/event';
// import { DateTime } from 'luxon';
import {
  GoogleCalendarDetails,
  fetchGoogleCalendarDetails,
} from '../utils/google-calendar/calendar';
import {
  ZoomAccount,
  getAllUserMeetings,
  getLicensedUsers,
} from '../utils/zoom';
import ZoomSection from '../components/ui/zoom/ZoomSection';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

interface IndexProps {
  googleCalendarEvents: GoogleCalendarEvent[];
  googleCalendarDetails: GoogleCalendarDetails[];
  zoomAccounts: ZoomAccount[];
  zoomMeetings: ZoomMeeting[];
}

async function Page() {
  const pageData = await fetchData();
  return <Home {...pageData} />;
}

export default withPageAuthRequired(Page);

async function fetchData(): Promise<IndexProps> {
  const googleCalendarEvents = await fetchGoogleCalendarEvents();
  const googleCalendarDetails = await fetchGoogleCalendarDetails();
  const zoomAccounts: ZoomAccount[] = await getLicensedUsers();
  const zoomMeetings: ZoomMeeting[] = await getAllUserMeetings(zoomAccounts);

  return {
    googleCalendarEvents,
    googleCalendarDetails: Object.values(googleCalendarDetails),
    zoomAccounts,
    zoomMeetings,
  };
}
