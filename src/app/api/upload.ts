import multer from "multer";
import path from "path";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import type { Express } from "express";

// 👇 Correctly import next-connect using require to avoid TS ESM default import issues
const nextConnect = require("next-connect") as typeof import("next-connect");
const handler = (nextConnect as any)(); // 👈 avoid passing type arguments

// ✅ Ensure "public/uploads" folder exists
const uploadDir = path.join(process.cwd(), "public/uploads");
fs.mkdirSync(uploadDir, { recursive: true });

// ✅ Multer disk storage configuration
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) =>
    cb(null, `${Date.now()}${path.extname(file.originalname)}`),
});

const upload = multer({ storage });

// ✅ Middleware to handle single file upload
handler.use(upload.single("profileImage"));

// ✅ POST route to handle image saving
handler.post(
  async (
    req: NextApiRequest & { file?: Express.Multer.File },
    res: NextApiResponse
  ) => {
    try {
      await connectToDB();

      // 🔐 Extract token from cookie manually since we're in a pages API route
      const token = req.cookies?.token || "";
      if (!token) {
        return res.status(401).json({ error: "Unauthorized - no token found" });
      }

      // ✅ Use safe mock for NextRequest-like cookie getter
      const userId = getDataFromToken({
        cookies: {
          get: () => ({ value: token }),
        },
      } as any);

      // ✅ Use dummy image if no image is uploaded
      const fileUrl = req.file
        ? `/uploads/${req.file.filename}`
        : "/uploads/dummy.jpg";

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profileImage: fileUrl },
        { new: true }
      ).select("-password");

      res.status(200).json({ message: "Image uploaded", user: updatedUser });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Upload failed" });
    }
  }
);

// ⚙️ Required to disable default body parser so multer can handle multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
