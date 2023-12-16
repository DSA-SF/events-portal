import React, { useState } from 'react';
import CollapsibleSection from '../CollapsibleSection';
import { CalendarEvent, CalendarableEvent, DraftEvent, GoogleCalendarEvent } from "../../../model/event";
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { getColorForEvent, newEventColor } from '../colors';
import { actionnetworkapi } from '../../../utils/actionnetwork';
