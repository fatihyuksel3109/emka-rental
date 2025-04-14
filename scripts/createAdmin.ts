import "dotenv/config"; // 👈 This loads your .env file
import { connectToDatabase } from "../lib/mongodb";
import Admin from "../models/Admin";
import bcrypt from "bcryptjs";

async function createAdmin() {
  try {
    await connectToDatabase();
    const email = "fatih@emka.com";
    const password = "fatih123";
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ email, password: hashedPassword });
    await admin.save();
    console.log("✅ Admin user created successfully");
  } catch (error) {
    console.error("❌ Failed to create admin:", error);
  }
}

createAdmin().then(() => process.exit());
