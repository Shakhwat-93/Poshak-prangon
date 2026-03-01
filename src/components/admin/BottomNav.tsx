import Link from "next/link";
import { LayoutDashboard, LineChart, Wallet, MessageSquare, Settings } from "lucide-react";

export function BottomNav() {
    return (
        <div className="bg-[#111] text-white px-6 pb-6 pt-4 rounded-t-3xl flex justify-between items-center w-full sticky bottom-0 z-50">
            <NavItem icon={<LayoutDashboard size={22} />} label="Dashboard" active />
            <NavItem icon={<LineChart size={22} />} label="Analytics" />
            <NavItem icon={<Wallet size={22} />} label="Wallets" />
            <NavItem icon={<MessageSquare size={22} />} label="Review" />
            <NavItem icon={<Settings size={22} />} label="Settings" />
        </div>
    );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
    return (
        <Link href="#" className={`flex flex-col items-center gap-1.5 transition-colors ${active ? "text-white" : "text-white/40 hover:text-white/70"}`}>
            <div className={`${active ? "opacity-100" : "opacity-80"}`}>{icon}</div>
            <span className="text-[10px] font-medium tracking-wide">{label}</span>
        </Link>
    );
}
