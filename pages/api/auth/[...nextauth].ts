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
    ],
    
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.sub)
            {
                session.user.id = token.sub;

            }

            return session;
        }
    },

    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60 // 24 hours
    },
    pages: {
        signIn: "/auth/signin",
        // error: "/auth/error", // Error page URL
        // signOut: "/auth/signout", // Sign out page URL
        // verifyRequest: "/auth/verify-request", // Verification request page URL
        newUser: "/register"
    },
}

export default NextAuth(authOptions);