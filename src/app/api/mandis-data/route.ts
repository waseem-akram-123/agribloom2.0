import { NextResponse } from 'next/server';
import mandisData from '@/data/indian-states-mandis.json';

export async function GET() {
  try {
    return NextResponse.json(mandisData);
  } catch (error) {
    console.error('Error serving mandis data:', error);
    return NextResponse.json(
      { error: 'Failed to load mandis data' }, 
      { status: 500 }
    );
  }
}
