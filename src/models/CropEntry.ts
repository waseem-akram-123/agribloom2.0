import mongoose, { Schema, Document, models } from "mongoose";

export interface ICropEntry extends Document {
  farmerId: mongoose.Types.ObjectId;
  crop: string;
  district: string;
  village: string;
  sowingDate: Date;
  area: number;
  season: string;
}

const CropEntrySchema = new Schema<ICropEntry>(
  {
    farmerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    crop: { type: String, required: true },
    district: { type: String, required: true },
    village: { type: String, required: true },
    sowingDate: { type: Date, required: true },
    area: { type: Number, required: true },
    season: {
      type: String,
      enum: ["kharif", "rabi", "zaid"],
      required: true,
    },
  },
  { timestamps: true }
);

const CropEntry =
  models.CropEntry || mongoose.model<ICropEntry>("CropEntry", CropEntrySchema);

export default CropEntry;
