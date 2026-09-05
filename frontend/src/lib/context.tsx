'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, EnquiryItem } from './types';

interface ShopContextType {
  enquiryItems: EnquiryItem[];
  addToEnquiryCart: (product: Product, quantity?: number, notes?: string) => void;
  removeFromEnquiryCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearEnquiryCart: () => void;
  isEnquiryDrawerOpen: boolean;
  setIsEnquiryDrawerOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isWholesaleModalOpen: boolean;
  setIsWholesaleModalOpen: (open: boolean) => void;
  generateWhatsAppLink: (product?: Product) => string;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [enquiryItems, setEnquiryItems] = useState<EnquiryItem[]>([]);
  const [isEnquiryDrawerOpen, setIsEnquiryDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isWholesaleModalOpen, setIsWholesaleModalOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('saboori_enquiry_cart');
      if (saved) {
        setEnquiryItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to parse enquiry cart from localStorage', e);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('saboori_enquiry_cart', JSON.stringify(enquiryItems));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [enquiryItems]);

  const addToEnquiryCart = (product: Product, quantity?: number, notes?: string) => {
    const qty = quantity || product.moq || 1;
    setEnquiryItems(prev => {
      const exists = prev.find(item => item.product.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty, notes }];
    });
    setIsEnquiryDrawerOpen(true);
  };

  const removeFromEnquiryCart = (productId: number) => {
    setEnquiryItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromEnquiryCart(productId);
      return;
    }
    setEnquiryItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearEnquiryCart = () => {
    setEnquiryItems([]);
  };

  const generateWhatsAppLink = (product?: Product): string => {
    const phone = '918780331600'; // Saboori Fashion WhatsApp
    if (product) {
      const text = `Namaste Saboori Fashion! 🙏\nI am interested in your product:\n📌 *${product.name}*\n🏷 SKU: ${product.sku}\n📦 MOQ: ${product.moq} pcs\n🧵 Fabric: ${product.fabric || 'Ethnic Wear'}\n\nPlease share wholesale catalog & bulk factory rates.`;
      return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    }

    if (enquiryItems.length > 0) {
      const list = enquiryItems
        .map((item, idx) => `${idx + 1}. ${item.product.name} (SKU: ${item.product.sku}) - Qty: ${item.quantity} pcs`)
        .join('\n');
      const text = `Namaste Saboori Fashion Surat! 🙏\nI would like to inquire about the following items for wholesale bulk order:\n\n${list}\n\nPlease send wholesale quotation & dispatch timeline.`;
      return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    }

    return `https://wa.me/${phone}?text=${encodeURIComponent('Namaste Saboori Fashion Surat! I am interested in your wholesale ethnic wear catalog.')}`;
  };

  return (
    <ShopContext.Provider
      value={{
        enquiryItems,
        addToEnquiryCart,
        removeFromEnquiryCart,
        updateQuantity,
        clearEnquiryCart,
        isEnquiryDrawerOpen,
        setIsEnquiryDrawerOpen,
        quickViewProduct,
        setQuickViewProduct,
        isWholesaleModalOpen,
        setIsWholesaleModalOpen,
        generateWhatsAppLink,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
