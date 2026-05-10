import { v2 as cloudinary } from 'cloudinary';
import connectDB from "@/app/lib/db";
import Disease from "@/app/lib/models/Disease";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "ds0g6w4to",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = await params;
    const disease = await Disease.findById(id);

    if (!disease) {
      return NextResponse.json({ error: "Disease not found" }, { status: 404 });
    }

    return NextResponse.json({ disease }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Permission check
    const userPerms = (session.user as any).permissions || "all";
    if (userPerms !== "all" && !userPerms.split(",").includes("diseases")) {
      return NextResponse.json({ error: "Forbidden: You don't have permission to manage diseases" }, { status: 403 });
    }

    await connectDB();
    const { id } = await params;
    const { name, description, pictureLink, cloudinaryId } = await request.json();

    const existingDisease = await Disease.findById(id);
    if (!existingDisease) {
      return NextResponse.json({ error: "Disease not found" }, { status: 404 });
    }

    const updateData: any = {
      name,
      description,
      pictureLink,
      cloudinaryId,
      startsWithLetter: name.charAt(0).toUpperCase(),
      slug: slugify(name),
    };

    const updatedDisease = await Disease.findByIdAndUpdate(id, updateData, { new: true });

    return NextResponse.json({ message: "Disease updated successfully", disease: updatedDisease }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating disease:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Permission check
    const userPerms = (session.user as any).permissions || "all";
    if (userPerms !== "all" && !userPerms.split(",").includes("diseases")) {
      return NextResponse.json({ error: "Forbidden: You don't have permission to manage diseases" }, { status: 403 });
    }

    await connectDB();
    const { id } = await params;
    const disease = await Disease.findById(id);

    if (!disease) {
      return NextResponse.json({ error: "Disease not found" }, { status: 404 });
    }

    // Delete from Cloudinary
    if (disease.cloudinaryId) {
      try {
        await cloudinary.uploader.destroy(disease.cloudinaryId);
      } catch (cloudinaryError) {
        console.error("Cloudinary deletion failed:", cloudinaryError);
        // We continue anyway to remove from DB
      }
    }

    await Disease.findByIdAndDelete(id);

    return NextResponse.json({ message: "Disease deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting disease:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
