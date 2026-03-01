import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

/**
 * One-time migration endpoint to add 'status' column to orders table.
 * Call this via GET /api/admin/migrate to add the missing column.
 */
export async function GET() {
    try {
        // Try to add the status column using rpc
        const { error } = await supabase.rpc('exec_sql', {
            query: `
                DO $$
                BEGIN
                    IF NOT EXISTS (
                        SELECT 1 FROM information_schema.columns
                        WHERE table_name = 'orders' AND column_name = 'status'
                    ) THEN
                        ALTER TABLE orders ADD COLUMN status TEXT DEFAULT 'pending';
                    END IF;
                END $$;
                NOTIFY pgrst, 'reload schema';
            `
        });

        if (error) {
            // If rpc doesn't exist, return the instructions
            return NextResponse.json({
                success: false,
                message: 'Please run this SQL in Supabase SQL Editor manually',
                sql: "ALTER TABLE orders ADD COLUMN status TEXT DEFAULT 'pending'; NOTIFY pgrst, 'reload schema';",
                error: error.message
            }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: 'Migration complete!' });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Migration failed',
            error: String(error)
        }, { status: 500 });
    }
}
