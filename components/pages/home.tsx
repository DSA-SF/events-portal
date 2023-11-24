"use client"
import React, { useEffect, useState } from 'react';
import UIPage from "../ui/page";
import EventPrimaryFields from '../ui/EventPrimaryFields';
import GoogleCalendarSection from '../ui/google-calendar/GoogleCalendarSection';
import { fetchEvents } from '../../utils/google-calendar/events';
import { CalendarEvent, GoogleCalendarEvent } from "../../model/event";
import { DateTime } from 'luxon';
import { CalendarDetails, fetchCalendarDetails } from '../../utils/google-calendar/calendar';
import { ZoomAccount, ZoomMeeting, getAllUserMeetings, getLicensedUsers } from '../../utils/zoom';
import ZoomSection from '../ui/zoom/ZoomSection';

interface HomeProps {
  googleCalendarEvents: GoogleCalendarEvent[];
  googleCalendarDetails: CalendarDetails[];
  zoomAccounts: ZoomAccount[];
  zoomMeetings: ZoomMeeting[];
}

export default function Home({ googleCalendarEvents, googleCalendarDetails, zoomAccounts, zoomMeetings }: HomeProps) {
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


          {/* You can continue with other components or form fields here */}
        </form>
      </UIPage.Body>
    </UIPage>
  )
}
