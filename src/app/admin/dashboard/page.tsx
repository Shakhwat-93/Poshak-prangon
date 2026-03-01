import { supabase } from "@/utils/supabase";
import DashboardClient from "./DashboardClient";

export const revalidate = 0; // Ensures fresh data load on admin dashboard visit

export default async function AdminDashboard() {
    // Fetch all orders from Supabase
    const { data: orders, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div className="flex-1 flex flex-col h-full bg-white overflow-y-auto w-full">
            {/* Header */}
            <header className="px-6 lg:px-10 pt-10 pb-4 lg:pt-10 lg:pb-8 flex justify-between items-center bg-white sticky top-0 z-40 bg-white/80 backdrop-blur-md">
                <h1 className="text-2xl lg:text-[28px] font-bold tracking-tight text-slate-900">ড্যাশবোর্ড</h1>
                <div className="flex items-center gap-4">
                    {/* Placeholder theme toggle icon matching reference */}
                    <button className="text-slate-400 hover:text-slate-600 transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                        </svg>
                    </button>
                    {/* Placeholder Avatar - matching reference */}
                    <button className="w-10 h-10 bg-[#0f172a] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md transition-transform hover:scale-105">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 10v12"></path>
                            <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
                        </svg>
                    </button>
                </div>
            </header>

            <main className="flex-1 px-6 lg:px-10 pb-24 md:pb-12 max-w-[1400px] w-full">
                <DashboardClient initialOrders={orders || []} error={error?.message} />
            </main>
        </div>
    );
}
