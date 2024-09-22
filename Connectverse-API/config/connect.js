import mongoose from "mongoose";

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.log("💥 connection to mongoDB failed", err);
    process.exit(1);
  }
}
