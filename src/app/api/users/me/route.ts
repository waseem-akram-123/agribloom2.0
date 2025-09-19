import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

export async function GET(request: NextRequest) {
  try {
    await connectToDB();

    // Check if token exists first
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return new NextResponse(JSON.stringify({ authenticated: false }), {
        status: 200, // Return 200 instead of 401 for missing token
        headers: {
          "Cache-Control": "no-store",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      });
    }

    const decoded = getDataFromToken(request);
    const user = await User.findById(decoded.id).select("username email role");

    if (!user) {
      return new NextResponse(JSON.stringify({ authenticated: false }), { 
        status: 200, // Return 200 instead of 404
        headers: {
          "Cache-Control": "no-store",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      });
    }

    return new NextResponse(
      JSON.stringify({
        authenticated: true,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role, // ✅ Send role to frontend
        },
      }),
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      }
    );
  } catch (err) {
    console.error("Auth error:", err);
    return new NextResponse(JSON.stringify({ authenticated: false }), {
      status: 200, // Return 200 instead of 401 for any auth errors
      headers: {
        "Cache-Control": "no-store",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  }
}
