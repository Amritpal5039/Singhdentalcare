import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import dns from "dns";

// Use Google DNS to resolve MongoDB Atlas SRV records
dns.setServers(['8.8.8.8']);

async function main() {
  console.log("Loading environment variables from .env...");
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
    console.error("Error parsing .env file:", err);
  }

  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error("Error: MONGODB_URI is not defined in .env");
    process.exit(1);
  }

  // More robust way to extract dbName
  const getDbName = (uri: string) => {
    try {
      const url = new URL(uri.replace('mongodb+srv://', 'http://'));
      const dbPath = url.pathname.replace('/', '');
      return dbPath || 'singhdentalcare';
    } catch (e) {
      return 'singhdentalcare';
    }
  };

  const dbName = getDbName(MONGODB_URI);
  console.log(`Connecting to MongoDB database: ${dbName}...`);
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log("Connected successfully to MongoDB.");
    const db = client.db(dbName);

    // User details to create
    const email = "it@singhdentalcare.in";
    const password = "123456789";
    const name = "IT Admin";
    const role = "admin";
    const permissions = "all";

    console.log(`Checking for existing user: ${email}...`);
    // Delete existing user if exists, to recreate cleanly
    await db.collection("user").deleteOne({ email });
    // Also clean up any lingering better-auth sessions/accounts for this user email
    await db.collection("session").deleteMany({ email });
    await db.collection("account").deleteMany({ email });

    console.log("Hashing password...");
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = {
      email,
      password: hashedPassword,
      name,
      role,
      permissions,
      createdAt: new Date(),
    };

    console.log(`Creating user: ${email}...`);
    const result = await db.collection("user").insertOne(newUser);
    console.log(`Success! User created with ID: ${result.insertedId}`);
    console.log(`- Email: ${email}`);
    console.log(`- Role: ${role}`);
    console.log(`- Password: ${password}`);

    // Recreate the CEO user to ensure they can also log in using the new system
    const ceoEmail = "ceo@singhdentalcare.in";
    const ceoPassword = "ceo@singhdentalcare";
    const ceoUser = await db.collection("user").findOne({ email: ceoEmail });
    if (ceoUser) {
      console.log(`Updating CEO user password for the new JWT system...`);
      const ceoHashedPassword = bcrypt.hashSync(ceoPassword, 10);
      await db.collection("user").updateOne(
        { _id: ceoUser._id },
        { 
          $set: { 
            password: ceoHashedPassword, 
            role: "admin", 
            permissions: "all" 
          } 
        }
      );
      console.log(`CEO user password updated successfully.`);
    } else {
      console.log(`CEO user not found, creating one...`);
      const ceoHashedPassword = bcrypt.hashSync(ceoPassword, 10);
      await db.collection("user").insertOne({
        email: ceoEmail,
        password: ceoHashedPassword,
        name: "CEO",
        role: "admin",
        permissions: "all",
        createdAt: new Date(),
      });
      console.log(`CEO user created successfully.`);
    }

  } catch (error) {
    console.error("Error running script:", error);
  } finally {
    await client.close();
    console.log("Disconnected from MongoDB.");
  }
}

main();
