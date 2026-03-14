import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";
import { NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    "Error: DB_URI is not defined inside .env.<development/production>.local.",
  );
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);

    console.log(
      `Connected to MongoDB database successfully in ${NODE_ENV} mode.`,
    );
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};

export default connectToDatabase;
