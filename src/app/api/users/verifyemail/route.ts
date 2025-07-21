import { connectToDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectToDB();
  try {
    const reqbody = await request.json();
    const { token } = reqbody;
    const decodedToken = decodeURIComponent(token);
    console.log(decodedToken);

    const user = await User.findOne({
      verifyToken: decodedToken,
      verifyTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }
    console.log(user);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      { message: "email verified successfully", success: true },
      { status: 200 }
    );
  } catch (error: unknown) {
    let message = "Internal server error";
    if (error instanceof Error) message = error.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
