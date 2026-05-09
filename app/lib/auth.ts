import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import dns from "dns";

// Use Google DNS to resolve MongoDB Atlas SRV records
if (typeof window === "undefined") {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
}

// Use primitive string instead of String
const client = new MongoClient(process.env.MONGODB_URI as string);

// Extract database name from connection string or use default
const dbName = process.env.MONGODB_URI?.split('/').pop()?.split('?')[0] || 'singhdentalcare';
const db = client.db(dbName);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(db, {
    // Disable transactions for standalone MongoDB
    transaction: false,
  }),
  emailAndPassword: {
    enabled: true,
  },
});