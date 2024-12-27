import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { googleCloudConfig, riscConfig } from '../../../config/google-cloud';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Checking environment variables...');
    if (!process.env.GOOGLE_CLIENT_EMAIL) {
      console.error('GOOGLE_CLIENT_EMAIL is missing');
    }
    if (!process.env.GOOGLE_PRIVATE_KEY) {
      console.error('GOOGLE_PRIVATE_KEY is missing');
    }

    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      throw new Error('Missing Google Cloud credentials');
    }

    console.log('Initializing Google Auth client...');
    const client = await google.auth.getClient({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/risc.configuration'],
    });

    console.log('Initializing RISC client...');
    const risc = google.risc({ version: 'v1beta', auth: client });

    console.log('Updating RISC stream...');
    const response = await risc.stream.update({
      requestBody: {
        delivery: {
          delivery_method: 'https://schemas.openid.net/secevent/risc/delivery-method/push',
          url: riscConfig.receiverEndpoint,
        },
        events_requested: riscConfig.eventsRequested,
      },
    });

    if (!response.data) {
      throw new Error('No data received from Google RISC API');
    }

    console.log('RISC stream updated successfully');
    res.status(200).json({ message: 'Event stream configured successfully', data: response.data });
  } catch (error) {
    console.error('Error configuring event stream:', error);
    res.status(500).json({ error: 'Error configuring event stream', details: error.message });
  }
}

