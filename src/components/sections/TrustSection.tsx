"use client";

import { ShieldCheck, Truck, RefreshCcw, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
    {
        icon: <ShieldCheck className="w-10 h-10 md:w-12 md:h-12 text-[#0A1610]" strokeWidth={1.5} />,
        title: "৬ মাসের গ্যারান্টি",
        description: "৬ মাসের মধ্যে রং নষ্ট হলে ১০০% টাকা ফেরত গ্যারান্টি।",
    },
    {
        icon: <Truck className="w-10 h-10 md:w-12 md:h-12 text-[#0A1610]" strokeWidth={1.5} />,
        title: "সারা দেশে ফ্রি হোম ডেলিভারি",
        description: "বাড়িতে বসেই প্রোডাক্ট রিসিভ করুন সম্পূর্ণ ফ্রি ডেলিভারিতে।",
    },
    {
        icon: <RefreshCcw className="w-10 h-10 md:w-12 md:h-12 text-[#0A1610]" strokeWidth={1.5} />,
        title: "চেক করে নেওয়ার সুযোগ",
        description: "হাতে পাওয়ার পর ডেলিভারি ম্যানের সামনে চেক করে নিন।",
    },
    {
        icon: <ThumbsUp className="w-10 h-10 md:w-12 md:h-12 text-[#0A1610]" strokeWidth={1.5} />,
        title: "সরাসরি কারখানা থেকে",
        description: "কোনো থার্ড পার্টি নেই, তাই দাম একদম সাশ্রয়ী।",
    },
];

export default function TrustSection() {
    return (
        <section className="py-20 bg-background border-y border-slate-200 relative">
            <div className="absolute inset-0 bg-[#baf598]/5 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
            <div className="w-full relative z-10 px-4 md:px-8 lg:px-16 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group flex flex-col items-center text-center p-6 md:p-8 space-y-4 md:space-y-6 rounded-[2rem] bg-slate-50 border border-slate-200 hover:bg-white hover:-translate-y-2 hover:border-[#baf598]/40 hover:shadow-2xl hover:shadow-[#baf598]/20 transition-all duration-500 overflow-hidden relative"
                        >
                            {/* Decorative Background Glow */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#baf598]/20 rounded-full blur-3xl group-hover:bg-[#baf598]/40 transition-all duration-500"></div>

                            <div className="relative p-4 md:p-5 rounded-3xl bg-[#baf598] shadow-md group-hover:shadow-[0_15px_30px_rgba(186,245,152,0.4)] transition-all duration-500 group-hover:-translate-y-1">
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">
                                {benefit.title}
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {benefit.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
