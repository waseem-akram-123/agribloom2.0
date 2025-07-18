import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    // Clear the JWT token cookie
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
      maxAge: 0,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Logout failed" },
      { status: 500 }
    );
  }
}
