import { MongoClient } from "mongodb";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import dns from "dns";

dns.setServers(['8.8.8.8']);

async function reseed() {
    const username = "mis-sdc";
    const password = "mis@singhdentalcare";
    const host = "singhdentalcare.4i0kmvb.mongodb.net";
    const dbName = "singhdentalcare";
    
    const uri = `mongodb+srv://${username}:${encodeURIComponent(password)}@${host}/${dbName}?retryWrites=true&w=majority&appName=SinghDentalCare`;
    
    console.log("Reseeding admin user to Atlas...");
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const db = client.db(dbName);
        
        // Delete existing user and accounts
        const email = "ceo@singhdentalcare.in";
        const user = await db.collection("user").findOne({ email });
        if (user) {
            console.log("Deleting existing user...");
            await db.collection("account").deleteMany({ userId: user._id });
            await db.collection("session").deleteMany({ userId: user._id });
            await db.collection("user").deleteOne({ _id: user._id });
        }

        const auth = betterAuth({
            baseURL: "http://localhost:3000",
            database: mongodbAdapter(db, { transaction: false }),
            emailAndPassword: { enabled: true },
        });

        const adminPassword = "ceo@singhdentalcare";
        await auth.api.signUpEmail({
            body: {
                email,
                password: adminPassword,
                name: "CEO",
            }
        });

        console.log("Admin user re-created successfully in Atlas");
        
        // Final Verification
        const verify = await auth.api.signInEmail({
            body: { email, password: adminPassword }
        });
        console.log("Server-side verification successful for:", verify.user.email);

    } catch (error: any) {
        console.error("Error during reseed:", error);
    } finally {
        await client.close();
        process.exit();
    }
}

reseed();
