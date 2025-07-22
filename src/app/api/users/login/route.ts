// /app/api/users/login/route.ts

import { connectToDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  await connectToDB();

  try {
    const { email, password } = await request.json();

    const user = await User.findOne({ email });
    if (!user || !(await bcryptjs.compare(password, user.password))) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.TOKEN_SECRET!,
      { expiresIn: "1d" } // Token is still valid for 1 day on server, but cookie won't persist
    );

    // ✅ Create response
    const response = new NextResponse(
      JSON.stringify({
        message: "Login successful",
        success: true,
        profileCompleted: user.profileCompleted,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // ✅ Set session-only cookie (no maxAge)
    response.cookies.set(
      "token",
      token,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        // ❌ No maxAge or expires – makes it a session cookie
      }
    );

    return response;
  } catch (error: unknown) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
