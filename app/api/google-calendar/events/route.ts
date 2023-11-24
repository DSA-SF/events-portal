import { NextResponse } from 'next/server';
import { fetchEvents } from '../../../../utils/google-calendar/events';

export async function GET() {
  try {
    const customEvents = await fetchEvents();
    NextResponse.json({ events: customEvents });
  } catch (error) {
    console.error("Error fetching events: ", error);
    NextResponse.json({error}, {status: 500});
  }
}
