import { auth } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import { Podcast } from "@/app/lib/models/Podcast";

function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export async function PATCH(
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

    const userPerms = (session.user as any).permissions || "all";
    if (userPerms !== "all" && !userPerms.split(",").includes("podcasts") && !userPerms.split(",").includes("testimonials")) {
      return NextResponse.json({ error: "Forbidden: You don't have permission to manage podcasts" }, { status: 403 });
    }

    const { title, videoUrl, order } = await request.json();
    const updateData: any = {};

    if (title !== undefined) updateData.title = title;
    if (order !== undefined) updateData.order = order;
    
    if (videoUrl) {
      const videoId = getYouTubeId(videoUrl);
      if (!videoId) {
        return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
      }
      updateData.videoUrl = videoUrl;
      updateData.videoId = videoId;
    }

    await connectDB();
    const podcast = await Podcast.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    );

    if (!podcast) {
      return NextResponse.json({ error: "Podcast not found" }, { status: 404 });
    }

    return NextResponse.json(podcast, { status: 200 });
  } catch (error: any) {
    console.error("Error updating podcast:", error);
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

    const userPerms = (session.user as any).permissions || "all";
    if (userPerms !== "all" && !userPerms.split(",").includes("podcasts") && !userPerms.split(",").includes("testimonials")) {
      return NextResponse.json({ error: "Forbidden: You don't have permission to manage podcasts" }, { status: 403 });
    }

    await connectDB();
    const podcast = await Podcast.findByIdAndDelete(params.id);

    if (!podcast) {
      return NextResponse.json({ error: "Podcast not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Podcast deleted" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting podcast:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
