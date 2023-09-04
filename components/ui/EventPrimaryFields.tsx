import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import { DateTime } from 'luxon';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

interface EventPrimaryFieldsProps {
  eventName: string;
  onEventNameChange: (value: string) => void;
  startTime: Date | undefined;
  onStartTimeChange: (value: Date) => void;
  duration: number;
  onDurationChange: (value: number) => void;
  eventType: 'Online' | 'In-person' | 'Hybrid';
  onEventTypeChange: (value: 'Online' | 'In-person' | 'Hybrid') => void;
  location?: string;
  onLocationChange: (value: string) => void;
  additionalStyles?: string;
}

const EventPrimaryFields: React.FC<EventPrimaryFieldsProps> = ({
  eventName,
  onEventNameChange,
  startTime,
  onStartTimeChange,
  duration,
  onDurationChange,
  eventType,
  onEventTypeChange,
  location,
  onLocationChange,
  additionalStyles = "",
}) => {
  return (
    <div className={`p-4 ${additionalStyles}`}>
      {/* Event Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Event Name</label>
        <input
          type="text"
          value={eventName}
          onChange={(e) => onEventNameChange(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
          placeholder="Enter event name"
        />
      </div>

      {/* Start Time */}
      <div className="mb-4" suppressHydrationWarning>
        <label className="block text-sm font-medium text-gray-700">Start Time</label>
        <DateTimePicker
          onChange={(value) => {
            if (value) {
              const newDateTime = value as Date;
              onStartTimeChange(newDateTime);
            }
          }}
          value={startTime || DateTime.now().toJSDate()}
        />
      </div>

      {/* Duration */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => onDurationChange(Number(e.target.value))}
          className="mt-1 p-2 w-full border rounded-md"
          placeholder="Duration in minutes"
        />
      </div>

      {/* Event Type */}
      <div className="mb-4">
        <span className="block text-sm font-medium text-gray-700">Event Type</span>
        <select
          value={eventType}
          onChange={(e) => onEventTypeChange(e.target.value as 'Online' | 'In-person' | 'Hybrid')}
          className="mt-1 p-2 w-full border rounded-md"
        >
          <option value="Online">Online</option>
          <option value="In-person">In-person</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>

      {/* Location (conditionally rendered) */}
      {(eventType === 'In-person' || eventType === 'Hybrid') && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            value={location || ''}
            onChange={(e) => onLocationChange(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter physical location"
          />
        </div>
      )}
    </div>
  );
};

export default EventPrimaryFields;
