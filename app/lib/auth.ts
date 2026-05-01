import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

// Use primitive string instead of String
const client = new MongoClient(process.env.MONGODB_URI as string);

// Extract database name from connection string or use default
const dbName = process.env.MONGODB_URI?.split('/').pop()?.split('?')[0] || 'singhdentalcare';
const db = client.db(dbName);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  database: mongodbAdapter(db, {
    // Disable transactions for standalone MongoDB
    transaction: false,
    // Enables transactions (only works with replica sets)
    // client,
  }),

  emailAndPassword: {
    enabled: true,
  },
});