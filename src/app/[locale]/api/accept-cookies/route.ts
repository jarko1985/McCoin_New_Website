import { NextResponse } from 'next/server';

export async function POST(){
    const response = NextResponse.json({message: 'Cookie set'});
    response.cookies.set('cookie_consent', 'true', {
        path: '/',
        maxAge: 60 * 60 * 24 * 365
      });
      return response;
}