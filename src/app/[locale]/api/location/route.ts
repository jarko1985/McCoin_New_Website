import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  try {
    const { locale } = await params;
    
    const hdrs = await headers();
    const forwarded = hdrs.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : hdrs.get('x-real-ip');

    if (!ip) {
      return NextResponse.json(
        { error: 'IP address not found' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `http://ip-api.com/json/${ip}?fields=country,countryCode,region,city,query&lang=${locale}`
    );
    
    if (!response.ok) throw new Error('Location service failed');

    const data = await response.json();
    
    return NextResponse.json({
      ip: data.query,
      country: data.country,
      countryCode: data.countryCode,
      region: data.region,
      city: data.city
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch location data' },
      { status: 500 }
    );
  }
}
