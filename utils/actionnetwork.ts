import { NextApiRequest, NextApiResponse } from 'next';


export const actionnetworkapi = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const response = await axios.get('https://actionnetwork.org/api/v2/people', {
        headers: {
            'Content-Type': 'application/json',
            'OSDI-API-Token': process.env.ACTION_NETWORK_KEY,
        },
        });
        res.status(200).json({ response: response.data });
    } catch (error) {
        console.error("Error fetching events: ", error);
        res.status(500).send(error);
    }
    }
