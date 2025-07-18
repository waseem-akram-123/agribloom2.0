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
        role: user.role, // ✅ from AgriIntel
      },
      process.env.TOKEN_SECRET!,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      profileCompleted: user.profileCompleted, // ✅ from AgriBloom
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
