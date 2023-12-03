import { NextResponse } from 'next/server';
import { fetchGoogleCalendarEvents } from '../../../../utils/google-calendar/events';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

export const GET = withApiAuthRequired(async () => {
  try {
    const customEvents = await fetchGoogleCalendarEvents();
    return NextResponse.json({ events: customEvents });
  } catch (error) {
    console.error('Error fetching events: ', error);
    return NextResponse.json({ error }, { status: 500 });
  }
});
