import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import { MembershipPlan } from "@/app/lib/models/MembershipPlan";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const plans = await MembershipPlan.find({}).sort({ order: 1, createdAt: -1 });
    
    return NextResponse.json(plans, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching membership plans:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
