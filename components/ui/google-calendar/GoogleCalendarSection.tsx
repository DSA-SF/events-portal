import React, { useState } from 'react';
import CollapsibleSection from '../CollapsibleSection';
import { CalendarEvent } from "../../../model/event";
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { getColorForEvent, newEventColor } from '../colors';

interface GoogleCalendarSectionProps {
  destinationCalendar: 'Public' | 'Internal';
  onDestinationCalendarChange: (value: 'Public' | 'Internal') => void;
  isActivated: boolean;
  onToggleActivation: () => void;
  additionalStyles?: string;
  existingEvents: CalendarEvent[];

  draftEvent?: Partial<CalendarEvent> & { source: 'draft' };
}

const GoogleCalendarSection: React.FC<GoogleCalendarSectionProps> = ({
  destinationCalendar,
  onDestinationCalendarChange,
  isActivated,
  onToggleActivation,
  existingEvents,
  draftEvent,
  additionalStyles = "",
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const draftIsDisplayable = draftEvent && draftEvent.title && draftEvent.startTime && draftEvent.endTime;
  type DisplayableEvent = (Partial<CalendarEvent> & { source: 'draft' }) | (CalendarEvent & { source: 'google-calendar' });
  const allEvents =
    (draftIsDisplayable ? ([draftEvent] as Partial<CalendarEvent>[]).concat(existingEvents) : existingEvents) as DisplayableEvent[]
  console.log(draftEvent)
  console.log(allEvents)

  return (
    <CollapsibleSection
      title="Google Calendar"
      isChecked={isActivated}
      onToggleChecked={onToggleActivation}
      additionalStyles={additionalStyles}
    >
      <div className="p-4">
        <div className="mb-4 relative flex items-center">
          <label className="block text-sm font-medium text-gray-700 pr-2">Destination Calendar</label>
          <select
            value={destinationCalendar}
            onChange={(e) => onDestinationCalendarChange(e.target.value as 'Public' | 'Internal')}
            className="mt-1 p-2 border rounded-md flex-grow"
          >
            <option value="Public">Public</option>
            <option value="Internal">Internal</option>
          </select>

          <button
            className="ml-2 bg-gray-300 rounded-full p-1 hover:bg-gray-400"
            onMouseOver={() => setIsTooltipVisible(true)}
            onMouseOut={() => setIsTooltipVisible(false)}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
          >
            ?
          </button>

          {isTooltipVisible && (
            <div className="absolute right-0 mt-6 p-2 bg-white shadow-lg rounded-md">
              <p>Public calendar is accessible to everyone. Internal is restricted to dues-paying members.</p>
            </div>
          )}
        </div>

        <div className="mb-4">
          <FullCalendar
            plugins={[timeGridPlugin]}
            initialView="timeGridWeek"
            events={allEvents}
            allDaySlot={false}
            contentHeight={300}
            slotDuration="00:30:00"
            slotLabelInterval="01:00:00"
            scrollTime="12:00:00"
            eventDataTransform={(eventData: DisplayableEvent) => (
              eventData.source === 'draft' ? {
                id: 'DRAFT',
                start: eventData.startTime,
                end: eventData.endTime,
                title: eventData.title,
                color: newEventColor,
              } : {
                id: eventData.id,
                start: eventData.startTime,
                end: eventData.endTime,
                title: eventData.title,
                color: getColorForEvent('google-calendar', eventData.calendarName),
              })}
          />
        </div>

        <ul>
          {allEvents.map((event, index) => (
            <li key={index}>
              {event.title} - {event.calendarName} - {event.startTime?.toLocaleString()} - {event.endTime?.toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </CollapsibleSection >
  );
};

export default GoogleCalendarSection;