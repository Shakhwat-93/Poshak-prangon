"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import { ChevronDown } from "lucide-react";
import { supabase } from "@/utils/supabase";

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

export default function DashboardClient({ initialOrders, error }: { initialOrders: Order[], error?: string }) {
    // Local state for orders to allow optimistic UI updates
    const [orders, setOrders] = useState<Order[]>(initialOrders.map(o => ({ ...o, status: o.status || 'pending' })));

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((acc, order) => acc + order.total_price, 0);
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const processedOrders = orders.filter(o => o.status === 'processing' || o.status === 'completed').length;

    // Format numbers to Bengali numerals
    const formatNumber = (num: number) => {
        return num.toLocaleString('bn-BD');
    };

    const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
        // Optimistic update
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));

        try {
            const { error: updateError } = await supabase
                .from('orders')
                .update({ status: newStatus })
                .eq('id', orderId);

            if (updateError) throw updateError;
        } catch (e) {
            // Revert changes on error
            setOrders(initialOrders.map(o => ({ ...o, status: o.status || 'pending' })));
            console.error("Failed to update status in database:", e);
        }
    };

    if (error) {
        return <div className="text-red-500 font-bold p-4 bg-red-50 rounded-2xl">{error}</div>;
    }

    return (
        <div className="space-y-10 lg:space-y-12 mt-4 lg:mt-6">
            {/* Top Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                <div className="bg-[#121422] text-white rounded-[2rem] p-6 lg:p-7 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[160px]">
                    <div className="space-y-1 z-10">
                        <div className="flex items-center justify-between">
                            <h2 className="text-4xl font-extrabold tracking-tight">{formatNumber(totalOrders)}</h2>
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                <span className="text-white/40 text-[10px] font-bold">O</span>
                            </div>
                        </div>
                        <p className="text-white/50 text-sm font-medium mt-1">মোট অর্ডার</p>
                    </div>
                    {/* Simulated progress bar */}
                    <div className="space-y-2 mt-4 z-10 w-full">
                        <div className="flex justify-between text-[10px] font-bold text-white/40">
                            <span>0%</span>
                            <span>100%</span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                            <div className="h-full bg-white rounded-full w-[100%]"></div>
                        </div>
                    </div>
                    <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                </div>

                <div className="bg-white border border-slate-100 rounded-[2rem] p-6 lg:p-7 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.03)] flex flex-col justify-between min-h-[160px]">
                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <h2 className="text-4xl font-extrabold tracking-tight text-slate-800">{formatNumber(totalRevenue)}</h2>
                            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100/60">
                                <span className="text-indigo-500 text-[10px] font-bold">৳</span>
                            </div>
                        </div>
                        <p className="text-slate-500 text-sm font-medium mt-1">মোট আয়</p>
                    </div>
                </div>

                <div className="hidden lg:flex bg-white border border-slate-100 rounded-[2rem] p-6 lg:p-7 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.03)] flex-col justify-between min-h-[160px]">
                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <h2 className="text-4xl font-extrabold tracking-tight text-slate-800">{formatNumber(pendingOrders)}</h2>
                            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center border border-amber-100/60">
                                <span className="text-amber-500 text-[10px]">⏳</span>
                            </div>
                        </div>
                        <p className="text-slate-500 text-sm font-medium mt-1">পেন্ডিং অর্ডার</p>
                    </div>
                </div>

                <div className="hidden lg:flex bg-white border border-slate-100 rounded-[2rem] p-6 lg:p-7 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.03)] flex-col justify-between min-h-[160px]">
                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <h2 className="text-4xl font-extrabold tracking-tight text-slate-800">{formatNumber(processedOrders)}</h2>
                            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100/60">
                                <span className="text-emerald-500 text-[10px]">✓</span>
                            </div>
                        </div>
                        <p className="text-slate-500 text-sm font-medium mt-1">প্রসেসড অর্ডার</p>
                    </div>
                </div>
            </div>

            {/* Orders List Full Width Focus */}
            <div className="pt-4 lg:pt-8 w-full flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">সাম্প্রতিক অর্ডারসমূহ</h3>
                        <p className="text-slate-500 text-sm mt-1">সব নতুন অর্ডার পরিচালনা করুন।</p>
                    </div>
                    <div className="flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-500 border border-slate-100/50">
                        <span className="bg-white text-slate-900 px-3 py-1.5 rounded-full cursor-pointer shadow-sm border border-slate-100">সব অর্ডার</span>
                        <span className="px-3 py-1.5 cursor-pointer hover:text-slate-700 transition">পেন্ডিং</span>
                    </div>
                </div>

                <div className="w-full bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] overflow-hidden">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider font-bold">
                                    <th className="p-4 pl-6 font-semibold">ক্রেতা</th>
                                    <th className="p-4 font-semibold">যোগাযোগ</th>
                                    <th className="p-4 font-semibold">ঠিকানা</th>
                                    <th className="p-4 font-semibold">আইটেমসমূহ</th>
                                    <th className="p-4 font-semibold">তারিখ</th>
                                    <th className="p-4 font-semibold text-right">মূল্য</th>
                                    <th className="p-4 pr-6 font-semibold text-center w-24">স্ট্যাটাস</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {initialOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="text-slate-500 text-sm text-center py-12">
                                            এখনো কোনো অর্ডার নেই।
                                        </td>
                                    </tr>
                                ) : (
                                    initialOrders.map((order, idx) => (
                                        <tr key={order.id} className="hover:bg-slate-50/60 transition-colors group">
                                            <td className="p-4 pl-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-[#f8fafc] text-indigo-600 flex items-center justify-center font-bold uppercase text-xs border border-indigo-100/50 shrink-0">
                                                        {order.name.substring(0, 2)}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-900 text-sm">{order.name}</div>
                                                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">#{order.id.split('-')[0]}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="text-sm text-slate-700 font-medium">{order.phone}</div>
                                            </td>
                                            <td className="p-4 max-w-[200px]">
                                                <div className="text-sm text-slate-600 truncate" title={order.address}>{order.address}</div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {order.combos.map((combo, i) => (
                                                        <span key={i} className="inline-flex bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md text-[10px] font-bold">
                                                            কম্বো {combo.replace('combo-', '')}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="text-sm text-slate-600">
                                                    {format(parseISO(order.created_at), "MMM do, yyyy")}
                                                </div>
                                                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                                                    {format(parseISO(order.created_at), "HH:mm a")}
                                                </div>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="font-bold text-slate-900">৳ {formatNumber(order.total_price)}</div>
                                            </td>
                                            <td className="p-4 pr-6">
                                                <div className="flex justify-center">
                                                    <div className="relative inline-block text-left w-32">
                                                        <select
                                                            value={order.status}
                                                            onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                                                            className={`appearance-none w-full outline-none px-3 py-1.5 rounded-full text-[11px] font-bold border cursor-pointer transition-shadow focus:ring-2 focus:ring-offset-1 focus:ring-slate-200
                                                                ${order.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-200/60' :
                                                                    order.status === 'processing' ? 'bg-indigo-50 text-indigo-600 border-indigo-200/60' :
                                                                        order.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-200/60' :
                                                                            'bg-red-50 text-red-600 border-red-200/60'
                                                                }
                                                            `}
                                                        >
                                                            <option value="pending">পেন্ডিং</option>
                                                            <option value="processing">প্রসেসিং</option>
                                                            <option value="completed">সম্পন্ন</option>
                                                            <option value="cancelled">বাতিল</option>
                                                        </select>
                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                            <ChevronDown className={`w-3 h-3
                                                                ${order.status === 'pending' ? 'text-amber-500' :
                                                                    order.status === 'processing' ? 'text-indigo-500' :
                                                                        order.status === 'completed' ? 'text-emerald-500' :
                                                                            'text-red-500'
                                                                }
                                                            `} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </div >
    );
}
