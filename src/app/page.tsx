import Navbar from "@/components/ui/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import TrustSection from "@/components/sections/TrustSection";
import CombosSection from "@/components/sections/CombosSection";
import CheckoutForm from "@/components/sections/CheckoutForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full relative">
      <Navbar />
      <HeroSection />
      <TrustSection />
      <CombosSection />
      <CheckoutForm />

      <footer className="w-full py-8 text-slate-400 bg-[#0A1610] border-t border-[#baf598]/10 relative overflow-hidden">
        {/* Decorative Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#baf598]/30 to-transparent"></div>

        <div className="container px-4 md:px-8 mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          {/* Left section: Logo & Name */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div className="relative w-24 h-24 rounded-full border border-[#baf598]/30 bg-white/5 p-2 backdrop-blur-sm shadow-[0_0_20px_rgba(186,245,152,0.15)] transition-transform hover:scale-105">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Poshak Prangon Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="space-y-1 mt-2 md:mt-0">
              <h3 className="font-bold text-2xl text-white tracking-wide">Poshak Prangon</h3>
              <p className="text-[#baf598] font-medium text-sm">ঐতিহ্যের সাথে আভিজাত্যের স্পন্দন</p>
            </div>
          </div>

          {/* Right section: Contact Info */}
          <div className="space-y-2 text-sm text-slate-300 text-center md:text-right">
            <p className="flex items-center justify-center md:justify-end gap-2">
              <span className="text-[#baf598]">📍</span> ঠিকানা: সিরাজগঞ্জ, রাজশাহী ডিভিশন, বাংলাদেশ।
            </p>
            <p className="flex items-center justify-center md:justify-end gap-2">
              <span className="text-[#baf598]">📞</span> হটলাইন: <a href="tel:01318208690" className="hover:text-white transition-colors">01318-208690</a>
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="relative z-10 mt-6 pt-4 border-t border-white/5 mx-auto max-w-5xl text-center">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Poshak Prangon. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
