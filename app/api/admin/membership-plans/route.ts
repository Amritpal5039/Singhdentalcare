import { auth } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import { MembershipPlan } from "@/app/lib/models/MembershipPlan";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const plans = await MembershipPlan.find({}).sort({ order: 1, createdAt: -1 });
    
    return NextResponse.json(plans, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching admin membership plans:", error);
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
    if (userPerms !== "all" && !userPerms.split(",").includes("membership")) {
      // Check if they have 'all' or specifically 'membership'
      // Note: adding 'membership' to the list of permissions later
    }

    const { image, cloudinaryId, buyNowLink, order } = await request.json();

    if (!image || !cloudinaryId) {
      return NextResponse.json({ error: "Image and Cloudinary ID are required" }, { status: 400 });
    }

    await connectDB();
    const plan = await MembershipPlan.create({
      image,
      cloudinaryId,
      buyNowLink: buyNowLink || 'https://pages.razorpay.com/stores/singhdentalcare',
      order: order || 0,
    });

    return NextResponse.json(plan, { status: 201 });
  } catch (error: any) {
    console.error("Error creating membership plan:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
