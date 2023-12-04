import { NextRequest, NextResponse } from 'next/server';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

export const POST = withApiAuthRequired(async (request: NextRequest) => {
  try {
    return NextResponse.json({ status: 'not-implemented' });
  } catch (error) {
    console.error('Error fetching events: ', error);
    return NextResponse.json({ error }, { status: 500 });
  }
});
