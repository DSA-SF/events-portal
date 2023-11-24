
import Home from "../components/pages/home";
import EventPrimaryFields from '../components/ui/EventPrimaryFields';
import GoogleCalendarSection from '../components/ui/google-calendar/GoogleCalendarSection';
import { fetchEvents } from '../utils/google-calendar/events';
import { CalendarEvent, GoogleCalendarEvent, ZoomMeeting } from "../model/event";
// import { DateTime } from 'luxon';
import { CalendarDetails, fetchCalendarDetails } from '../utils/google-calendar/calendar';
import { ZoomAccount, getAllUserMeetings, getLicensedUsers } from '../utils/zoom';
import ZoomSection from '../components/ui/zoom/ZoomSection';

// interface IndexProps {
//   googleCalendarEvents: GoogleCalendarEvent[];
//   googleCalendarDetails: CalendarDetails[];
//   zoomAccounts: ZoomAccount[];
//   zoomMeetings: ZoomMeeting[];
// }

export default async function Page() {

  const pageData: any = await fetchData();

  if (pageData) {
    return <Home {...pageData}/>
  }

  return 'loading...';
}

async function fetchData () {
  const googleCalendarEvents = await fetchEvents();
  const googleCalendarDetails = await fetchCalendarDetails();
  const zoomAccounts: ZoomAccount[] = await getLicensedUsers();
  const zoomMeetings: ZoomMeeting[] = await getAllUserMeetings(zoomAccounts);

  return { googleCalendarEvents, googleCalendarDetails, zoomAccounts, zoomMeetings };
}
