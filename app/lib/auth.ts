import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const MONGODB_URI = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_URI?.split('/').pop()?.split('?')[0] || 'singhdentalcare';

// Use a global variable to preserve the client across hot reloads in development
let client: MongoClient;

if (process.env.NODE_ENV === "development") {
    if (!(global as any)._mongoClient) {
        (global as any)._mongoClient = new MongoClient(MONGODB_URI);
    }
    client = (global as any)._mongoClient;
} else {
    client = new MongoClient(MONGODB_URI);
}

export const db = client.db(dbName);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(db, {
    transaction: false,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "admin",
      },
      permissions: {
        type: "string", // Storing as comma-separated or JSON string for simplicity with some adapters, or just array if supported
        defaultValue: "all",
      }
    }
  },
  // Added for better debugging of the 500 error
  logger: {
    level: "debug",
    handler: (level, message, ...args) => {
        console.log(`[Better-Auth] [${level}]`, message, ...args);
    }
  }
});