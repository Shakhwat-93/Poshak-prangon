"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";

export default function Navbar() {
    const [activeLink, setActiveLink] = useState("#");

    const navLinks = [
        { name: "হোম", href: "#" },
        { name: "আমাদের সম্পর্কে", href: "#trust" },
        { name: "অফারসমূহ", href: "#combos" },
    ];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute top-6 left-0 right-0 z-50 px-4 md:px-12 flex items-center justify-between pointer-events-none"
        >
            {/* Mobile Left Logo / Desktop Nav Links */}
            <div className="pointer-events-auto flex items-center">
                <div className="hidden lg:flex items-center bg-white/5 border border-white/10 backdrop-blur-md rounded-full p-1.5 shadow-2xl">
                    {navLinks.map((link) => {
                        const isActive = activeLink === link.href;
                        return (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setActiveLink(link.href)}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${isActive
                                    ? "bg-white text-[#1E362D] shadow-md"
                                    : "text-white/80 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {link.name}
                            </a>
                        );
                    })}
                </div>

                {/* Mobile Left Logo */}
                <a href="#" onClick={() => setActiveLink("#")} className="lg:hidden relative w-40 h-14 block drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                    <Image src="/logo.png" alt="Poshak Prangon Logo" fill className="object-contain object-left scale-[1.3] origin-left" priority />
                </a>
            </div>

            {/* Center Logo (Desktop) */}
            <a
                href="#"
                onClick={() => setActiveLink("#")}
                className="hidden lg:flex pointer-events-auto items-center justify-center absolute left-1/2 -translate-x-1/2 overflow-visible z-10 group mt-1 md:mt-2"
            >
                {/* Glow backdrop to separate logo from the background seam */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.4)_0%,transparent_60%)] -m-2 md:-m-4 rounded-full mix-blend-multiply opacity-60 pointer-events-none transition-opacity group-hover:opacity-100"></div>

                <div className="relative w-36 h-12 sm:w-44 sm:h-14 md:w-72 md:h-24 overflow-visible drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:scale-105">
                    <Image
                        src="/logo.png"
                        alt="Poshak Prangon Logo"
                        fill
                        className="object-contain object-center scale-[1.2] md:scale-[1.5]"
                        priority
                    />
                </div>
            </a>

            {/* Right Action Pills */}
            <div className="pointer-events-auto flex items-center gap-3">
                <a
                    href="#checkout"
                    className="hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 bg-[#baf598] text-[#1E362D] hover:scale-105 shadow-[0_0_20px_rgba(186,245,152,0.3)]"
                >
                    <ShoppingBag className="w-4 h-4" />
                    অর্ডার করুন
                </a>

                {/* Mobile Order Icon */}
                <a
                    href="#checkout"
                    className="lg:hidden flex items-center justify-center w-11 h-11 rounded-full bg-[#baf598] text-[#1E362D]"
                >
                    <ShoppingBag className="w-5 h-5" />
                </a>
            </div>

        </motion.header>
    );
}
