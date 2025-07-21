// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import type { NextApiRequest, NextApiResponse } from "next";
// import { connectToDB } from "@/dbConfig/dbConfig";
// import User from "@/models/userModel";
// import { decodeTokenString } from "@/helpers/getDataFromToken";
// import type { Express } from "express";



// // Import nextConnect as default import for correct typing
// import nextConnect from "next-connect";
// import type { NextApiRequest, NextApiResponse } from "next";
// import type { NextConnectHandler } from "next-connect";

// const handler: NextConnectHandler<NextApiRequest, NextApiResponse> = nextConnect();

// // ✅ Ensure "public/uploads" folder exists
// const uploadDir = path.join(process.cwd(), "public/uploads");
// fs.mkdirSync(uploadDir, { recursive: true });

// // ✅ Multer disk storage configuration
// const storage = multer.diskStorage({
//   destination: (_req: Express.Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => cb(null, uploadDir),
//   filename: (_req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
//     cb(null, `${Date.now()}${path.extname(file.originalname)}`);
//   },
// });

// const upload = multer({ storage });

// // ✅ Middleware to handle single file upload
// // Use correct import and typing for next-connect
// import * as nextConnect from "next-connect";
// // ✅ POST route to handle image saving
// handler.post(
//   async (
// const handler: ReturnType<typeof nextConnect.default> = (nextConnect as any)();
// import nextConnect from "next-connect"; // Use correct import for next-connect
// const handler = nextConnect();
//       const token = req.cookies?.token || "";
//       if (!token) {
//         return res.status(401).json({ error: "Unauthorized - no token found" });
//       }

//       // ✅ Use safe mock for NextRequest-like cookie getter
//       const { id: userId } = decodeTokenString(token);

//       // ✅ Use dummy image if no image is uploaded
//       const fileUrl = req.file
//   filename: (_req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`),
//         : "/uploads/dummy.jpg";

//       const updatedUser = await User.findByIdAndUpdate(
//         userId,
//         { profileImage: fileUrl },
//         { new: true }
//       ).select("-password");
// // nextConnect import and handler declaration moved to the top of the file (if not already present)
//     } catch (error) {
//       if (error instanceof Error) {
//         res.status(500).json({ error: error.message || "Upload failed" });
//       } else {
//         res.status(500).json({ error: "Upload failed" });
//       }
//     }
//   }
// );

// // ⚙️ Required to disable default body parser so multer can handle multipart/form-data
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default handler;
