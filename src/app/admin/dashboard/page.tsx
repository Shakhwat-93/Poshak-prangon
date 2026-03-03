"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import DashboardClient from "./DashboardClient";

interface Order {
    id: string;
    name: string;
    phone: string;
    address: string;
    combos: string[];
    total_price: number;
    created_at: string;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
}

// ─── Fully client-side dashboard (required for static export mode) ────────────
// Orders are fetched directly from Supabase on mount.
// Auth is enforced via localStorage (set by /admin/login).
export default function AdminDashboard() {
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [error, setError] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // ── Client-side auth guard ────────────────────────────────────────────
        const isAuth = localStorage.getItem("admin_auth");
        if (!isAuth) {
            router.replace("/admin/login");
            return;
        }

        // ── Fetch orders from Supabase ────────────────────────────────────────
        const fetchOrders = async () => {
            const { data, error: fetchError } = await supabase
                .from("orders")
                .select("*")
                .order("created_at", { ascending: false });

            if (fetchError) {
                setError(fetchError.message);
            } else {
                setOrders(data || []);
            }
            setLoading(false);
        };

        fetchOrders();
    }, [router]);

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center h-full bg-white">
                <div className="flex flex-col items-center gap-3 text-slate-400">
                    <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-600 rounded-full animate-spin" />
                    <p className="text-sm font-medium">লোড হচ্ছে...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-white overflow-y-auto w-full">
            {/* Header */}
            <header className="px-6 lg:px-10 pt-10 pb-4 lg:pt-10 lg:pb-8 flex justify-between items-center bg-white sticky top-0 z-40 bg-white/80 backdrop-blur-md">
                <h1 className="text-2xl lg:text-[28px] font-bold tracking-tight text-slate-900">ড্যাশবোর্ড</h1>
                <div className="flex items-center gap-4">
                    <button className="text-slate-400 hover:text-slate-600 transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                        </svg>
                    </button>
                    <button
                        onClick={() => { localStorage.removeItem("admin_auth"); router.push("/admin/login"); }}
                        className="w-10 h-10 bg-[#0f172a] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md transition-transform hover:scale-105"
                        title="Logout"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                    </button>
                </div>
            </header>

            <main className="flex-1 px-6 lg:px-10 pb-24 md:pb-12 max-w-[1400px] w-full">
                <DashboardClient initialOrders={orders} error={error} />
            </main>
        </div>
    );
}
