import { NextRequest, NextResponse } from 'next/server';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { getGoogleCalendarClient } from '../../../utils/google-calendar/calendar';
import { getZoomClient } from '../../../utils/zoom';

const { TIMEZONE } = process.env;

const GoogleCalendarEventDescriptor = z.object({
  title: z.string(),
  calendarId: z.string(),
  location: z.string(),
});

const ZoomMeetingDescriptor = z.object({
  title: z.string(),
  accountId: z.string(),
});

const Request = z.object({
  title: z.string(),
  location: z.optional(z.string()),
  startTime: z.string().datetime(),
  duration: z.number(),
  googleCalendarEvent: GoogleCalendarEventDescriptor.optional(),
  zoomMeeting: ZoomMeetingDescriptor.optional(),
});

export type CreateEventResult = {
  status: 'success' | 'error';
  error?: string;
  title: string;
  startTime: string;
  endTime: string;
  googleCalendarEvent?: {
    id: string;
    link: string;
  };
  zoomMeeting?: {
    id: string;
    accountName: string;
    link: string;
  };
};

export const POST = withApiAuthRequired(async (request: NextRequest) => {
  if (request.method === 'POST') {
    console.log(request.body);

    const calendar = await getGoogleCalendarClient();
    const zoom = await getZoomClient();

    const parsedBody = Request.safeParse(request.body);
    if (!parsedBody.success) {
      console.log(parsedBody.error);
      return NextResponse.json(
        { status: 'error', error: 'Invalid request body' },
        { status: 400 },
      );
    }
    const {
      title,
      location,
      googleCalendarEvent,
      zoomMeeting,
      startTime,
      duration,
    } = parsedBody.data;
    const endTime = new Date(new Date(startTime).getTime() + duration * 60000);

    const result: Partial<CreateEventResult> = {
      status: 'success',
      title,
      startTime: startTime,
      endTime: endTime.toISOString(),
    };

    try {
      if (googleCalendarEvent) {
        const calendarResult = await calendar.events.insert({
          calendarId: googleCalendarEvent.calendarId,
          requestBody: {
            summary: googleCalendarEvent.title,
            start: {
              dateTime: startTime,
              timeZone: TIMEZONE,
            },
            end: {
              dateTime: endTime.toISOString(),
              timeZone: TIMEZONE,
            },
            location,
          },
        });

        if (calendarResult.data.id && calendarResult.data.htmlLink) {
          result.googleCalendarEvent = {
            id: calendarResult.data.id,
            link: calendarResult.data.htmlLink,
          };
        }
      }

      if (zoomMeeting) {
        const meetingResult = await zoom.meetings.CreateMeeting(
          zoomMeeting.accountId,
          {
            topic: zoomMeeting.title,
            type: 2, // Scheduled meeting
            start_time: startTime,
            duration,
            timezone: TIMEZONE,
          },
        );
        result.zoomMeeting = {
          accountName: 'accountName missing',
          id: meetingResult.id || 'ID_MISSING',
          link: meetingResult.join_url || 'LINK_MISSING',
        };
      }

      return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
      return NextResponse.json(result, { status: 500 });
    }
  } else {
    return NextResponse.json(
      { status: 'error', error: 'Method not allowed' },
      { status: 405 },
    );
  }
});
