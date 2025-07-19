import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

export async function GET(request: NextRequest) {
  try {
    await connectToDB();

    const decoded = getDataFromToken(request);
    const user = await User.findById(decoded.id).select("username email role");

    if (!user) {
      return new NextResponse(JSON.stringify({ authenticated: false }), { status: 404 });
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
    console.error(err);
    return new NextResponse(JSON.stringify({ authenticated: false }), {
      status: 401,
      headers: {
        "Cache-Control": "no-store",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  }
}
