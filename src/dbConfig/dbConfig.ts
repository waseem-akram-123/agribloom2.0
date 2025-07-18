import mongoose from "mongoose";

let isConnected = false; // Prevent multiple connections in dev

export const connectToDB = async () => {
  if (isConnected || mongoose.connections[0].readyState) {
    console.log("✅ MongoDB already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB_URL!);
    isConnected = true;

    mongoose.connection.on("connected", () => {
      console.log("✅ MongoDB connected successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
      process.exit(1);
    });
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
    process.exit(1);
  }
};
