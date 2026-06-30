import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { admin } from "better-auth/plugins";
import dns from "dns";

// Use Google DNS to resolve MongoDB Atlas SRV records
// This fixes the querySrv ECONNREFUSED error in certain network environments like Vercel
if (typeof window === "undefined") {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
}

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    console.warn("[Auth] MONGODB_URI is not defined in environment variables");
} else {
    // Log a masked version of the URI for debugging
    const maskedUri = MONGODB_URI.replace(/\/\/.*@/, "//****:****@");
    console.log(`[Auth] MONGODB_URI is present: ${maskedUri}`);
}

// More robust way to extract dbName
const getDbName = (uri: string) => {
    try {
        if (!uri) return 'singhdentalcare';
        const url = new URL(uri.replace('mongodb+srv://', 'http://')); // URL parser doesn't like mongodb+srv
        const path = url.pathname.replace('/', '');
        return path || 'singhdentalcare';
    } catch (e) {
        return 'singhdentalcare';
    }
};

const dbName = getDbName(MONGODB_URI);
console.log(`[Auth] Using database: ${dbName}`);

// Use a global variable to preserve the client across hot reloads
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
    if (!(global as any)._mongoClient) {
        const c = new MongoClient(MONGODB_URI);
        (global as any)._mongoClient = c;
        (global as any)._mongoClientPromise = c.connect();
    }
    client = (global as any)._mongoClient;
    clientPromise = (global as any)._mongoClientPromise;
} else {
    client = new MongoClient(MONGODB_URI);
    clientPromise = client.connect();
}

// Function to get DB instance lazily
export const getDB = async () => {
    await clientPromise;
    return client.db(dbName);
};

// Export db as the Db instance directly to satisfy better-auth types
export const db = client.db(dbName);

const getBaseURL = () => {
    let url = process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL;
    
    if (!url && process.env.VERCEL_URL) {
        url = `https://${process.env.VERCEL_URL}`;
    }
    
    if (!url) {
        url = "http://localhost:3000";
    }

    // Remove trailing slash if present
    return url.replace(/\/$/, "");
};

const baseURL = getBaseURL();
console.log(`[Auth] Better Auth Base URL: ${baseURL}`);
console.log(`[Auth] BETTER_AUTH_SECRET present: ${!!process.env.BETTER_AUTH_SECRET}`);

export const auth = betterAuth({
 baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(db, {
    transaction: false,
  }),
  emailAndPassword: {
    enabled: true,
  },
  // This is often required for Vercel and other proxy environments
  // Moved to top-level as it's not valid inside advanced in this version
  trustHost: true,
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "admin",
        input: true, // Allow setting role during creation
      },
      permissions: {
        type: "string", 
        defaultValue: "all",
        input: true, // Allow setting permissions during creation
      }
    }
  },
  // plugins: [
  //   admin()
  // ],
  logger: {
    level: "debug",
    handler: (level: string, message: string, ...args: any[]) => {
        console.log(`[Better-Auth] [${level}]`, message, ...args);
    }
  }
});