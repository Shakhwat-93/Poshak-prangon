import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // First, insert the order WITHOUT the status column
        // (status column has a default value of 'pending' set in the database)
        const { data: insertedOrder, error } = await supabase.from('orders').insert({
            name: data.name,
            phone: data.phone,
            address: data.address,
            combos: data.combos,
            total_price: data.totalPrice,
        }).select('id');

        if (error) {
            console.error("Supabase Insert Error:", JSON.stringify(error, null, 2));
            return NextResponse.json(
                { success: false, message: error.message },
                { status: 500 }
            );
        }

        const orderId = insertedOrder?.[0]?.id || `ORD-${Date.now()}`;

        // Now try to set status separately (in case schema cache hasn't picked it up yet)
        try {
            await supabase.from('orders').update({ status: 'pending' }).eq('id', orderId);
        } catch {
            // Silently fail — the default value in DB should handle this
            console.log("Note: Could not set status column, relying on DB default.");
        }

        return NextResponse.json(
            { success: true, message: 'Order received successfully!', order_id: orderId },
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
