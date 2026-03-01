"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

// Add the same combos data for the checkout visual representation
const combos = [
    {
        id: "combo-1",
        title: "৩ পিস ৫.৫ হাত চিকন সুতার লুঙ্গি",
        shortTitle: "৩ পিস ৫.৫ হাত লুঙ্গি + ১ ফ্রি গামছা",
        price: "১০৫০",
        image: "/WhatsApp Image 2026-02-28 at 3.26.22 PM.jpeg",
    },
    {
        id: "combo-2",
        title: "৪ পিস ৫.৫ হাত চিকন সুতার লুঙ্গি",
        shortTitle: "৪ পিস ৫.৫ হাত লুঙ্গি + ১ ফ্রি গামছা",
        price: "১৩৫০",
        image: "/WhatsApp Image 2026-02-28 at 3.30.31 PM.jpeg",
        recommended: true,
    },
    {
        id: "combo-3",
        title: "৪ পিস (এক্সট্রা প্রিমিয়াম) চিকন সুতার",
        shortTitle: "৪ পিস (এক্সট্রা প্রিমিয়াম) + ১ ফ্রি গামছা",
        price: "১৪৫০",
        image: "/WhatsApp Image 2026-02-28 at 3.31.15 PM.jpeg",
    },
];

export default function CheckoutForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    // Pre-select the recommended combo (combo-2) by default
    const [selectedComboId, setSelectedComboId] = useState("combo-2");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const orderData = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            combo: selectedComboId, // Send selected state instead of form input
        };

        try {
            const response = await fetch('/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                setSuccess(true);
            } else {
                alert("দুঃখিত, কোনো একটি সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।");
            }
        } catch (error) {
            console.error(error);
            alert("নেটওয়ার্কে সমস্যা। দয়া করে আবার চেষ্টা করুন।");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <section id="checkout" className="py-24 bg-background">
                <div className="w-full px-4 md:px-8 lg:px-16 mx-auto max-w-2xl text-center">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="p-12 border rounded-3xl bg-green-50/50 border-green-500/20"
                    >
                        <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-4xl text-green-600">🎉</span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            আপনার অর্ডারটি সফল হয়েছে!
                        </h2>
                        <p className="text-gray-600 text-lg">
                            আমাদের একজন প্রতিনিধি খুব শীঘ্রই আপনাকে কল করে অর্ডার কনফার্ম করবেন।
                            <br />ধন্যবাদ পোশাক প্রাঙ্গণের সাথে থাকার জন্য।
                        </p>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section id="checkout" className="py-24 bg-surface relative">
            <div className="w-full px-4 md:px-8 lg:px-16 mx-auto max-w-6xl">
                <div className="text-center mb-10 md:mb-12">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#052e16] tracking-tight mb-3 md:mb-4">
                        অর্ডার করতে নিচের <span className="text-[#16a34a] drop-shadow-sm">ফর্মটি</span> পূরণ করুন
                    </h2>
                    <p className="text-base md:text-lg text-slate-600 font-medium px-4">
                        কোনো অগ্রিম পেমেন্ট লাগবে না। প্রোডাক্ট হাতে পেয়ে টাকা পরিশোধ করবেন।
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start">
                    {/* Left Side: Order Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-5 md:p-8 rounded-[2rem] shadow-xl shadow-[#baf598]/10 border border-slate-100 order-2 lg:order-1"
                    >
                        <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-5 md:mb-6 border-b pb-4">ডেলিভারি ঠিকানা দিন</h3>
                        <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                            <div className="space-y-1.5 md:space-y-2">
                                <label htmlFor="name" className="text-sm font-bold text-slate-700">
                                    আপনার নাম (Name)
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 md:py-3.5 text-base text-slate-800 focus:outline-none focus:border-[#baf598] focus:ring-1 focus:ring-[#baf598] transition-colors"
                                    placeholder="যেমন: মোঃ সাকিব হোসেন"
                                />
                            </div>

                            <div className="space-y-1.5 md:space-y-2">
                                <label htmlFor="phone" className="text-sm font-bold text-slate-700">
                                    মোবাইল নাম্বার (Mobile Number)
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 md:py-3.5 text-base text-slate-800 focus:outline-none focus:border-[#baf598] focus:ring-1 focus:ring-[#baf598] transition-colors"
                                    placeholder="যেমন: 01700000000"
                                />
                            </div>

                            <div className="space-y-1.5 md:space-y-2">
                                <label htmlFor="address" className="text-sm font-bold text-slate-700">
                                    সম্পূর্ণ ঠিকানা (Full Address)
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    required
                                    rows={3}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 md:py-3.5 text-base text-slate-800 focus:outline-none focus:border-[#baf598] focus:ring-1 focus:ring-[#baf598] transition-colors resize-none"
                                    placeholder="গ্রাম/মহল্লা, ডাকঘর, থানা, জেলা"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-4 md:py-5 rounded-xl text-base md:text-lg font-bold transition-all mt-6 md:mt-4 ${isSubmitting
                                    ? "bg-[#baf598]/50 text-slate-800 cursor-not-allowed"
                                    : "bg-[#baf598] hover:bg-[#98e673] text-[#0A1610] shadow-[0_4px_15px_rgba(186,245,152,0.4)] hover:shadow-[0_4px_25px_rgba(186,245,152,0.6)]"
                                    }`}
                            >
                                {isSubmitting ? "অর্ডার প্রসেস হচ্ছে..." : "অর্ডার কনফার্ম করুন"}
                            </button>
                        </form>
                    </motion.div>

                    {/* Right Side: Combo Selection Guide */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#f4fbf0] p-5 md:p-8 rounded-[2rem] shadow-lg border border-[#baf598]/40 order-1 lg:order-2"
                    >
                        <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-5 md:mb-6 border-b border-[#baf598]/30 pb-4">
                            কোন প্যাকেজটি নিতে চান?
                        </h3>
                        <div className="flex flex-col gap-4">
                            {combos.map((combo) => {
                                const isSelected = selectedComboId === combo.id;
                                return (
                                    <div
                                        key={combo.id}
                                        onClick={() => setSelectedComboId(combo.id)}
                                        className={`relative flex items-center p-3 sm:p-4 rounded-2xl cursor-pointer transition-all border-2 ${isSelected
                                            ? "bg-white border-[#baf598] shadow-md shadow-[#baf598]/20"
                                            : "bg-white/50 border-transparent hover:border-[#baf598]/40 hover:bg-white"
                                            }`}
                                    >
                                        <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                                            <Image
                                                src={combo.image}
                                                alt={combo.shortTitle}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="ml-3 sm:ml-4 flex-1">
                                            {combo.recommended && (
                                                <span className="text-[10px] font-bold bg-[#baf598] text-[#0A1610] px-2 py-0.5 rounded-sm mb-1 inline-block uppercase tracking-wider">
                                                    Best Value
                                                </span>
                                            )}
                                            <h4 className={`font-bold text-sm sm:text-base leading-tight mb-0.5 sm:mb-1 ${isSelected ? "text-slate-900" : "text-slate-700"}`}>
                                                {combo.shortTitle}
                                            </h4>
                                            <p className={`font-black tracking-tight ${isSelected ? "text-[#14532d]" : "text-slate-500"} ${isSelected ? "text-lg sm:text-xl" : "text-base sm:text-lg"}`}>
                                                ৳ {combo.price}
                                            </p>
                                        </div>
                                        <div className="ml-2 shrink-0">
                                            {isSelected ? (
                                                <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-[#16a34a]" />
                                            ) : (
                                                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-slate-300" />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-8 pt-6 border-t border-[#baf598]/30 text-center">
                            <p className="text-slate-600 font-medium text-sm">
                                বামপাশের ফর্ম পূরণ করে অর্ডার কনফার্ম করুন
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
