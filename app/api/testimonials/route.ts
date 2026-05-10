import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import { Testimonial } from "@/app/lib/models/Testimonial";

export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();
    
    return NextResponse.json(testimonials, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
