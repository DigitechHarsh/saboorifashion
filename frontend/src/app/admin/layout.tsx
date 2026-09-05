'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, ShoppingBag, FolderTree, MessageSquare, 
  Settings, LogOut, ExternalLink, Menu, X, Shield, Plus, Bell
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<any>({ name: 'Saboori Admin', role: 'Superadmin' });

  useEffect(() => {
    // If on login page, don't perform auth redirect
    if (pathname === '/admin/login') {
      setIsAuthenticated(true);
      return;
    }

    try {
      const sessionStr = localStorage.getItem('saboori_admin_session');
      if (sessionStr) {
        const session = JSON.parse(sessionStr);
        if (session && session.user) {
          setAdminUser(session.user);
          setIsAuthenticated(true);
          return;
        }
      }
    } catch (e) {
      console.warn('Session check failed', e);
    }

    setIsAuthenticated(false);
    router.replace('/admin/login');
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('saboori_admin_session');
    router.replace('/admin/login');
  };

  // If on login page, render children directly without dashboard sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Show minimal loader while verifying auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#12121c] flex items-center justify-center text-brand-goldLight">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs tracking-wider uppercase">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products Catalog', href: '/admin/products', icon: ShoppingBag },
    { name: 'Categories', href: '/admin/categories', icon: FolderTree },
    { name: 'Wholesale Enquiries', href: '/admin/enquiries', icon: MessageSquare, badge: 'Live' },
    { name: 'Site Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f17] text-gray-100 flex flex-col md:flex-row">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#171724] border-r border-[#2a2a3c] shrink-0 justify-between">
        <div>
          {/* Logo Brand Header */}
          <div className="p-6 border-b border-[#2a2a3c] flex items-center gap-3">
            <div className="p-1 rounded-xl bg-white/10 border border-white/10">
              <img src="/logo.png" alt="Saboori" className="h-8 w-auto object-contain" />
            </div>
            <div>
              <span className="font-serif font-bold text-sm text-brand-goldLight tracking-wider block">
                SABOORI
              </span>
              <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">
                Admin Panel
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-gold text-brand-darkMaroon shadow-md font-bold'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && !isActive && (
                    <span className="bg-brand-maroon text-brand-goldLight text-[10px] px-1.5 py-0.2 rounded-md font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#2a2a3c] space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-brand-gold" />
              <span>View Live Store</span>
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3.5 py-2 rounded-xl text-xs text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="bg-[#171724]/90 backdrop-blur-md border-b border-[#2a2a3c] px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white rounded-lg hover:bg-white/5"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h2 className="font-serif font-bold text-sm sm:text-base text-brand-goldLight capitalize">
              {pathname === '/admin' ? 'Dashboard Overview' : pathname.replace('/admin/', '').replace('-', ' ')}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/products"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-gold hover:bg-brand-goldLight text-brand-darkMaroon text-xs font-bold rounded-lg shadow transition-transform hover:scale-105"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </Link>

            <div className="flex items-center gap-2 pl-3 border-l border-white/10">
              <div className="w-7 h-7 rounded-full bg-brand-maroon flex items-center justify-center text-brand-gold font-bold text-xs">
                A
              </div>
              <span className="text-xs font-semibold text-gray-200 hidden sm:inline">
                {adminUser.name || 'Admin'}
              </span>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#171724] border-b border-[#2a2a3c] p-4 space-y-1 z-20">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                    isActive ? 'bg-brand-gold text-brand-darkMaroon font-bold' : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="pt-2 border-t border-[#2a2a3c] flex items-center justify-between">
              <Link href="/" target="_blank" className="text-xs text-brand-gold hover:underline">
                View Storefront ↗
              </Link>
              <button onClick={handleLogout} className="text-xs text-red-400 font-bold">
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
