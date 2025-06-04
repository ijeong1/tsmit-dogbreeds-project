import { supabase } from "@/lib/supabaseClient";
import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import CredentialProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialProvider({
            name: "Email and Password",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            
            async authorize(credentials) {
                const email = credentials?.email;
                const password = credentials?.password;
                
                if (!email || !password) {
                    throw new Error("Email and password are required");
                }
                
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });

                if (error || !data.user) {
                    throw new Error(error?.message || "Authentication failed");
                }
                
                return {
                    id: data.user.id,
                    email: data.user.email
                };
            }
        })

    ]
}