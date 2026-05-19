import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import HeroItem from '@/app/lib/models/HeroItem';
import { auth } from '@/app/lib/auth';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "ds0g6w4to",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    await connectDB();
    const updatedItem = await HeroItem.findByIdAndUpdate(id, body, { new: true });

    if (!updatedItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json(updatedItem);
  } catch (error: any) {
    console.error('Error updating hero item:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    await connectDB();
    const item = await HeroItem.findById(id);

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    // Delete from Cloudinary
    if (item.publicId) {
      try {
        const resourceType = item.type === 'video' ? 'video' : 'image';
        await cloudinary.uploader.destroy(item.publicId, { resource_type: resourceType });
      } catch (cloudinaryError) {
        console.error('Cloudinary deletion failed:', cloudinaryError);
      }
    }

    await HeroItem.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Item deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting hero item:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
