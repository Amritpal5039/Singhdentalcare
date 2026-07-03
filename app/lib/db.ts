import dns from "dns";

// Use Google and Cloudflare DNS to resolve MongoDB Atlas SRV records
if (typeof window === "undefined") {
  try {
    dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4", "1.0.0.1"]);
  } catch (err) {
    console.warn("Failed to set DNS servers:", err);
  }
}

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

/**
 * We use a global singleton pattern for the mongoose connection promise to share it
 * across hot-reloads in development.
 */
async function connectDB() {
    if (!(global as any)._mongoosePromise) {
        const opts = {
            bufferCommands: false,
        };

        console.log("Connecting to MongoDB...");
        (global as any)._mongoosePromise = mongoose.connect(MONGODB_URI!, opts)
            .then((m) => {
                console.log("MongoDB (Mongoose) connected successfully!");
                return m;
            })
            .catch((err) => {
                (global as any)._mongoosePromise = null;
                throw err;
            });
    }

    try {
        const conn = await (global as any)._mongoosePromise;
        return conn;
    } catch (e) {
        (global as any)._mongoosePromise = null;
        console.error("MongoDB connection error:", e);
        throw e;
    }
}

export default connectDB;
