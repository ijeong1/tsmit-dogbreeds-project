import { z } from 'zod';

// Inquery schema for validating user input in a dog breeds application
export const InquerySchema = z.object({
    name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters long" }),
    
    email: z
        .string().email({ message: "Invalid email address" })
        .refine((value) => value.endsWith('@example.com'), {
            message: "Email must end with @example.com",
        }),
    subject: z
        .string()
        .min(1, { message: "Subject is required" }),
    message: z
        .string()
        .min(5, { message: "Message must be at least 5 characters long" }),
});