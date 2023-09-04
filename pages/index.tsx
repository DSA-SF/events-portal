import React, { useEffect, useState } from 'react';
import UIPage from "../components/ui/page";
import EventPrimaryFields from '../components/ui/EventPrimaryFields';
import GoogleCalendarSection from '../components/ui/google-calendar/GoogleCalendarSection';
import { fetchEvents } from '../utils/google-calendar/events';
import { CalendarEvent } from "../model/event";
import { DateTime } from 'luxon';
import { CalendarDetails, fetchCalendarDetails } from '../utils/google-calendar/calendar';

interface IndexProps {
  events: CalendarEvent[];
  googleCalendarDetails: CalendarDetails[];
}

export default function Page({ events, googleCalendarDetails }: IndexProps) {
  // State hooks for event primary fields
  const [eventName, setEventName] = useState<string>('');
  const [startTime, setStartTime] = useState<Date>(
    DateTime.now().plus({ days: 5 }).set({ hour: 18, minute: 0, second: 0 }).setZone('America/Los_Angeles').toJSDate()
  );
  const [duration, setDuration] = useState<number>(60);
  const [eventType, setEventType] = useState<'Online' | 'In-person' | 'Hybrid'>('Online');
  const [location, setLocation] = useState<string>('');

  const [destinationCalendar, setDestinationCalendar] = useState<'Public' | 'Internal'>('Public');
  const [isGoogleCalendarActivated, setIsGoogleCalendarActivated] = useState<boolean>(true);

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
            destinationCalendar={destinationCalendar}
            onDestinationCalendarChange={setDestinationCalendar}
            isActivated={isGoogleCalendarActivated}
            onToggleActivation={() => setIsGoogleCalendarActivated(prevState => !prevState)}
            existingEvents={events}
            draftEvent={draftEvent}
          />

          {/* You can continue with other components or form fields here */}
        </form>
      </UIPage.Body>
    </UIPage>
  )
}

export async function getServerSideProps() {
  const events = await fetchEvents();
  const googleCalendarDetails = await fetchCalendarDetails();
  return { props: { events, googleCalendarDetails } };
}
