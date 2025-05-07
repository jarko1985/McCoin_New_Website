import { NextResponse } from 'next/server';

export async function GET(request: Request){
    const apiKey = process.env.COINMARKETCAP_API_KEY;
    const url = `https://pro-api.coinmarketcap.com/v3/fear-and-greed/latest`;
    try {
        const response = await fetch(url, { 
            headers: {
                'X-CMC_PRO_API_KEY': apiKey || ''}, // Use the API key from environment variables
            next: { revalidate: 3600 }
        });
        
        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        return NextResponse.json(data.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch data' },
            { status: 500 }
        );
    }
}