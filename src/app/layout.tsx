import type { Metadata } from 'next';
import { Hind_Siliguri } from 'next/font/google';
import './globals.css';

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-hind-siliguri',
});

export const metadata: Metadata = {
  title: 'পোশাক প্রাঙ্গণ | প্রিমিয়াম সিরাজগঞ্জ তাঁতের লুঙ্গি',
  description: 'সিরাজগঞ্জের দক্ষ তাঁতিদের দিয়ে নিজস্ব তত্ত্বাবধানে উন্নত মানের চিকন সুতার লুঙ্গি।',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="scroll-smooth">
      <body className={`${hindSiliguri.variable} font-sans antialiased min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
