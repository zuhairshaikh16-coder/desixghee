import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AIPanjiriVideoShowcase } from './components/AIPanjiriVideoShowcase';
import { PanjiriMenu } from './components/PanjiriMenu';
import { DesiGheeSection } from './components/DesiGheeSection';
import { AyurvedicBenefits } from './components/AyurvedicBenefits';
import { CustomPanjiriBuilder } from './components/CustomPanjiriBuilder';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { OrderModal } from './components/OrderModal';
import { AIPanjiriAdvisor } from './components/AIPanjiriAdvisor';
import { DownloadModal } from './components/DownloadModal';
import { CartItem } from './types';
import { Check, ShoppingBag } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('desi_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [directOrderItem, setDirectOrderItem] = useState<CartItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('desi_cart_items', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Add Item to Cart
  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (it) =>
          it.productId === item.productId &&
          it.weightOrVolume === item.weightOrVolume &&
          it.sweetener === item.sweetener
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += item.quantity;
        return next;
      }
      return [...prev, item];
    });

    showToast(`Added ${item.name} (${item.weightOrVolume}) to your order!`);
  };

  // Update Item Quantity
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((it) => {
          if (it.id === id) {
            const newQty = it.quantity + delta;
            return newQty > 0 ? { ...it, quantity: newQty } : null;
          }
          return it;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  // Remove Item
  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((it) => it.id !== id));
  };

  // Clear Cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Quick WhatsApp Order for a single item
  const handleQuickOrder = (item: CartItem) => {
    setDirectOrderItem(item);
    setIsOrderModalOpen(true);
  };

  // Smooth Scroll
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0c08] text-[#f7efe4] flex flex-col font-sans selection:bg-[#d97706] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1e1309] border border-amber-500/50 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom duration-300">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="font-medium text-amber-200">{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onOpenDownload={() => setIsDownloadModalOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero
          onExploreMenu={() => handleScrollToSection('menu')}
          onWatchVideo={() => handleScrollToSection('ai-video')}
          onOpenAdvisor={() => setIsAdvisorOpen(true)}
          onOpenDownload={() => setIsDownloadModalOpen(true)}
        />

        {/* User's Specific Request: AI Panjiri Video Showcase & Studio */}
        <AIPanjiriVideoShowcase />

        {/* The 6 Authentic Panjiri Varieties from Poster */}
        <PanjiriMenu
          onAddToCart={handleAddToCart}
          onQuickOrder={handleQuickOrder}
        />

        {/* 100% Pure A2 Gir Cow Bilona Ghee Section */}
        <DesiGheeSection
          onAddToCart={handleAddToCart}
          onQuickOrder={handleQuickOrder}
        />

        {/* The 4 Core Ayurvedic Benefit Pillars from Poster */}
        <AyurvedicBenefits />

        {/* Custom Panjiri Lab */}
        <CustomPanjiriBuilder
          onAddToCart={handleAddToCart}
          onQuickOrder={handleQuickOrder}
        />
      </main>

      {/* Footer */}
      <Footer onOpenDownload={() => setIsDownloadModalOpen(true)} />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToOrder={() => {
          setIsCartOpen(false);
          setDirectOrderItem(null);
          setIsOrderModalOpen(true);
        }}
      />

      {/* Direct Order Modal (WhatsApp formatting) */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => {
          setIsOrderModalOpen(false);
          setDirectOrderItem(null);
        }}
        items={cart}
        singleItemDirect={directOrderItem}
        onClearCart={handleClearCart}
      />

      {/* AI Ayurvedic Advisor Modal */}
      <AIPanjiriAdvisor
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Download Website Package Modal */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
    </div>
  );
}
