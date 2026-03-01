import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // In a real application, you would save this to a database (like Supabase, PostgreSQL, or MongoDB)
        // or send it to an email/Telegram bot.
        console.log("New Order Received:", data);

        return NextResponse.json(
            { success: true, message: 'Order received successfully!' },
            { status: 200 }
        );
    } catch (error) {
        console.error("Order processing error:", error);
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
