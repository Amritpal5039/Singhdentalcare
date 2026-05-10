import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server. If not provided, it will use the current origin. */
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL
})