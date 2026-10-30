import React, { useState } from 'react';
import { DESI_GHEE_PRODUCTS } from '../data/products';
import { DesiGheeProduct, CartItem } from '../types';
import { ShoppingBag, Check, ShieldCheck, Sparkles, Droplet, Flame, HeartHandshake } from 'lucide-react';

interface DesiGheeSectionProps {
  onAddToCart: (item: CartItem) => void;
  onQuickOrder: (item: CartItem) => void;
}

export const DesiGheeSection: React.FC<DesiGheeSectionProps> = ({ onAddToCart, onQuickOrder }) => {
  const [selectedProductId, setSelectedProductId] = useState<string>('desi-ghee-500ml');
  const [addedId, setAddedId] = useState<string | null>(null);

  const selectedProduct = DESI_GHEE_PRODUCTS.find((p) => p.id === selectedProductId) || DESI_GHEE_PRODUCTS[0];

  const handleAdd = (product: DesiGheeProduct) => {
    const cartItem: CartItem = {
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      type: 'ghee',
      weightOrVolume: product.volume,
      price: product.price,
      quantity: 1,
      image: product.image,
    };

    onAddToCart(cartItem);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  const handleOrder = (product: DesiGheeProduct) => {
    const item: CartItem = {
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      type: 'ghee',
      weightOrVolume: product.volume,
      price: product.price,
      quantity: 1,
      image: product.image,
    };
    onQuickOrder(item);
  };

  return (
    <section id="ghee" className="py-16 lg:py-24 bg-[#0e0a06] relative overflow-hidden border-t border-[#291b0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400">
            <Droplet className="w-4 h-4 text-amber-400" />
            <span>Liquid Gold</span>
            <span aria-hidden="true" className="text-amber-600">·</span>
            <span>100% Shuddh Bilona</span>
            <span aria-hidden="true" className="text-amber-600">·</span>
            <span>A2 Gir Cow Milk</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-[#fffdfa]">
            Handcrafted <span className="gold-gradient-text">A2 Bilona Desi Ghee</span>
          </h2>

          <p className="text-sm sm:text-base text-[#cfbca4] font-light">
            The soul of every royal Panjiri. Made from the milk of free-grazing indigenous Gir cows, cultured overnight into curd, and hand-churned in clockwise-anticlockwise bi-directional wooden bilona.
          </p>
        </div>

        {/* Feature Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Visual Product Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden bg-[#160f09] border border-amber-600/30 p-2 shadow-2xl shadow-black">
              <div className="relative aspect-square rounded-xl overflow-hidden group">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded bg-[#130d07]/90 text-amber-300 border border-amber-500/40 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md">
                    Cultured Curd Bilona
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#140e08]/90 border border-[#3b2816] backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-serif-luxury font-bold text-white text-base sm:text-lg">
                        {selectedProduct.volume}
                      </div>
                      <div className="text-xs text-[#cfbca4]">Granular golden amber texture</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl sm:text-2xl font-bold font-serif-luxury text-amber-300">
                        Rs. {selectedProduct.price}
                      </div>
                      <div className="text-[10px] text-amber-400 font-semibold">Free Delivery Available</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Size Switcher Pills */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {DESI_GHEE_PRODUCTS.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => setSelectedProductId(prod.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedProductId === prod.id
                      ? 'bg-[#291b0f] border-amber-500 shadow-md shadow-amber-950/40 text-white'
                      : 'bg-[#140e08] border-[#312113] text-[#baa792] hover:border-[#4d351f]'
                  }`}
                >
                  <div className="text-xs font-bold">{prod.volume}</div>
                  <div className="text-sm font-semibold text-amber-400 mt-0.5">Rs. {prod.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Detailed Benefits & The Vedic 5-Step Process */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <h3 className="font-serif-luxury text-2xl font-bold text-[#fffdfa]">
                Why True Vedic Bilona Ghee is Unmatched
              </h3>
              <p className="text-sm text-[#baa792] leading-relaxed">
                Most commercial ghee sold today is stripped of prana by separating cream from milk using high-heat industrial centrifuges. Our Desi Ghee follows the strict Ayurvedic 5-Sutra Bilona method:
              </p>
            </div>

            {/* 5-Step Bilona Process Steps */}
            <div className="space-y-2.5">
              {[
                { step: '01', title: 'A2 Gir Cow Milk', desc: 'Raw fresh milk from free-grazing indigenous cows eating wild medicinal grass.' },
                { step: '02', title: 'Slow Earthen Boiling', desc: 'Boiled gently in clay & brass vessels over low flame woodfire.' },
                { step: '03', title: 'Cultured Curd Fermentation', desc: 'Naturally set overnight into rich probiotic curd using natural starter.' },
                { step: '04', title: 'Wooden Bilona Hand Churning', desc: 'Bidirectional churning separates fresh cultured butter (Makhan).' },
                { step: '05', title: 'Clarified Amber Grain', desc: 'Simmered slowly until golden aroma and granular Danedar crystals emerge.' },
              ].map((s) => (
                <div key={s.step} className="p-3 rounded-xl bg-[#150f09] border border-[#2b1c0e] flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-600/10 border border-amber-500/20 text-amber-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#f5ebd9]">{s.title}</h4>
                    <p className="text-[11px] text-[#9c8976] mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Ayurvedic Benefits List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {selectedProduct.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[#cfbca4]">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </div>
              ))}
            </div>

            {/* Purchase Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
              <button
                onClick={() => handleAdd(selectedProduct)}
                className={`w-full sm:w-auto flex-1 py-3.5 px-6 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  addedId === selectedProduct.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-500 text-stone-950 shadow-lg shadow-amber-950/60'
                }`}
              >
                {addedId === selectedProduct.id ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Order {selectedProduct.volume}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleOrder(selectedProduct)}
                className="w-full sm:w-auto py-3.5 px-6 rounded-lg bg-[#27180c] hover:bg-[#362211] text-amber-200 border border-amber-500/30 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
              >
                Quick WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
