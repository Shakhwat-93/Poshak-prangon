import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function PATCH(request: Request) {
    try {
        const { orderId, status } = await request.json();

        if (!orderId || !status) {
            return NextResponse.json(
                { success: false, message: 'orderId and status are required' },
                { status: 400 }
            );
        }

        // Direct update now that schema cache is reloaded
        const { error } = await supabase
            .from('orders')
            .update({ status })
            .eq('id', orderId);

        if (error) {
            console.error("Status update error:", JSON.stringify(error, null, 2));
            return NextResponse.json(
                { success: false, message: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Status update error:", error);
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
