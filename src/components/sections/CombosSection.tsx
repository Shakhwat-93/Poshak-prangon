"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, ShoppingCart } from "lucide-react";

const combos = [
    {
        id: "combo-1",
        title: "৩ পিস ৫.৫ হাত চিকন সুতার লুঙ্গি",
        price: "১০৫০",
        oldPrice: "১৪৫০",
        features: [
            "সিরাজগঞ্জের বিখ্যাত তাঁতের তৈরি",
            "৬ মাসের কালার গ্যারান্টি",
            "সাথে ১ পিস গামছা একদম ফ্রি!",
            "সারা দেশে ফ্রি হোম ডেলিভারি",
        ],
        image: "/WhatsApp Image 2026-02-28 at 3.26.22 PM.jpeg",
        recommended: false,
    },
    {
        id: "combo-2",
        title: "৪ পিস ৫.৫ হাত চিকন সুতার লুঙ্গি",
        price: "১৩৫০",
        oldPrice: "১৭৫০",
        features: [
            "সিরাজগঞ্জের বিখ্যাত তাঁতের তৈরি",
            "৬ মাসের কালার গ্যারান্টি",
            "সাথে ১ পিস গামছা একদম ফ্রি!",
            "সারা দেশে ফ্রি হোম ডেলিভারি",
        ],
        image: "/WhatsApp Image 2026-02-28 at 3.30.31 PM.jpeg",
        recommended: true, // Most popular usually
    },
    {
        id: "combo-3",
        title: "৪ পিস (এক্সট্রা প্রিমিয়াম) ৬ হাত চিকন সুতার লুঙ্গি",
        price: "১৪৫০",
        oldPrice: "১৮৫০",
        features: [
            "সিরাজগঞ্জের বিখ্যাত তাঁতের তৈরি",
            "৬ মাসের কালার গ্যারান্টি",
            "পড়তে আরামদায়ক ও টেকসই",
            "৬ হাত সাইজের লুঙ্গি",
            "সাথে ১ পিস গামছা একদম ফ্রি!",
            "সারা দেশে ফ্রি হোম ডেলিভারি",
        ],
        image: "/WhatsApp Image 2026-02-28 at 3.31.15 PM.jpeg",
        recommended: false,
    },
];

export default function CombosSection() {
    return (
        <section id="combos" className="py-24 bg-white relative overflow-hidden">
            {/* Decorative Blur */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#baf598]/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="w-full px-4 md:px-8 lg:px-16 mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-4">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#052e16] tracking-tight">
                        আপনার পছন্দের <span className="text-[#16a34a] drop-shadow-sm">কম্বো প্যাকেজ</span> বেছে নিন
                    </h2>
                    <p className="text-base md:text-lg text-slate-600 font-medium px-2">
                        কারখানা থেকে সরাসরি আপনার হাতে। কোনো থার্ড পার্টি নেই, তাই দাম একদম কম।
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {combos.map((combo, index) => (
                        <motion.div
                            key={combo.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className={`relative flex flex-col p-1 rounded-2xl ${combo.recommended
                                ? "bg-gradient-to-b from-[#baf598] to-[#98e673]/30 shadow-[0_0_30px_rgba(186,245,152,0.3)] md:-translate-y-4"
                                : "bg-surface-hover border border-slate-200"
                                }`}
                        >
                            <div className="h-full bg-background rounded-xl p-5 md:p-6 flex flex-col">
                                {combo.recommended && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#baf598] text-[#0A1610] px-4 py-1 rounded-full text-sm font-bold tracking-wide shadow-lg">
                                        সবার পছন্দ
                                    </div>
                                )}

                                {/* Product Image Box */}
                                <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-6 group border border-slate-100">
                                    <Image
                                        src={combo.image}
                                        alt={combo.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                                        <span className="bg-accent text-white text-xs font-bold px-2 py-1 rounded">
                                            HOT
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 flex flex-col">
                                    <h3 className="text-lg md:text-xl font-bold text-text-primary mb-2 min-h-[56px] leading-snug">
                                        {combo.title}
                                    </h3>
                                    <div className="flex items-end gap-3 mb-5 md:mb-6">
                                        <span className="text-3xl md:text-4xl font-black text-[#14532d]">
                                            ৳{combo.price}
                                        </span>
                                        <span className="text-base md:text-lg text-slate-400 line-through mb-1">
                                            ৳{combo.oldPrice}
                                        </span>
                                    </div>

                                    <ul className="space-y-3 mb-6 md:mb-8 flex-1">
                                        {combo.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-[#baf598] shrink-0 mt-0.5" />
                                                <span className="text-slate-700 font-medium text-sm md:text-base">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
