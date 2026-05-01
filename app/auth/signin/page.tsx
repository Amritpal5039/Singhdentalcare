"use client";
import { authClient } from "@/app/lib/auth-client";
import { useState } from "react";
export default function SigninPage() {
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const handlelogin =async()=>{
    const { data, error } = await authClient.signIn.email({
        /**
         * The user email
         */
        email,
        /**
         * The user password
         */
        password,
        /**
         * A URL to redirect to after the user verifies their email (optional)
         */
        callbackURL: "/dashboard",
        /**
         * remember the user session after the browser is closed. 
         * @default true
         */
        rememberMe: true
}, {
    //callbacks
})
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
     <form onSubmit={handlelogin}>
      <input type="text" value={email} placeholder="enter your email here." onChange={(e)=>setemail(e.target.value)}/>
      <input type="password" value={password} placeholder="enter your password here" onChange={(e)=>setpassword(e.target.value)}/>
      <button type="submit">Sign In</button>
     </form>
    </div>
  );
}
