import { auth } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import { Testimonial } from "@/app/lib/models/Testimonial";

function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export async function PATCH(
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
    if (userPerms !== "all" && !userPerms.split(",").includes("testimonials")) {
      return NextResponse.json({ error: "Forbidden: You don't have permission to manage testimonials" }, { status: 403 });
    }

    const { id } = await params;
    const { title, videoUrl, order, isActive } = await request.json();
    const updateData: any = {};

    if (title !== undefined) updateData.title = title;
    if (order !== undefined) updateData.order = order;
    if (isActive !== undefined) updateData.isActive = isActive;
    
    if (videoUrl) {
      const videoId = getYouTubeId(videoUrl);
      if (!videoId) {
        return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
      }
      updateData.videoUrl = videoUrl;
      updateData.videoId = videoId;
    }

    await connectDB();
    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!testimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    return NextResponse.json(testimonial, { status: 200 });
  } catch (error: any) {
    console.error("Error updating testimonial:", error);
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
    if (userPerms !== "all" && !userPerms.split(",").includes("testimonials")) {
      return NextResponse.json({ error: "Forbidden: You don't have permission to manage testimonials" }, { status: 403 });
    }

    const { id } = await params;
    await connectDB();
    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Testimonial deleted" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
