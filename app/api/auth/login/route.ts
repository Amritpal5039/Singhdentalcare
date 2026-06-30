import { NextResponse, NextRequest } from "next/server";
import { db } from "@/app/lib/auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.BETTER_AUTH_SECRET || "singhdentalcare-secret-jwt-token-key-123456";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const database = await db;
    const emailLower = email.trim().toLowerCase();

    // Query user
    const user = await database.collection("user").findOne({ email: emailLower });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Verify password
    const isValid = bcrypt.compareSync(password, user.password || "");
    if (!isValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Generate JWT token (expires in 7 days)
    const token = jwt.sign(
      {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role || "admin",
        permissions: user.permissions || "all",
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Prepare response
    const sessionUser = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role || "admin",
      permissions: user.permissions || "all",
    };

    const sessionData = {
      id: user._id.toString(),
      userId: user._id.toString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };

    const response = NextResponse.json(
      {
        user: sessionUser,
        session: sessionData,
      },
      { status: 200 }
    );

    // Set cookie
    response.cookies.set({
      name: "sdc_session",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Login API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
