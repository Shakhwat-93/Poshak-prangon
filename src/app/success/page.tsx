"use client";

import { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/utils/supabase";

function SuccessContent() {
    const searchParams = useSearchParams();
    const total = searchParams.get("total") || "0";
    const orderId = searchParams.get("order_id") || "";
    const itemsParam = searchParams.get("items");

    const customerName = searchParams.get("customer_name") || "";
    const customerPhone = searchParams.get("customer_phone") || "";
    const customerAddress = searchParams.get("customer_address") || "";

    // Track whether the order has been approved (status changed to processing)
    const [isApproved, setIsApproved] = useState(false);
    const [purchaseFired, setPurchaseFired] = useState(false);

    useEffect(() => {
        if (!orderId) return;

        // Check if purchase was already fired for this order
        const alreadyFired = sessionStorage.getItem(`purchase_fired_${orderId}`);
        if (alreadyFired) {
            setPurchaseFired(true);
            setIsApproved(true);
            return;
        }

        // Subscribe to Supabase Realtime changes on this specific order
        const channel = supabase
            .channel(`order-status-${orderId}`)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'orders',
                    filter: `id=eq.${orderId}`,
                },
                (payload) => {
                    const newStatus = payload.new?.status;

                    // Fire purchase event ONLY when status changes to "processing"
                    if (newStatus === 'processing') {
                        setIsApproved(true);
                        firePurchaseEvent();
                    }
                }
            )
            .subscribe();

        // Also check current status on mount (in case admin already approved)
        const checkCurrentStatus = async () => {
            const { data } = await supabase
                .from('orders')
                .select('status')
                .eq('id', orderId)
                .single();

            if (data?.status === 'processing' || data?.status === 'completed') {
                setIsApproved(true);
                if (!alreadyFired) {
                    firePurchaseEvent();
                }
            }
        };
        checkCurrentStatus();

        // Cleanup subscription on unmount
        return () => {
            supabase.removeChannel(channel);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderId]);

    /** Fire the Google Analytics purchase event via dataLayer */
    const firePurchaseEvent = () => {
        if (typeof window === "undefined") return;

        // Prevent duplicate fires
        const alreadyFired = sessionStorage.getItem(`purchase_fired_${orderId}`);
        if (alreadyFired) return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dataLayer = (window as any).dataLayer || [];
        dataLayer.push({
            event: "purchase",
            ecommerce: {
                transaction_id: orderId,
                value: parseInt(total),
                currency: "BDT",
                customer_name: customerName,
                customer_phone: customerPhone,
                customer_address: customerAddress,
                items: items,
            }
        });

        sessionStorage.setItem(`purchase_fired_${orderId}`, "true");
        setPurchaseFired(true);
        console.log(`✅ Purchase event fired for order: ${orderId}`);
    };

    const englishToBengali = (num: number | string) => {
        const digits: { [key: string]: string } = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯' };
        return num.toString().replace(/[0-9]/g, (match) => digits[match]);
    };

    return (
        <section className="min-h-screen py-24 bg-surface flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#baf598]/20 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#baf598]/20 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

            <div className="w-full px-4 md:px-8 lg:px-16 mx-auto max-w-2xl text-center relative z-10">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="p-8 md:p-12 border rounded-3xl bg-white shadow-2xl shadow-[#baf598]/10 border-slate-100"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
                        className="w-24 h-24 mx-auto mb-8 bg-[#f4fbf0] rounded-full flex items-center justify-center border-4 border-[#baf598]/30"
                    >
                        <CheckCircle2 className="w-12 h-12 text-[#16a34a]" />
                    </motion.div>

                    <h1 className="text-3xl md:text-4xl font-extrabold text-[#052e16] mb-6">
                        আপনার অর্ডারটি সফল হয়েছে!
                    </h1>

                    <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                        আমাদের একজন প্রতিনিধি খুব শীঘ্রই আপনাকে কল করে অর্ডার কনফার্ম করবেন।
                        <br />ধন্যবাদ <span className="font-bold text-[#14532d]">পোশাক প্রাঙ্গণ</span>-এর সাথে থাকার জন্য।
                    </p>

                    {parseInt(total) > 0 && (
                        <div className="bg-slate-50 p-4 rounded-xl inline-block mb-6 border border-slate-100">
                            <span className="text-sm font-semibold text-slate-500 block mb-1">সর্বমোট বিল</span>
                            <span className="text-2xl font-black text-[#14532d]">৳ {englishToBengali(total)}</span>
                        </div>
                    )}

                    {/* Order status tracking logic remains in background, but UI is hidden as per user request */}

                    <div>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1e362d] text-white font-bold text-base hover:bg-[#0a1610] transition-colors duration-300"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            আরো কিনুন
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">লোড হচ্ছে...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
