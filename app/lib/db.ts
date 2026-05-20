import mongoose from "mongoose";
import dns from "dns";
import { MongoClient } from "mongodb";

// Use Google DNS to resolve MongoDB Atlas SRV records
if (typeof window === "undefined") {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

/**
 * We use a global singleton pattern for the MongoClient promise to share it 
 * between Better-Auth and Mongoose.
 */
let cachedPromise: Promise<typeof mongoose>;

if (!(global as any)._mongoosePromise) {
    const opts = {
        bufferCommands: false,
    };

    // Using the same URI and logic as auth.ts
    (global as any)._mongoosePromise = mongoose.connect(MONGODB_URI, opts).then((m) => {
        console.log("MongoDB (Mongoose) connected successfully!");
        return m;
    });
}
cachedPromise = (global as any)._mongoosePromise;

async function connectDB() {
    try {
        const conn = await cachedPromise;
        return conn;
    } catch (e) {
        (global as any)._mongoosePromise = null;
        console.error("MongoDB connection error:", e);
        throw e;
    }
}

export default connectDB;
