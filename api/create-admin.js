const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    // Admin credentials from .env
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      throw new Error("Missing admin credentials in .env file");
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(
      adminPassword,
      bcrypt.genSaltSync(10)
    );

    // Create or update admin user
    const adminUser = await User.findOneAndUpdate(
      { email: adminEmail },
      {
        name: "Admin",
        password: hashedPassword,
        isAdmin: true,
      },
      {
        new: true,
        upsert: true, // Create if doesn't exist
      }
    );

    console.log("\nAdmin account created successfully:");
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}\n`);

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error.message);
    process.exit(1);
  }
}

createAdmin();
