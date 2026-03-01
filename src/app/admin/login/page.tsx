"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/admin/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                router.push("/admin/dashboard");
            } else {
                setError("ভুল পাসওয়ার্ড! আবার চেষ্টা করুন।");
                setPassword("");
            }
        } catch (err) {
            setError("নেটওয়ার্কে সমস্যা!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#fcfcfc]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm space-y-8"
            >
                <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <Lock className="w-7 h-7 text-slate-700" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Admin Portal</h1>
                    <p className="text-sm text-slate-500 font-medium">Please enter your password to continue</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6 mt-8">
                    <div className="space-y-2 relative">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all shadow-sm"
                            placeholder="••••••••"
                            required
                        />
                        {error && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm font-medium mt-2 text-center absolute -bottom-6 left-0 right-0">
                                {error}
                            </motion.p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl px-5 py-4 font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-slate-900/20 active:scale-[0.98]"
                    >
                        {isLoading ? "Checking..." : "Login to Dashboard"}
                        {!isLoading && <ArrowRight className="w-4 h-4 ml-1" />}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
