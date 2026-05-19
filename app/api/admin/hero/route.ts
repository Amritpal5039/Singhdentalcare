import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import HeroItem from '@/app/lib/models/HeroItem';
import { auth } from '@/app/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const heroItems = await HeroItem.find({}).sort({ order: 1 });
    return NextResponse.json(heroItems);
  } catch (error: any) {
    console.error('Error fetching hero items:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { type, url, publicId, order, isActive } = await request.json();

    if (!type || !url || !publicId) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    await connectDB();
    const newHeroItem = await HeroItem.create({
      type,
      url,
      publicId,
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true,
    });

    return NextResponse.json(newHeroItem, { status: 201 });
  } catch (error: any) {
    console.error('Error creating hero item:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { items } = await request.json(); // Array of items with new orders

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }

    await connectDB();
    
    // Bulk update orders
    const promises = items.map((item: any) => 
      HeroItem.findByIdAndUpdate(item._id, { order: item.order })
    );
    
    await Promise.all(promises);

    return NextResponse.json({ message: 'Orders updated successfully' });
  } catch (error: any) {
    console.error('Error updating hero orders:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
