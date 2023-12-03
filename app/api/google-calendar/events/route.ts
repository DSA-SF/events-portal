import { NextResponse } from 'next/server';
import { fetchGoogleCalendarEvents } from '../../../../utils/google-calendar/events';

export async function GET() {
  try {
    const customEvents = await fetchGoogleCalendarEvents();
    return NextResponse.json({ events: customEvents });
  } catch (error) {
    console.error("Error fetching events: ", error);
    return NextResponse.json({error}, {status: 500});
  }
}
