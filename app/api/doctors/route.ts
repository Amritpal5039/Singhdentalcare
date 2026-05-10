import { v2 as cloudinary } from 'cloudinary';
import connectDB from "@/app/lib/db";
import Doctor from "@/app/lib/models/Doctor";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/app/lib/auth";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "ds0g6w4to",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const doctors = await Doctor.find({}).sort({ order: 1 });
    return NextResponse.json({ doctors }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Permission check
    const userPerms = (session.user as any).permissions || "all";
    if (userPerms !== "all" && !userPerms.split(",").includes("doctors")) {
      return NextResponse.json({ error: "Forbidden: You don't have permission to manage doctors" }, { status: 403 });
    }

    await connectDB();
    const { name, credentials, specialty, experience, image, cloudinaryId, order } = await request.json();

    const doctor = await Doctor.create({
      name,
      credentials,
      specialty,
      experience,
      image,
      cloudinaryId,
      order: order || 0,
    });

    return NextResponse.json({ message: "Doctor added successfully", doctor }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating doctor:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
