import React, { useState } from 'react';
import { ShoppingBag, Video, Sparkles, MessageCircle, Menu, X, Phone, Download } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenAdvisor: () => void;
  onOpenDownload: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  onOpenCart,
  onOpenAdvisor,
  onOpenDownload,
  onScrollToSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavClick = (sectionId: string) => {
    onScrollToSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0f0c08]/90 border-b border-[#3d2a14]/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Emblem */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#f59e0b] via-[#d97706] to-[#78350f] p-[2px] shadow-lg shadow-amber-900/30">
              <div className="w-full h-full rounded-full bg-[#181109] flex items-center justify-center border border-amber-400/30">
                <span className="font-royal text-base font-bold text-amber-300 tracking-wider">DG</span>
              </div>
            </div>
            <div>
              <div className="font-royal text-lg sm:text-xl font-bold tracking-wider text-[#fdf8f0] group-hover:text-amber-300 transition-colors">
                DESI X GHEE 
              </div>
              <div className="text-[11px] tracking-widest uppercase text-amber-400/80 font-medium">
                
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleNavClick('menu')}
              className="text-sm font-medium text-[#e6d8c3] hover:text-amber-400 transition-colors cursor-pointer"
            >
              Panjiri Menu
            </button>
            <button
              onClick={() => handleNavClick('ghee')}
              className="text-sm font-medium text-[#e6d8c3] hover:text-amber-400 transition-colors cursor-pointer"
            >
              Pure Bilona Ghee
            </button>
            <button
              onClick={() => handleNavClick('ai-video')}
              className="text-sm font-medium text-[#e6d8c3] hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Video className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>AI Video Reel</span>
            </button>
            <button
              onClick={() => handleNavClick('customizer')}
              className="text-sm font-medium text-[#e6d8c3] hover:text-amber-400 transition-colors cursor-pointer"
            >
              Custom Panjiri
            </button>
            <button
              onClick={() => handleNavClick('benefits')}
              className="text-sm font-medium text-[#e6d8c3] hover:text-amber-400 transition-colors cursor-pointer"
            >
              Ayurvedic Benefits
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Download Website Package */}
            
              

            {/* AI Advisor Button */}
            <button
              onClick={onOpenAdvisor}
              className="hidden xl:flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg bg-[#271b0e] hover:bg-[#382613] text-amber-200 border border-amber-500/30 transition-all cursor-pointer"
              title="Get personalized Panjiri recommendation based on health goals"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>AI Advisor</span>
            </button>

            {/* Instagram / Direct WhatsApp Quick Link */}
            <a
              href="https://instagram.com/desixghee"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#cfbca4] hover:text-amber-300 transition-colors"
            >
              <span className="text-amber-500 font-semibold">@</span>
              <span>desixghee.insta</span>
            </a>

            {/* Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-medium text-sm shadow-md shadow-amber-950/50 transition-all active:scale-95 cursor-pointer"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Order</span>
              {totalItems > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#181109] text-amber-300 text-xs font-bold flex items-center justify-center border border-amber-400/40">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#e6d8c3] hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#160f09] border-b border-[#3d2a14] px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => handleNavClick('menu')}
            className="block w-full text-left py-2 text-sm font-medium text-[#e6d8c3] hover:text-amber-400"
          >
            Panjiri Menu
          </button>
          <button
            onClick={() => handleNavClick('ghee')}
            className="block w-full text-left py-2 text-sm font-medium text-[#e6d8c3] hover:text-amber-400"
          >
            Pure Bilona Desi Ghee
          </button>
          <button
            onClick={() => handleNavClick('ai-video')}
            className="block w-full text-left py-2 text-sm font-medium text-amber-300 flex items-center gap-2"
          >
            <Video className="w-4 h-4 text-amber-400" />
            AI Video Reel
          </button>
          <button
            onClick={() => handleNavClick('customizer')}
            className="block w-full text-left py-2 text-sm font-medium text-[#e6d8c3] hover:text-amber-400"
          >
            Custom Panjiri Lab
          </button>
          <button
            onClick={() => handleNavClick('benefits')}
            className="block w-full text-left py-2 text-sm font-medium text-[#e6d8c3] hover:text-amber-400"
          >
            Ayurvedic Benefits
          </button>
          <button
            onClick={() => {
              onOpenDownload();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#271b0e] text-amber-300 border border-amber-500/40 text-sm font-semibold"
          >
            <Download className="w-4 h-4 text-amber-400" />
            Download Whole Website (ZIP)
          </button>
          <button
            onClick={() => {
              onOpenAdvisor();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#1a120a] text-[#baa792] border border-[#382613] text-sm font-medium"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            Consult AI Health Advisor
          </button>
          <div className="pt-2 border-t border-[#302113] flex items-center justify-between text-xs text-[#a89582]">
            <span>Instagram: @desixghee.insta</span>
            <span className="text-amber-400">100% Pure Desi Ghee</span>
          </div>
        </div>
      )}
    </header>
  );
};
