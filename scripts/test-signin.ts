import { auth } from "../app/lib/auth";
import dns from "dns";
dns.setServers(['8.8.8.8']);

async function testSignIn() {
    try {
        console.log("Attempting sign in with ceo@singhdentalcare.in...");
        const result = await auth.api.signInEmail({
            body: {
                email: "ceo@singhdentalcare.in",
                password: "ceo@singhdentalcare",
            }
        });
        console.log("Sign in successful!", result.user.email);
    } catch (error: any) {
        console.error("Sign in failed:", error.message || error);
    } finally {
        process.exit();
    }
}

testSignIn();
