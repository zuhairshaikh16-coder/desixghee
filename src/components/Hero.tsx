import React from 'react';
import { Sparkles, Video, ArrowRight, ShieldCheck, Flame, Heart, Download } from 'lucide-react';

interface HeroProps {
  onExploreMenu: () => void;
  onWatchVideo: () => void;
  onOpenAdvisor: () => void;
  onOpenDownload?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMenu,
  onWatchVideo,
  onOpenAdvisor,
  onOpenDownload
}) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Subtle Earthen Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-[350px] h-[350px] bg-orange-700/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Clean Unboxed Metadata Kicker (Anti-slop compliant) */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400">
              <span>Pure Desi Goodness</span>
              <span aria-hidden="true" className="text-amber-600">·</span>
              <span>100% Shuddh Bilona Ghee</span>
              <span aria-hidden="true" className="text-amber-600">·</span>
              <span>Traditional Taste</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-luxury font-bold tracking-tight text-[#fffcf7] leading-[1.12]">
              Royal Handcrafted <br className="hidden sm:inline" />
              <span className="gold-gradient-text">Panjiri & Desi Ghee</span>
            </h1>

            {/* Sub-copy */}
            <p className="text-base sm:text-lg text-[#d8c7b3] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Made in small artisanal batches with <span className="text-amber-300 font-medium">100% Pure A2 Cow Bilona Ghee</span>, slow-roasted stone-ground flour, crunchy Gond (edible gum), and hand-picked dry fruits. Generational wellness for winter vitality, new mothers, and everyday strength.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-500 text-stone-950 font-semibold text-sm shadow-lg shadow-amber-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>View Panjiri Menu</span>
                <ArrowRight className="w-4 h-4 text-stone-950" />
              </button>

              <button
                onClick={onWatchVideo}
                className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-[#22160b] hover:bg-[#2e1f10] text-amber-200 border border-amber-600/40 font-medium text-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Video className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>Play AI Panjiri Video</span>
              </button>

              {onOpenDownload && (
                <button
                  onClick={onOpenDownload}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-lg bg-[#291b0f] hover:bg-[#382514] text-amber-300 border border-amber-500/40 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  title="Download website package as ZIP"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Download Website (ZIP)</span>
                </button>
              )}

              <button
                onClick={onOpenAdvisor}
                className="w-full sm:w-auto px-4 py-3.5 rounded-lg text-xs text-[#cfbca4] hover:text-amber-300 hover:bg-[#1f150c] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>AI Health Advisor</span>
              </button>
            </div>

            {/* 4 Pillars Under Hero */}
            <div className="pt-8 border-t border-[#2e2013] grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="space-y-1">
                <div className="text-amber-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>Energy Booster</span>
                </div>
                <p className="text-[12px] text-[#a89582] leading-tight">Sustained vitality all day without sugar crash</p>
              </div>

              <div className="space-y-1">
                <div className="text-amber-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  <span>Immunity Support</span>
                </div>
                <p className="text-[12px] text-[#a89582] leading-tight">Warming Ayurvedic spices & pure antioxidants</p>
              </div>

              <div className="space-y-1">
                <div className="text-amber-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-amber-500" />
                  <span>100% Natural</span>
                </div>
                <p className="text-[12px] text-[#a89582] leading-tight">Zero preservatives, zero palm oil or vanaspati</p>
              </div>

              <div className="space-y-1">
                <div className="text-amber-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>All Age Groups</span>
                </div>
                <p className="text-[12px] text-[#a89582] leading-tight">Kids, new mothers, gym goers & elderly care</p>
              </div>
            </div>
          </div>

          {/* Right Visual Column: Featuring the Original Bowl & Artisanal Pure Ghee */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative royal frame */}
              <div className="relative rounded-2xl overflow-hidden p-2 bg-gradient-to-b from-amber-700/30 via-[#3a2512]/40 to-transparent border border-amber-600/30 shadow-2xl shadow-amber-950/60">
                {/* Main Featured Panjiri Poster Bowl Preview */}
                <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-[#1a120a] group">
                  <img
                    src="/assets/aistudio/image_9615a613.png"
                    alt="Royal Brass Bowl of Dry Fruits Panjiri made with 100% Pure Desi Ghee"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0905] via-transparent to-black/20 pointer-events-none" />

                  {/* Overlaid Banner Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="px-3 py-1 rounded bg-[#160f08]/90 border border-amber-500/40 backdrop-blur-md text-[11px] font-semibold uppercase tracking-wider text-amber-300">
                      100% Pure Desi Ghee
                    </div>
                    <button
                      onClick={onWatchVideo}
                      className="px-3 py-1 rounded bg-amber-600 hover:bg-amber-500 text-stone-950 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Watch Reel</span>
                    </button>
                  </div>

                  {/* Bottom Image Caption */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-lg bg-[#140e08]/90 border border-[#3e2b19] backdrop-blur-md">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <div className="font-serif-luxury font-bold text-[#fffdfa] text-sm">
                          Classic Panjiri Brass Bowl
                        </div>
                        <div className="text-[11px] text-[#c9b59e]">
                          Overloaded with Badam, Kaju, Gond & Makhana
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-amber-400 font-bold text-sm">From Rs. 1200/kg</div>
                        <div className="text-[10px] text-amber-500/80">Batch Fresh Made</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Pure Desi Ghee Jar mini card */}
              <div className="hidden sm:flex absolute -bottom-6 -left-6 items-center gap-3 p-3 rounded-xl bg-[#1d140c]/95 border border-amber-500/30 backdrop-blur-md shadow-xl shadow-black/80 max-w-xs">
                <img
                  src="/images/desi_ghee_jar_1793380040196.jpg"
                  alt="A2 Gir Cow Bilona Ghee"
                  className="w-14 h-14 rounded-lg object-cover border border-amber-500/20"
                />
                <div>
                  <div className="text-xs font-bold text-amber-200">A2 Bilona Desi Ghee</div>
                  <div className="text-[11px] text-[#baa792]">Golden granular texture, zero additives</div>
                  <div className="text-[11px] text-amber-400 font-semibold mt-0.5">Rs. 950 / 500ml</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
