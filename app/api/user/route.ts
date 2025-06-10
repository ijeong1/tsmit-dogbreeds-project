import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prismaClient';
import * as UserDataService from '@/services/userDataService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');
  if (!sessionId) {
    return NextResponse.json({ error: 'sessionId is required' }, { status: 400 });
  }

  try {    
    const profile = await UserDataService.getUserDataById(sessionId);
    if (!profile) {
      return NextResponse.json({ error: 'No profile found' }, { status: 404 });
    }

    return NextResponse.json({
      phone: profile.phone,
      street: profile.street,
      city: profile.city,
      state: profile.state,
      zipcode: profile.zipcode,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}