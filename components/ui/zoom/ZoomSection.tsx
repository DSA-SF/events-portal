import React, { useState } from 'react';
import CollapsibleSection from '../CollapsibleSection';
import { CalendarEvent, DraftEvent, ZoomMeeting } from "../../../model/event";
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { getColorForEvent, newEventColor } from '../colors';
import { ZoomAccount } from '../../../utils/zoom';
import _ from 'lodash';

interface ZoomSectionProps {
  accounts: ZoomAccount[];
  destinationAccountId: string;
  onDestinationAccountChange: (value: string) => void;
  isActivated: boolean;
  onToggleActivation: () => void;
  additionalStyles?: string;
  existingMeetings: ZoomMeeting[];

  draftEvent?: DraftEvent;
}

const ZoomSection: React.FC<ZoomSectionProps> = ({
  accounts,
  destinationAccountId,
  onDestinationAccountChange,
  isActivated,
  onToggleActivation,
  existingMeetings: existingEvents,
  draftEvent,
  additionalStyles = "",
}) => {
  const renderEvents = existingEvents.map(event => ({
    id: event.id,
    start: event.startTime,
    end: event.endTime,
    title: event.title,
    color: getColorForEvent('zoom', destinationAccountId || 'default'),
  }));

  if (draftEvent && draftEvent.title && draftEvent.startTime && draftEvent.endTime) {
    renderEvents.push({
      id: 'DRAFT',
      start: draftEvent.startTime,
      end: draftEvent.endTime,
      title: draftEvent.title,
      color: newEventColor,
    })
  }
  const accountsById = _.keyBy(accounts, 'id');

  return (
    <CollapsibleSection
      title="Zoom"
      isChecked={isActivated}
      onToggleChecked={onToggleActivation}
      additionalStyles={additionalStyles}
    >
      <div className="p-4">
        <div className="mb-4 relative flex items-center">
          <label className="block text-sm font-medium text-gray-700 pr-2">Destination Zoom Account</label>
          <select
            value={destinationAccountId}
            onChange={(e) => onDestinationAccountChange(e.target.value)}
            className="mt-1 p-2 border rounded-md flex-grow"
          >
            {Object.keys(accountsById).map(accountId =>
              <option key={accountId} value={accountId}>{accountsById[accountId].name}</option>
            )}
          </select>
        </div>

        <div className="mb-4">
          <FullCalendar
            plugins={[timeGridPlugin]}
            initialView="timeGridWeek"
            events={renderEvents}
            allDaySlot={false}
            contentHeight={300}
            slotDuration="00:30:00"
            slotLabelInterval="01:00:00"
            scrollTime="12:00:00"
          />
        </div>
      </div>
    </CollapsibleSection >
  );
};

export default ZoomSection;
