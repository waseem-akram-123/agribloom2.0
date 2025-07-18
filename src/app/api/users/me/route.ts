import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

export async function GET(request: NextRequest) {
  try {
    await connectToDB();

      // console.log("✅ Cookie received:", request.cookies.get("token")?.value);

    const userId = await getDataFromToken(request);
    const user = await User.findById(userId).select("username email");

    if (!user) {
      return new NextResponse(
        JSON.stringify({ authenticated: false }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        authenticated: true,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      }),
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      }
    );
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ authenticated: false }),
      {
        status: 401,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      }
    );
  }
}

