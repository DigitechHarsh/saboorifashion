'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EnquiryDrawer from '@/components/EnquiryDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import WholesaleModal from '@/components/WholesaleModal';
import FloatingActions from '@/components/FloatingActions';

export default function MainLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pb-20 md:pb-0">
        {children}
      </main>
      <Footer />
      <EnquiryDrawer />
      <QuickViewModal />
      <WholesaleModal />
      <FloatingActions />
    </>
  );
}
