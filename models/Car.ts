import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: String, required: true },
  price: { type: String, required: true },
  shiftType: { type: String, required: true },
  seats: { type: String, required: true },
  fuelType: { type: String, required: true },
  transmission: { type: String, required: true },
  features: { type: [String], default: [] },
  available: { type: Boolean, default: true },
  imageUrl: { type: String, required: true },
  category: {
    type: String,
    enum: ["economic", "mid", "high", "luxury", "minibus", "suv"],
    required: [true, "Category is required"],
  },
});

export default mongoose.models.Car || mongoose.model("Car", CarSchema);