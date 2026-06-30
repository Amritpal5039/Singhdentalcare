import { MongoClient } from "mongodb";
import dns from "dns";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Use Google DNS to resolve MongoDB Atlas SRV records
// This fixes the querySrv ECONNREFUSED error in certain network environments like Vercel
if (typeof window === "undefined") {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
}

import fs from "fs";
import path from "path";

// Manually load .env variables if not already set (e.g. when run via standalone scripts)
if (!process.env.MONGODB_URI) {
  try {
    const envPath = path.join(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const envLines = envContent.split('\n');
      for (const line of envLines) {
        const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)\s*$/);
        if (match) {
          const key = match[1].trim();
          let val = match[2].trim();
          if (val.startsWith('"') && val.endsWith('"')) {
            val = val.substring(1, val.length - 1);
          } else if (val.startsWith("'") && val.endsWith("'")) {
            val = val.substring(1, val.length - 1);
          }
          process.env[key] = val;
        }
      }
    }
  } catch (err) {
    console.error("[Auth] Error parsing .env file:", err);
  }
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

// Export db as the Db instance directly
export const db = client.db(dbName);

const JWT_SECRET = process.env.BETTER_AUTH_SECRET || "singhdentalcare-secret-jwt-token-key-123456";

export const auth = {
  options: {
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  },
  api: {
    getSession: async ({ headers }: { headers: Headers }) => {
      try {
        const cookieHeader = headers.get("cookie") || "";
        const match = cookieHeader.match(/sdc_session=([^;]+)/);
        if (!match) return null;
        
        const token = match[1];
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        
        return {
          user: {
            id: decoded.id,
            email: decoded.email,
            name: decoded.name,
            role: decoded.role || "admin",
            permissions: decoded.permissions || "all",
          },
          session: {
            id: decoded.id,
            expiresAt: new Date(decoded.exp * 1000),
          }
        };
      } catch (e) {
        return null;
      }
    },
    signUpEmail: async ({ body }: { body: any }) => {
      const { email, password, name, role, permissions } = body;
      if (!email || !password || !name) {
        throw new Error("Missing email, password or name");
      }
      
      const database = client.db(dbName);
      const emailLower = email.trim().toLowerCase();
      
      // Hash password using bcryptjs
      const hashedPassword = bcrypt.hashSync(password, 10);
      
      const newUserDoc = {
        email: emailLower,
        password: hashedPassword,
        name,
        role: role || "admin",
        permissions: permissions || "all",
        createdAt: new Date(),
      };
      
      const result = await database.collection("user").insertOne(newUserDoc);
      return {
        user: {
          id: result.insertedId.toString(),
          email: newUserDoc.email,
          name: newUserDoc.name,
          role: newUserDoc.role,
          permissions: newUserDoc.permissions,
        }
      };
    },
    signInEmail: async ({ body }: { body: any }) => {
      const { email, password } = body;
      const database = client.db(dbName);
      const emailLower = email.trim().toLowerCase();
      
      const user = await database.collection("user").findOne({ email: emailLower });
      if (!user) {
        throw new Error("Invalid email or password");
      }
      
      const isValid = bcrypt.compareSync(password, user.password || "");
      if (!isValid) {
        throw new Error("Invalid email or password");
      }
      
      return {
        user: {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role || "admin",
          permissions: user.permissions || "all",
        }
      };
    }
  }
};