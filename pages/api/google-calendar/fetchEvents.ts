import { NextApiRequest, NextApiResponse } from 'next';
import { fetchEvents } from '../../../utils/google-calendar/events';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const customEvents = await fetchEvents();
    res.status(200).json({ events: customEvents });
  } catch (error) {
    console.error("Error fetching events: ", error);
    res.status(500).send(error);
  }
}
