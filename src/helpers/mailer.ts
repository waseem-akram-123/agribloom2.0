import { Resend } from 'resend';
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: new Date(Date.now() + 3600000), // 1 hour
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgetPasswordToken: hashedToken,
          forgetPasswordTokenExpiry: new Date(Date.now() + 3600000),
        },
      });
    }

    const subject =
      emailType === "VERIFY" ? "Verify your email" : "Reset your password";

    // 🔒 Fix: Encode token to prevent browser issues when clicking the link
    const encodedToken = encodeURIComponent(hashedToken);
    const url = `${process.env.DOMAIN}/verifyemail?token=${encodedToken}`;

    const emailHtml = `
      <p>
        Click <a href="${url}">here</a> to ${
          emailType === "VERIFY" ? "verify your email" : "reset your password"
        }.
      </p>
      <p>Or copy and paste the link below in your browser:</p>
      <p>${url}</p>
    `;

    const data = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: email,
      subject,
      html: emailHtml,
    });

    return data;
  } catch (error) {
    console.error("Email sending error:", error);
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to send email");
    }
    throw new Error("Failed to send email");
  }
};
