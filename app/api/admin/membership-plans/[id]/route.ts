import { auth } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import { MembershipPlan } from "@/app/lib/models/MembershipPlan";

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
    if (userPerms !== "all" && !userPerms.split(",").includes("membership")) {
        // Forbidden check if needed
    }

    const { id } = await params;

    await connectDB();
    const plan = await MembershipPlan.findByIdAndDelete(id);

    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Plan deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting membership plan:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
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

    const { id } = await params;
    const updates = await request.json();

    await connectDB();
    const plan = await MembershipPlan.findByIdAndUpdate(id, updates, { new: true });

    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    return NextResponse.json(plan, { status: 200 });
  } catch (error: any) {
    console.error("Error updating membership plan:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
