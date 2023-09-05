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
  existingMeetings,
  draftEvent,
  additionalStyles = "",
}) => {
  const draftIsDisplayable = draftEvent && draftEvent.title && draftEvent.startTime && draftEvent.endTime;
  type DisplayableEvent = (Partial<CalendarEvent> & { source: 'draft' }) | (CalendarEvent & { source: 'zoom' });
  const allEvents =
    (draftIsDisplayable ? ([draftEvent] as Partial<CalendarEvent>[]).concat(existingMeetings) : existingMeetings) as DisplayableEvent[]

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
                color: getColorForEvent('zoom', eventData.zoomAccountName || 'default'),
              })}
          />
        </div>
      </div>
    </CollapsibleSection >
  );
};

export default ZoomSection;
