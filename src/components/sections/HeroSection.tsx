"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
    return (
        <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#0A1610]">
            {/* Full Width Dual Image Background */}
            <div className="absolute inset-0 w-full h-full z-0 flex flex-col md:flex-row bg-[#0A1610]">
                {/* Left Image */}
                <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
                    <Image
                        src="/lungi-showcase-left.png"
                        alt="Premium Bengali Lungi Showcase Left"
                        fill
                        priority
                        quality={100}
                        unoptimized
                        className="object-cover object-right md:object-center opacity-90"
                    />
                </div>
                {/* Right Image */}
                <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
                    <Image
                        src="/lungi-showcase-right.png"
                        alt="Premium Bengali Lungi Showcase Right"
                        fill
                        priority
                        quality={100}
                        unoptimized
                        className="object-cover object-left md:object-center opacity-90"
                    />
                </div>

                {/* Subtle gradient overlays to blend nicely with the Navbar and bottom sections */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0A1610]/80 via-transparent to-[#0A1610]/95 mix-blend-multiply z-10 pointer-events-none"></div>
                {/* Center gradient to blend the seam between the two images smoothly (horizontal for desktop, vertical for mobile) */}
                <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-[#0A1610]/60 to-transparent z-10 pointer-events-none"></div>
                <div className="md:hidden absolute inset-0 bg-gradient-to-b from-transparent via-[#0A1610]/80 to-transparent z-10 pointer-events-none"></div>
            </div>

            {/* Main Marketing Content */}
            <div className="w-full h-full relative z-20 pointer-events-none">
                <div className="flex flex-col min-h-screen">
                    <div className="flex-1 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-12 lg:px-20 mt-32 md:mt-40">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="space-y-8 max-w-5xl mx-auto relative overflow-visible px-4"
                        >
                            {/* Decorative Top Accent */}
                            <div className="flex items-center justify-center gap-4 mb-6 relative z-10">
                                <div className="h-[2px] w-12 bg-[#baf598] shadow-[0_0_8px_rgba(186,245,152,0.8)]"></div>
                                <span className="text-[#baf598] text-sm md:text-base font-bold tracking-[0.3em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">প্রিমিয়াম কালেকশন</span>
                                <div className="h-[2px] w-12 bg-[#baf598] shadow-[0_0_8px_rgba(186,245,152,0.8)]"></div>
                            </div>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[84px] font-black text-white leading-[1.2] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] relative z-10 tracking-normal w-full">
                                ঐতিহ্যের সাথে <br className="hidden md:block" />
                                <span className="text-[#baf598] drop-shadow-[0_4px_12px_rgba(0,0,0,1)] inline-block mt-2">আভিজাত্যের</span> মেলবন্ধন
                            </h1>

                            <p className="text-lg sm:text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed font-semibold drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] mt-6 md:mt-8 relative z-10">
                                সিরাজগঞ্জের নিজস্ব কারখানায় বোনা ১০০% সুতির অত্যন্ত আরামদায়ক ও এক্সক্লুসিভ ডিজাইনের লুঙ্গি। আপনার দৈনন্দিন স্বাচ্ছন্দ্যের জন্য সেরা পছন্দ।
                            </p>

                            <div className="pt-8 pb-16 flex justify-center pointer-events-auto relative z-10">
                                <a
                                    href="#combos"
                                    className="group relative px-8 py-4 md:px-10 md:py-5 rounded-full bg-[#baf598] text-[#0A1610] font-bold text-base md:text-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_4px_20px_rgba(186,245,152,0.6)] overflow-hidden"
                                >
                                    <span className="relative z-10 block transition-transform duration-300 group-hover:-translate-y-0.5">কালেকশন দেখুন</span>
                                    {/* Hover Sweep Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-12 z-0"></div>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
