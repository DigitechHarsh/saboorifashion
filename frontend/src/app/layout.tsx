import type { Metadata } from 'next';
import './globals.css';
import { ShopProvider } from '@/lib/context';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EnquiryDrawer from '@/components/EnquiryDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import WholesaleModal from '@/components/WholesaleModal';
import FloatingActions from '@/components/FloatingActions';

export const metadata: Metadata = {
  title: "Saboori Fashion Surat | Women's Ethnic Wear Manufacturer & Wholesaler",
  description: "Surat's leading manufacturer of Silk Sarees, Designer Bridal Lehengas, Bandhani Sarees, Cotton Kurtis, and Dress Materials at factory-direct wholesale rates. Adarsh Market-2, Surat.",
  keywords: "Saree Manufacturer Surat, Surat Wholesale Sarees, Lehenga Manufacturer Surat, Kurti Wholesale Adarsh Market, Ethnic Wear Factory Rates, Saboori Fashion",
  openGraph: {
    title: "Saboori Fashion | Surat Ethnic Wear Manufacturer & Wholesaler",
    description: "Direct Factory Wholesale Rates for Boutiques, Wholesalers & Resellers across India & Worldwide.",
    url: "https://saboorifashion.com",
    siteName: "Saboori Fashion",
    locale: "en_IN",
    type: "website",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col font-sans bg-[#FAF7F2] text-[#1F1E1D] selection:bg-brand-gold/30 selection:text-brand-darkMaroon">
        <ShopProvider>
          <Navbar />
          <main className="flex-1 pb-20 md:pb-0">
            {children}
          </main>
          <Footer />
          <EnquiryDrawer />
          <QuickViewModal />
          <WholesaleModal />
          <FloatingActions />
        </ShopProvider>
      </body>
    </html>
  );
}
