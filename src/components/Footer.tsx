import React from 'react';
import { Heart, Instagram, Phone, Mail, MapPin, ShieldCheck, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenDownload?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDownload }) => {
  return (
    <footer className="bg-[#080604] border-t border-[#291b0f] text-[#baa792] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#78350f] p-[2px]">
                <div className="w-full h-full rounded-full bg-[#181109] flex items-center justify-center border border-amber-400/30">
                  <span className="font-royal text-sm font-bold text-amber-300">DG</span>
                </div>
              </div>
              <div>
                <div className="font-royal text-base font-bold text-white tracking-wider">
                  SHUDDH DESI GHEE & PANJIRI
                </div>
                <div className="text-[10px] tracking-widest uppercase text-amber-400 font-medium">
                  Pure Desi Goodness · Traditional Taste
                </div>
              </div>
            </div>

            <p className="text-xs text-[#a89582] leading-relaxed max-w-sm">
              Preserving authentic generational recipes with 100% pure A2 Bilona cow ghee, California almonds, cashews, makhana, and crunchy gond. Handcrafted fresh with zero artificial preservatives.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com/desixghee.insta"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#181109] border border-[#382613] hover:border-amber-500/50 text-xs text-amber-300 hover:text-amber-200 transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>@desixghee.insta</span>
              </a>

              {onOpenDownload && (
                <button
                  onClick={onOpenDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#24170d] border border-amber-500/40 hover:border-amber-400 text-xs text-amber-300 transition-colors cursor-pointer"
                >
                  <span>Download Code</span>
                </button>
              )}
            </div>
          </div>

          {/* Varieties */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Panjiri Varieties
            </div>
            <ul className="space-y-2 text-xs">
              <li>Classic Panjiri (Rs. 1200/kg)</li>
              <li>Gond Panjiri (Rs. 1300/kg)</li>
              <li>Dry Fruits Panjiri (Rs. 1500/kg)</li>
              <li>Protein Panjiri (Rs. 1500/kg)</li>
              <li>Sugar Free Panjiri (Rs. 1600/kg)</li>
              <li>Special Royal Panjiri (Rs. 1700/kg)</li>
            </ul>
          </div>

          {/* Desi Ghee */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Shuddh Desi Ghee
            </div>
            <ul className="space-y-2 text-xs">
              <li>A2 Gir Cow Bilona (500ml)</li>
              <li>A2 Gir Cow Bilona (1000ml)</li>
              <li>5-Step Vedic Churning</li>
              <li>Danedar Golden Granules</li>
              <li>High Smoke Point 250°C</li>
            </ul>
          </div>

          {/* Storage & FAQ */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Download Website
            </div>
            <p className="text-xs text-[#9c8976] leading-relaxed">
              Export and download the full project source code (ZIP) or production static build.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <a
                href="/desi-ghee-panjiri-source-code.zip"
                download="desi-ghee-panjiri-source-code.zip"
                className="text-xs text-amber-400 hover:text-amber-300 hover:underline flex items-center gap-1"
              >
                <span>• Full Source Code (7 MB ZIP)</span>
              </a>
              <a
                href="/desi-ghee-panjiri-production-build.zip"
                download="desi-ghee-panjiri-production-build.zip"
                className="text-xs text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1"
              >
                <span>• Production Web Build (11 MB ZIP)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#21160c] flex flex-col sm:flex-row items-center justify-between text-xs text-[#786553] gap-4">
          <div>
            © {new Date().getFullYear()} Shuddh Desi Ghee & Artisanal Panjiri. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Handcrafted with pure devotion and 100% Shuddh Ghee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
