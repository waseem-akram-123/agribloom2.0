import { connectToDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
  await connectToDB();

  try {
    const reqBody = await request.json();
    const {
      username,
      email,
      password,
      role = "farmer",
      adminKey = "",
    } = reqBody;

    // 🔐 Check if admin key is required and valid
    if (role === "admin") {
      const expectedKey = process.env.ADMIN_SECRET_KEY;

      if (!adminKey || adminKey !== expectedKey) {
        return NextResponse.json(
          { message: "Invalid Admin Key. Access denied." },
          { status: 401 }
        );
      }
    }

    // 🔍 Check if user with same email or username exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      const message =
        existingUser.email === email
          ? "Email already exists. Try logging in."
          : "Username already taken. Choose a different one.";
      return NextResponse.json({ message }, { status: 400 });
    }

    // 🔑 Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // 🆕 Create and save user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role, // "admin" or "farmer"
    });

    const savedUser = await newUser.save();

    // ✉️ Send verification email
    await sendEmail({
      email,
      emailType: "VERIFY",
      userId: String(savedUser._id),
    });

    return NextResponse.json({
      message: "User registered successfully. Please check your email.",
      success: true,
    });
  } catch (error: unknown) {
    let message = "Something went wrong";
    if (error instanceof Error) message = error.message;
    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}
