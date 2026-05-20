import { auth, db } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only allow users with "users" permission or "all"
    const userPerms = (session.user as any).permissions || "all";
    if (userPerms !== "all" && !userPerms.split(",").includes("users")) {
      return NextResponse.json({ error: "Forbidden: You don't have permission to manage users" }, { status: 403 });
    }

    const database = await db;
    // List all users from the "user" collection
    const users = await database.collection("user").find({}).toArray();
    
    // Sanitize user objects (remove sensitive data if any)
    const sanitizedUsers = users.map(u => ({
      id: u._id.toString(),
      email: u.email,
      name: u.name,
      role: u.role || "admin",
      permissions: u.permissions || "all",
      createdAt: u.createdAt,
    }));
    
    return NextResponse.json({ users: sanitizedUsers }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching users:", error);
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

    const { email, password, name, role, permissions } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const database = await db;
    // Check if user already exists
    const existingUser = await database.collection("user").findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const newUser = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
        role: role || "admin",
        permissions: permissions || "all",
      } as any,
    });

    return NextResponse.json({ message: "User created successfully", user: newUser.user }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, role, permissions, name } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const updateData: any = {};
    if (role !== undefined) updateData.role = role;
    if (permissions !== undefined) updateData.permissions = permissions;
    if (name !== undefined) updateData.name = name;

    const database = await db;
    await database.collection("user").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    return NextResponse.json({ message: "User updated successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Prevent deleting oneself
    if (userId === session.user.id) {
      return NextResponse.json({ error: "You cannot delete your own account" }, { status: 400 });
    }

    const database = await db;
    // Delete user and their associated sessions/accounts
    await database.collection("user").deleteOne({ _id: new ObjectId(userId) });
    await database.collection("session").deleteMany({ userId: userId });
    await database.collection("account").deleteMany({ userId: userId });

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
