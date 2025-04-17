// lib/location.ts
import { headers } from 'next/headers';

type LocationData = {
  ip: string;
  country: string;
  countryCode: string;
  region: string;
  city: string;
};

export async function getLocation(locale: string): Promise<LocationData | null> {
  try {
    const hdrs = await headers();
    const forwarded = hdrs.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : hdrs.get('x-real-ip');

    if (!ip) return null;

    // Using ip-api.com (respects locale in API calls)
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=country,countryCode,region,city,query&lang=${locale}`);
    
    if (!response.ok) return null;

    const data = await response.json();
    
    return {
      ip: data.query,
      country: data.country,
      countryCode: data.countryCode,
      region: data.region,
      city: data.city
    };
  } catch (error) {
    console.error('Location detection failed:', error);
    return null;
  }
}