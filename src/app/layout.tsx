import type { Metadata } from 'next';
import { Hind_Siliguri } from 'next/font/google';
import './globals.css';

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-hind-siliguri',
});

import Script from 'next/script';

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
      <head>
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5WGGNCCL');
          `}
        </Script>
      </head>
      <body className={`${hindSiliguri.variable} font-sans antialiased min-h-screen flex flex-col`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5WGGNCCL"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {children}
      </body>
    </html>
  );
}
