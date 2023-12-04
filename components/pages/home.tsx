'use client';
import React, { useEffect, useState } from 'react';
import UIPage from '../ui/page';
import EventPrimaryFields from '../ui/EventPrimaryFields';
import GoogleCalendarSection from '../ui/google-calendar/GoogleCalendarSection';
import { fetchGoogleCalendarEvents } from '../../utils/google-calendar/events';
import {
  CalendarEvent,
  GoogleCalendarEvent,
  ZoomMeeting,
} from '../../model/event';
import { DateTime } from 'luxon';
import {
  GoogleCalendarDetails,
  fetchGoogleCalendarDetails,
} from '../../utils/google-calendar/calendar';
import {
  ZoomAccount,
  getAllUserMeetings,
  getLicensedUsers,
} from '../../utils/zoom';
import ZoomSection from '../ui/zoom/ZoomSection';
import { useUser } from '@auth0/nextjs-auth0/client';

interface HomeProps {
  googleCalendarEvents: GoogleCalendarEvent[];
  googleCalendarDetails: GoogleCalendarDetails[];
  zoomAccounts: ZoomAccount[];
  zoomMeetings: ZoomMeeting[];
}

export default function Home({
  googleCalendarEvents,
  googleCalendarDetails,
  zoomAccounts,
  zoomMeetings,
}: HomeProps) {
  const { user, error, isLoading } = useUser();
  const [eventName, setEventName] = useState<string>('');
  const [startTime, setStartTime] = useState<Date>(
    DateTime.now()
      .plus({ days: 5 })
      .set({ hour: 18, minute: 0, second: 0 })
      .setZone('America/Los_Angeles')
      .toJSDate(),
  );
  const [duration, setDuration] = useState<number>(60);
  const [eventType, setEventType] = useState<'Online' | 'In-person' | 'Hybrid'>(
    'Online',
  );
  const [location, setLocation] = useState<string>('');

  const [destinationCalendar, setDestinationCalendar] = useState<
    string | undefined
  >();
  const [isGoogleCalendarActivated, setIsGoogleCalendarActivated] =
    useState<boolean>(false /* true */);

  const [destinationZoomAccountId, setDestinationZoomAccountId] = useState<
    string | undefined
  >();
  const [isZoomActivated, setIsZoomActivated] = useState<boolean>(true);

  const [createEventResult, setCreateEventResult] = useState<
    any | undefined
  >();

  const draftEvent: Partial<CalendarEvent> & { source: 'draft' } = {
    title: eventName,
    startTime,
    endTime:
      startTime &&
      DateTime.fromJSDate(startTime).plus({ minutes: duration }).toJSDate(),
    source: 'draft',
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const endTime =
      startTime &&
      DateTime.fromJSDate(startTime).plus({ minutes: duration }).toJSDate();

    const googleCalendarEvent = isGoogleCalendarActivated
      ? {
          title: eventName,
          location: eventType === 'Online' ? undefined : location,
          calendarId: destinationCalendar,
        }
      : undefined;

    const zoomMeeting = isZoomActivated
      ? {
          title: eventName,
          startTime,
          endTime,
          accountId: destinationZoomAccountId,
        }
      : undefined;

    try {
      const response = await fetch('/api/createEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventType,
          title: eventName,
          startTime,
          duration,
          googleCalendarEvent,
          zoomMeeting,
        }),
      });

      const result = (await response.json()) as any;
      console.log(result);
      if (result.status === 'success') {
        setCreateEventResult(result);
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <UIPage>
      <UIPage.Body>
        <div>{user && <span>Signed in as {user?.email}</span>}</div>
        <form onSubmit={handleSubmit}>
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
            onToggleActivation={() =>
              setIsGoogleCalendarActivated((prevState) => !prevState)
            }
            existingEvents={googleCalendarEvents}
            draftEvent={draftEvent}
          />

          <ZoomSection
            accounts={zoomAccounts}
            destinationAccountId={'abc'}
            onDestinationAccountChange={setDestinationZoomAccountId}
            isActivated={isZoomActivated}
            onToggleActivation={() =>
              setIsZoomActivated((prevState) => !prevState)
            }
            existingMeetings={zoomMeetings}
            draftEvent={draftEvent}
          />

          <button type="submit">Submit</button>
        </form>
      </UIPage.Body>
    </UIPage>
  );
}
