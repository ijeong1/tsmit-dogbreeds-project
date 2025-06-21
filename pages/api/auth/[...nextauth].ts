import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "@/lib/prismaClient";
import { supabase } from "@/lib/supabaseClient";
import { id } from "zod/v4/locales";
import { v4 as uuidv4 } from "uuid";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
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
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],
    
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google" ||  account?.provider === "github") {
                try {
                    const existingProfile = await prisma.profiles.findUnique({
                        where: { google_id: user.id },
                    });
                    
                    if (!existingProfile) {
                        await prisma.profiles.create({
                            data: {
                                id : uuidv4(),
                                google_id: user.id,
                                name: user.name || "Unnamed",
                                phone: "",
                                street: "",
                                city: "",
                                state: "",
                                zipcode: "",
                            }
                        })
                    }
                    return true;
                } catch (error) {
                    console.error("Error creating Google user profile:", error);
                    return false;
                }
            }
            return true;
        },
        async session({ session, token }) {
            if (token?.sub)
            {
                session.user.id = token.sub;

            }

            // after create profiles table
            const profile = await prisma.profiles.findUnique({
                where: { id: token.sub },
            });
            // after create profiles table
            if (profile) {
                session.user.name = profile.name;
                session.user.phone = profile.phone;
                session.user.street = profile.street;
                session.user.city = profile.city;
                session.user.state = profile.state;
                session.user.zipcode = profile.zipcode;
                session.user.stripe_customer_id = profile.stripe_customer_id;
                session.user.subscription_status = profile.subscription_status;
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
        newUser: "/register"
        // error: "/auth/error", // Error page URL
        // signOut: "/auth/signout", // Sign out page URL
        // verifyRequest: "/auth/verify-request", // Verification request page URL
    },
}

export default NextAuth(authOptions);
