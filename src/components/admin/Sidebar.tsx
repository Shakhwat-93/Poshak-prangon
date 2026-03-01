import Link from "next/link";
import { LayoutDashboard, LineChart, Wallet, MessageSquare, Settings } from "lucide-react";

export function Sidebar() {
    return (
        <aside className="hidden lg:flex flex-col w-[260px] bg-[#111] text-white h-full px-5 py-8 justify-between shrink-0">
            <div className="space-y-12 w-full">
                <div className="font-bold text-2xl tracking-tight leading-none text-white px-3 mt-2">
                    পোশাক<br />প্রাঙ্গণ <span className="text-[#10b981]">.</span>
                </div>

                <nav className="flex flex-col gap-1.5 w-full">
                    <NavItem icon={<LayoutDashboard size={20} />} label="ড্যাশবোর্ড" active />
                    <NavItem icon={<LineChart size={20} />} label="অ্যানালিটিক্স" />
                    <NavItem icon={<Wallet size={20} />} label="ওয়ালেটস" />
                    <NavItem icon={<MessageSquare size={20} />} label="রিভিউ" />
                </nav>
            </div>

            <div className="space-y-8 w-full">
                <nav className="flex flex-col gap-1.5 w-full">
                    <NavItem icon={<Settings size={20} />} label="সেটিংস" />
                </nav>
            </div>
        </aside>
    );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
    return (
        <Link href="#" className={`relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all ${active ? "bg-[#222] text-white font-bold" : "text-white/50 hover:bg-white/5 hover:text-white/80 font-medium"}`}>
            <div className={`${active ? "opacity-100" : "opacity-80"}`}>{icon}</div>
            <span className="text-sm tracking-wide">{label}</span>
            {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full opacity-20"></div>
            )}
        </Link>
    );
}
