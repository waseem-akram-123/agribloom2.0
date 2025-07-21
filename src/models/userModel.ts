import { Schema, Document, models, model, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "farmer" | "admin";
  isVerified?: boolean;
  isAdmin?: boolean;
  favoriteVegetable?: string;
  favoriteFruit?: string;
  favoriteTree?: string;
  favoriteFlower?: string;
  favoriteSeason?: string;
  favoriteActivity?: string;
  profileCompleted?: boolean;
  createdAt?: Date;
  forgetPasswordToken?: string;
  forgetPasswordTokenExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, "Please enter your name"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
  role: {
    type: String,
    enum: ["farmer", "admin"],
    default: "farmer",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  favoriteVegetable: {
    type: String,
    default: "",
  },
  favoriteFruit: {
    type: String,
    default: "",
  },
  favoriteTree: {
    type: String,
    default: "",
  },
  favoriteFlower: {
    type: String,
    default: "",
  },
  favoriteSeason: {
    type: String,
    default: "",
  },
  favoriteActivity: {
    type: String,
    default: "",
  },
  profileCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  forgetPasswordToken: String,
  forgetPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

// ✅ Cast the model to correct type explicitly
const User: Model<IUser> = models.User || model<IUser>("User", userSchema);
export default User;
