import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

interface ChatMessage {
    role: 'user' | 'model',
    content: string;
}

export const POST = async(req: NextRequest) => {
    try{
        const { messages } = await req.json();
        const chatHistory = messages.map((msg: ChatMessage) => (
            {
            role: msg.role,
            parts: [ { text: msg.content }]
            }
        ))

        const chat = genAI.chats.create({
            model: 'gemini-2.5-flash',
            history: chatHistory
        });

        const lastMessage = messages[messages.length - 1]?.content || '';
        const result = await chat.sendMessage({ message: lastMessage})
    }catch(error){
        console.error('Gemini API Error:', error);
        return NextResponse.json(
            { error: 'Failed to process the request.' },
            { status: 500 },
        )
    }
}