import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import dns from "dns";

dns.setServers(['8.8.8.8']);

async function reseed() {
    const username = "mis-sdc";
    const password = "mis@singhdentalcare";
    const host = "singhdentalcare.4i0kmvb.mongodb.net";
    const dbName = "singhdentalcare";
    
    const uri = `mongodb+srv://${username}:${encodeURIComponent(password)}@${host}/${dbName}?retryWrites=true&w=majority&appName=SinghDentalCare`;
    
    console.log("Reseeding admin user to Atlas (Custom JWT/Bcrypt Setup)...");
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const db = client.db(dbName);
        
        // CEO Details
        const email = "ceo@singhdentalcare.in";
        const adminPassword = "ceo@singhdentalcare";
        
        console.log(`Re-creating user: ${email}...`);
        await db.collection("user").deleteOne({ email });
        await db.collection("account").deleteMany({ email });
        await db.collection("session").deleteMany({ email });
        
        const hashedCeoPassword = bcrypt.hashSync(adminPassword, 10);
        await db.collection("user").insertOne({
            email,
            password: hashedCeoPassword,
            name: "CEO",
            role: "admin",
            permissions: "all",
            createdAt: new Date(),
        });
        console.log("CEO user created successfully in Atlas");

        // IT Admin Details
        const itEmail = "it@singhdentalcare.in";
        const itPassword = "123456789";
        console.log(`Re-creating user: ${itEmail}...`);
        await db.collection("user").deleteOne({ email: itEmail });
        
        const hashedItPassword = bcrypt.hashSync(itPassword, 10);
        await db.collection("user").insertOne({
            email: itEmail,
            password: hashedItPassword,
            name: "IT Admin",
            role: "admin",
            permissions: "all",
            createdAt: new Date(),
        });
        console.log("IT Admin user created successfully in Atlas");

        // Verification check
        const verifyUser = await db.collection("user").findOne({ email });
        if (verifyUser && bcrypt.compareSync(adminPassword, verifyUser.password)) {
            console.log("Verification successful: password matches for", verifyUser.email);
        } else {
            console.error("Verification failed for CEO!");
        }

    } catch (error: any) {
        console.error("Error during reseed:", error);
    } finally {
        await client.close();
        process.exit();
    }
}

reseed();
