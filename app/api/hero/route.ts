import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import HeroItem from '@/app/lib/models/HeroItem';

export async function GET() {
  try {
    await connectDB();
    const heroItems = await HeroItem.find({ isActive: true }).sort({ order: 1 });
    return NextResponse.json(heroItems);
  } catch (error: any) {
    console.error('Error fetching hero items:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
