import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { fetchEvents } from '../../../../utils/google-calendar/events';

export default async function GET(req: NextApiRequest) {
  try {
    const customEvents = await fetchEvents();
    NextResponse.json({ events: customEvents });
  } catch (error) {
    console.error("Error fetching events: ", error);
    NextResponse.json({error}, {status: 500});
  }
}
