import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Insert order with status 'pending' and return the generated ID
        const { data: insertedOrder, error } = await supabase.from('orders').insert([{
            name: data.name,
            phone: data.phone,
            address: data.address,
            combos: data.combos,
            total_price: data.totalPrice,
            status: 'pending',
        }]).select('id').single();

        if (error) {
            console.error("Supabase Error:", error);
            throw error;
        }

        return NextResponse.json(
            { success: true, message: 'Order received successfully!', order_id: insertedOrder.id },
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
