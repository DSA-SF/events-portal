import React, { useState, useEffect } from 'react';
import CollapsibleSection from '../CollapsibleSection';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { makeRequest } from '../../../utils/action-network/actionnetwork';  // Import your makeRequest function
import { ActionNetwork, OsdiEvent } from '../../../utils/action-network/actionNetworkInterface'; // Import your ActionNetwork types
import { CalendarEvent, CalendarableEvent, DraftEvent, GoogleCalendarEvent } from "../../../model/event";
import { getColorForEvent, newEventColor } from '../colors';
import { GoogleCalendarDetails } from '../../../utils/google-calendar/calendar';

interface ActionNetworkCalendarProps {
  calendarDetails: GoogleCalendarDetails[];
  destinationCalendarId?: string;
  onDestinationCalendarChange: (value: string) => void;
  isActivated: boolean;
  onToggleActivation: () => void;
  additionalStyles?: string;
  existingEvents: OsdiEvent[];
  draftEvent?: DraftEvent;
}

const ActionNetworkSection: React.FC<ActionNetworkCalendarProps> = ({
  calendarDetails,
  destinationCalendarId,
  onDestinationCalendarChange,
  isActivated,
  onToggleActivation,
  existingEvents,
  draftEvent,
  additionalStyles = "",
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <CollapsibleSection
      title="Action Network Calendar"
      isChecked={isActivated}
      onToggleChecked={onToggleActivation}
      additionalStyles={additionalStyles}
    >
      <div className="p-4">
        <div className="mb-4 relative flex items-center">
          <label className="block text-sm font-medium text-gray-700 pr-2">Destination Calendar</label>
          <select
            value={destinationCalendarId}
            onChange={(e) => onDestinationCalendarChange(e.target.value as 'Public' | 'Internal')}
            className="mt-1 p-2 border rounded-md flex-grow"
          >
            {Object.values(calendarDetails).map(detail =>
              <option key={detail.id} value={detail.id}>{detail.name}</option>
            )}
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
            allDaySlot={false}
            contentHeight={300}
            slotDuration="00:30:00"
            slotLabelInterval="01:00:00"
            scrollTime="12:00:00"
          />
        </div>
      </div>
    </CollapsibleSection>
  );
};

export default ActionNetworkSection;