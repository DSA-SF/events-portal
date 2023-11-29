import { NextApiRequest, NextApiResponse } from 'next';

const { ACTION_NETWORK_API_KEY } = process.env;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, zip } = req.body;
  const url = `https://actionnetwork.org/api/v2/`;
  const headers = {
    'Content-Type': 'application/json',
    'OSDI-API-Token': process.env.ACTION_NETWORK_API_KEY,
  };
}