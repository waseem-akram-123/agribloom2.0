import { NextResponse } from 'next/server';
import commoditiesData from '@/data/agricultural-commodities.json';

export async function GET() {
  try {
    return NextResponse.json(commoditiesData);
  } catch (error) {
    console.error('Error serving commodities data:', error);
    return NextResponse.json(
      { error: 'Failed to load commodities data' }, 
      { status: 500 }
    );
  }
}
