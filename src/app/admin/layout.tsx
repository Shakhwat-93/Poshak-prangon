import { BottomNav } from "@/components/admin/BottomNav";
import { Sidebar } from "@/components/admin/Sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex bg-[#fcfcfc] text-slate-900 font-sans selection:bg-slate-200 overflow-hidden h-screen w-full">
            <Sidebar />
            <div className="flex-1 flex flex-col relative w-full h-full overflow-hidden sm:border-l border-slate-100">
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
                <div className="lg:hidden">
                    <BottomNav />
                </div>
            </div>
        </div>
    );
}
