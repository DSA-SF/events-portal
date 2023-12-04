"use client"
import React, { useEffect, useState } from 'react';
import UIPage from "../ui/page";
import EventPrimaryFields from '../ui/EventPrimaryFields';
import GoogleCalendarSection from '../ui/google-calendar/GoogleCalendarSection';
import { fetchGoogleCalendarEvents,  } from '../../utils/google-calendar/events';
import { CalendarEvent, GoogleCalendarEvent, ZoomMeeting } from "../../model/event";
import { DateTime } from 'luxon';
import { GoogleCalendarDetails, fetchGoogleCalendarDetails } from '../../utils/google-calendar/calendar';
import { ZoomAccount, getAllUserMeetings, getLicensedUsers } from '../../utils/zoom';
import ZoomSection from '../ui/zoom/ZoomSection';
import { useUser } from '@auth0/nextjs-auth0/client';
import ActionNetworkSection from '../ui/action-network/ActionNetorkSection';
import { ActionNetwork, OsdiEvent } from '../../utils/action-network/actionNetworkInterface';

interface HomeProps {
  googleCalendarEvents: GoogleCalendarEvent[];
  googleCalendarDetails: GoogleCalendarDetails[];
  zoomAccounts: ZoomAccount[];
  zoomMeetings: ZoomMeeting[];
  actionNetworkEvents: OsdiEvent[];
}

export default function Home({ googleCalendarEvents, googleCalendarDetails, zoomAccounts, zoomMeetings, actionNetworkEvents }: HomeProps) {
  const { user, error, isLoading } = useUser();
  const [eventName, setEventName] = useState<string>('');
  const [startTime, setStartTime] = useState<Date>(
    DateTime.now().plus({ days: 5 }).set({ hour: 18, minute: 0, second: 0 }).setZone('America/Los_Angeles').toJSDate()
  );
  const [duration, setDuration] = useState<number>(60);
  const [eventType, setEventType] = useState<'Online' | 'In-person' | 'Hybrid'>('Online');
  const [location, setLocation] = useState<string>('');

  const [destinationCalendar, setDestinationCalendar] = useState<string | undefined>();
  const [isGoogleCalendarActivated, setIsGoogleCalendarActivated] = useState<boolean>(false /* true */);

  const [destinationZoomAccountId, setDestinationZoomAccountId] = useState<string | undefined>();
  const [isZoomActivated, setIsZoomActivated] = useState<boolean>(true);


  const draftEvent: Partial<CalendarEvent> & { source: 'draft' } = {
    title: eventName,
    startTime,
    endTime: startTime && DateTime.fromJSDate(startTime).plus({ minutes: duration }).toJSDate(),
    source: 'draft',
  }

  return (
    <UIPage>
      <UIPage.Body>
        <div>{user && <span>Signed in as {user?.email}</span>}</div>
        {/* Form */}
        <form>
          <EventPrimaryFields
            eventName={eventName}
            onEventNameChange={setEventName}
            startTime={startTime}
            onStartTimeChange={setStartTime}
            duration={duration}
            onDurationChange={setDuration}
            eventType={eventType}
            onEventTypeChange={setEventType}
            location={location}
            onLocationChange={setLocation}
          />

          <GoogleCalendarSection
            calendarDetails={googleCalendarDetails}
            destinationCalendarId={destinationCalendar}
            onDestinationCalendarChange={setDestinationCalendar}
            isActivated={isGoogleCalendarActivated}
            onToggleActivation={() => setIsGoogleCalendarActivated(prevState => !prevState)}
            existingEvents={googleCalendarEvents}
            draftEvent={draftEvent}
          />

          <ZoomSection
            accounts={zoomAccounts}
            destinationAccountId={"abc"}
            onDestinationAccountChange={setDestinationCalendar}
            isActivated={isZoomActivated}
            onToggleActivation={() => setIsZoomActivated(prevState => !prevState)}
            existingMeetings={zoomMeetings}
            draftEvent={draftEvent}
          />
          <ActionNetworkSection
            calendarDetails={googleCalendarDetails}
            destinationCalendarId={destinationCalendar}
            onDestinationCalendarChange={setDestinationCalendar}
            isActivated={isGoogleCalendarActivated}
            onToggleActivation={() => setIsGoogleCalendarActivated(prevState => !prevState)}
            existingEvents={actionNetworkEvents}
            draftEvent={draftEvent}
          />


          {/* You can continue with other components or form fields here */}
        </form>
      </UIPage.Body>
    </UIPage>
  )
}
