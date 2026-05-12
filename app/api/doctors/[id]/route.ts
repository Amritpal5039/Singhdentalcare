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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const doctor = await Doctor.findById(id);
    if (!doctor) return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    return NextResponse.json({ doctor }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
    if (userPerms !== "all" && !userPerms.split(",").includes("doctors")) {
      return NextResponse.json({ error: "Forbidden: You don't have permission to manage doctors" }, { status: 403 });
    }

    await connectDB();
    const { id } = await params;
    const data = await request.json();

    const updatedDoctor = await Doctor.findByIdAndUpdate(id, data, { new: true });
    if (!updatedDoctor) return NextResponse.json({ error: "Doctor not found" }, { status: 404 });

    return NextResponse.json({ message: "Doctor updated successfully", doctor: updatedDoctor }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating doctor:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
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
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Permission check
    const userPerms = (session.user as any).permissions || "all";
    if (userPerms !== "all" && !userPerms.split(",").includes("doctors")) {
      return NextResponse.json({ error: "Forbidden: You don't have permission to manage doctors" }, { status: 403 });
    }

    await connectDB();
    const { id } = await params;
    const doctor = await Doctor.findById(id);

    if (!doctor) return NextResponse.json({ error: "Doctor not found" }, { status: 404 });

    if (doctor.cloudinaryId) {
      try {
        await cloudinary.uploader.destroy(doctor.cloudinaryId);
      } catch (e) {
        console.error("Cloudinary deletion failed:", e);
      }
    }

    await Doctor.findByIdAndDelete(id);
    return NextResponse.json({ message: "Doctor deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting doctor:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
