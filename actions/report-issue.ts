'use server';

import Mailjet from 'node-mailjet';
import { ReportIssueSchema } from "@/lib/zod-schema";

export type ActionResult = { success: boolean; errors: null;} | { success: false; errors: Record<string, string[]>;}

export async function sendReportAction(prevState: ActionResult, formData: FormData): Promise<ActionResult> {
    const raw = {
        title: formData.get('title')?.toString() || '',
        content: formData.get('content')?.toString() || '',
    };

    const result = ReportIssueSchema.safeParse(raw);
    if (!result.success) {
        return {
            success: false,
            errors: result.error.flatten().fieldErrors || {},
        };
    }

    const mailjet = Mailjet.apiConnect(
        process.env.MAILJET_API_KEY!,
        process.env.MAILJET_SECRET_KEY!
    );

    try {
        const request = mailjet.post("send", { version: "v3.1" }).request({
            Messages: [
                {
                    From: {
                        Email: process.env.MAILJET_SENDER_EMAIL!,
                        Name: "Report System",
                    },
                    To: [
                        {
                            Email: process.env.MAILJET_RECIPIENT_EMAIL!,
                            Name: "DogBreeds Admin",
                        },
                    ],
                    Subject: `[Report] ${raw.title}`,
                    TextPart: `Title: ${raw.title}\n\nContent:\n${raw.content}`,
                    HTMLPart: `<h3>${raw.title}</h3><p>${raw.content.replace(/\n/g, '<br>')}</p>`,
                },
            ],
        });

        await request;
        return { success: true, errors: null };
    } catch (error) {
        console.error("Mailjet Error:", error);
        return {
            success: false,
            errors: { mail: ["Failed to send email. Please try again later."] },
        };
    }
}
