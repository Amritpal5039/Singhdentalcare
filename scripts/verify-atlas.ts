import { MongoClient } from "mongodb";
import dns from "dns";

// Use Google DNS
dns.setServers(['8.8.8.8']);

async function verifyAtlas() {
    const username = "mis-sdc";
    const password = "mis@singhdentalcare";
    const host = "singhdentalcare.4i0kmvb.mongodb.net";
    const dbName = "singhdentalcare";
    
    const uri = `mongodb+srv://${username}:${encodeURIComponent(password)}@${host}/${dbName}?retryWrites=true&w=majority&appName=SinghDentalCare`;
    
    console.log("Connecting to Atlas...");
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        console.log("Connected successfully");
        const db = client.db(dbName);
        
        const user = await db.collection("user").findOne({ email: "ceo@singhdentalcare.in" });
        if (user) {
            console.log("Found user:", user.email);
            const account = await db.collection("account").findOne({ userId: user._id });
            if (account) {
                console.log("Found account with provider:", account.providerId);
            } else {
                console.log("Account NOT found for user!");
            }
        } else {
            console.log("User NOT found!");
        }
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
        process.exit();
    }
}

verifyAtlas();
