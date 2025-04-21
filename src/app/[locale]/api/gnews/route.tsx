import { NextResponse } from 'next/server';

export async function GET( request: Request,
    { params }: { params: Promise<{ locale: string }> }) {

    const apiKey = process.env.GNEWS_API_KEY;
    const url = `https://gnews.io/api/v4/top-headlines?q=crypto&category=technology&max=10&lang=en&apikey=${apiKey}`;
    const { locale } = await params;
    try {
        const response = await fetch(url, { 
            // Add cache options for better performance
            next: { revalidate: 3600 } // Revalidate every hour
        });
        
        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        return NextResponse.json(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
        return NextResponse.json(
            { error: 'Failed to fetch news' },
            { status: 500 }
        );
    }
}
