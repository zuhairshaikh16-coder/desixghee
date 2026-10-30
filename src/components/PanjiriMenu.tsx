import React, { useState } from 'react';
import { PANJIRI_VARIETIES } from '../data/products';
import { PanjiriVariety, CartItem } from '../types';
import { ShoppingBag, MessageCircle, Info, Check, Sparkles, Flame, Shield, Leaf } from 'lucide-react';

interface PanjiriMenuProps {
  onAddToCart: (item: CartItem) => void;
  onQuickOrder: (item: CartItem) => void;
}

export const PanjiriMenu: React.FC<PanjiriMenuProps> = ({ onAddToCart, onQuickOrder }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'bestsellers' | 'high_protein' | 'sugar_free'>('all');
  const [selectedWeights, setSelectedWeights] = useState<Record<string, string>>({
    'classic-panjiri': '1 kg',
    'gond-panjiri': '1 kg',
    'dry-fruits-panjiri': '1 kg',
    'protein-panjiri': '1 kg',
    'sugar-free-panjiri': '1 kg',
    'special-panjiri': '1 kg',
  });
  const [selectedSweeteners, setSelectedSweeteners] = useState<Record<string, string>>({
    'classic-panjiri': 'Desi Shakkar',
    'gond-panjiri': 'Desi Shakkar',
    'dry-fruits-panjiri': 'Khandsari Sugar',
    'protein-panjiri': 'Raw Jaggery',
    'sugar-free-panjiri': 'Pure Stevia Leaf',
    'special-panjiri': 'Desi Khand & Saffron',
  });
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);
  const [activeNutriModal, setActiveNutriModal] = useState<PanjiriVariety | null>(null);

  // Weight multiplier
  const getMultiplier = (weight: string) => {
    switch (weight) {
      case '500g':
        return 0.55; // slight packaging overhead for 500g
      case '1 kg':
        return 1.0;
      case '2 kg':
        return 1.95; // bulk discount
      case '5 kg':
        return 4.75; // bulk festival discount
      default:
        return 1.0;
    }
  };

  const filteredVarieties = PANJIRI_VARIETIES.filter((v) => {
    if (selectedFilter === 'bestsellers') return v.isBestseller || v.isPopular;
    if (selectedFilter === 'high_protein') return v.id === 'protein-panjiri' || v.id === 'dry-fruits-panjiri';
    if (selectedFilter === 'sugar_free') return v.id === 'sugar-free-panjiri';
    return true;
  });

  const handleAdd = (variety: PanjiriVariety) => {
    const weight = selectedWeights[variety.id] || '1 kg';
    const sweetener = selectedSweeteners[variety.id] || 'Desi Shakkar';
    const unitPrice = Math.round(variety.pricePerKg * getMultiplier(weight));

    const cartItem: CartItem = {
      id: `${variety.id}-${weight}-${sweetener}-${Date.now()}`,
      productId: variety.id,
      name: variety.name,
      type: 'panjiri',
      weightOrVolume: weight,
      sweetener,
      packaging: 'Traditional Royal Brass Tin',
      price: unitPrice,
      quantity: 1,
      image: variety.image,
    };

    onAddToCart(cartItem);
    setAddedAnimationId(variety.id);
    setTimeout(() => setAddedAnimationId(null), 1800);
  };

  const handleWhatsAppDirect = (variety: PanjiriVariety) => {
    const weight = selectedWeights[variety.id] || '1 kg';
    const sweetener = selectedSweeteners[variety.id] || 'Desi Shakkar';
    const unitPrice = Math.round(variety.pricePerKg * getMultiplier(weight));

    const item: CartItem = {
      id: `${variety.id}-${Date.now()}`,
      productId: variety.id,
      name: variety.name,
      type: 'panjiri',
      weightOrVolume: weight,
      sweetener,
      packaging: 'Traditional Royal Brass Tin',
      price: unitPrice,
      quantity: 1,
      image: variety.image,
    };

    onQuickOrder(item);
  };

  return (
    <section id="menu" className="py-16 lg:py-24 relative panjiri-texture-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Styled after the authentic "PANJIRI MENU" poster */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400">
            <span>Pure Desi Goodness</span>
            <span aria-hidden="true" className="text-amber-600">·</span>
            <span>Traditional Taste</span>
            <span aria-hidden="true" className="text-amber-600">·</span>
            <span>Generational Wellness</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-royal font-extrabold tracking-wide text-[#fffdfa]">
            PANJIRI <span className="gold-gradient-text">MENU</span>
          </h2>

          <p className="text-sm sm:text-base text-[#cfbca4] font-light">
            Every batch is hand-roasted in heavy iron kadais with 100% pure A2 Gir cow ghee, rich almonds, cashews, gond, and makhana. Preservative-free and delivered fresh to your doorstep.
          </p>

          {/* Interactive Filter Tabs (Zero-pill compliant button segmented controls) */}
          <div className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-[#1d140b] border border-[#382613] mt-4">
            {[
              { id: 'all', label: 'All 6 Varieties' },
              { id: 'bestsellers', label: 'Bestsellers' },
              { id: 'high_protein', label: 'Protein & Nuts' },
              { id: 'sugar_free', label: 'Diabetic & Sugar Free' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-amber-600 text-stone-950 font-bold shadow-sm'
                    : 'text-[#baa792] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Panjiri Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVarieties.map((variety) => {
            const currentWeight = selectedWeights[variety.id] || '1 kg';
            const currentSweetener = selectedSweeteners[variety.id] || 'Desi Shakkar';
            const price = Math.round(variety.pricePerKg * getMultiplier(currentWeight));
            const isAdded = addedAnimationId === variety.id;

            return (
              <div
                key={variety.id}
                className="rounded-2xl bg-[#171009] border border-[#3b2714] hover:border-amber-500/60 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-xl shadow-black/40 hover:shadow-amber-950/30"
              >
                {/* Image & Header */}
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                    <img
                      src={variety.image}
                      alt={variety.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#171009] via-transparent to-black/30 pointer-events-none" />

                    {/* Badge top-left */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      {variety.isBestseller && (
                        <span className="px-2.5 py-0.5 rounded bg-amber-600 text-stone-950 text-[10px] font-bold uppercase tracking-wider shadow">
                          Bestseller
                        </span>
                      )}
                      {variety.isPopular && !variety.isBestseller && (
                        <span className="px-2.5 py-0.5 rounded bg-[#2b1c0e]/90 text-amber-300 border border-amber-500/30 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md">
                          Most Loved
                        </span>
                      )}
                    </div>

                    {/* Price tag top-right */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-amber-500/40 text-right">
                      <div className="text-amber-300 font-bold text-sm sm:text-base font-serif-luxury">
                        Rs. {price}
                      </div>
                      <div className="text-[10px] text-[#baa792]">for {currentWeight}</div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif-luxury text-xl font-bold text-[#fffdfa] group-hover:text-amber-300 transition-colors">
                          {variety.name}
                        </h3>
                        <button
                          onClick={() => setActiveNutriModal(variety)}
                          className="text-[11px] text-[#baa792] hover:text-amber-300 flex items-center gap-1 cursor-pointer transition-colors"
                          title="View Ayurvedic nutrition breakdown"
                        >
                          <Info className="w-3.5 h-3.5" />
                          <span>Facts</span>
                        </button>
                      </div>
                      <p className="text-xs text-amber-400/90 font-medium mt-0.5">
                        {variety.tagline}
                      </p>
                    </div>

                    <p className="text-xs text-[#cfbca4] leading-relaxed line-clamp-3">
                      {variety.description}
                    </p>

                    {/* Key Ingredients tags */}
                    <div className="space-y-1">
                      <div className="text-[11px] font-semibold text-[#8c7866] uppercase tracking-wider">
                        Key Ingredients:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {variety.keyIngredients.slice(0, 4).map((ing, i) => (
                          <span
                            key={i}
                            className="text-[11px] px-2 py-0.5 rounded bg-[#20150b] text-[#baa792] border border-[#382613]"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Weight Selection Controls */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-[#8c7866] uppercase tracking-wider">Select Weight:</span>
                        <span className="text-amber-400 font-mono text-[10px]">Standard Rs. {variety.pricePerKg}/kg</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5">
                        {['500g', '1 kg', '2 kg', '5 kg'].map((w) => (
                          <button
                            key={w}
                            onClick={() => setSelectedWeights({ ...selectedWeights, [variety.id]: w })}
                            className={`py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                              currentWeight === w
                                ? 'bg-amber-600/20 text-amber-300 border-amber-500 shadow-sm'
                                : 'bg-[#120d07] text-[#9c8976] border-[#2e2013] hover:border-[#4d351f]'
                            }`}
                          >
                            {w}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sweetener Selection */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-semibold text-[#8c7866] uppercase tracking-wider">
                        Sweetener Option:
                      </div>
                      <select
                        value={currentSweetener}
                        onChange={(e) =>
                          setSelectedSweeteners({ ...selectedSweeteners, [variety.id]: e.target.value })
                        }
                        className="w-full bg-[#120d07] border border-[#332212] focus:border-amber-500 rounded-lg p-2 text-xs text-[#f5ebd9] outline-none"
                      >
                        <option>Desi Shakkar (Traditional Cane)</option>
                        <option>Khandsari Raw Unrefined Sugar</option>
                        <option>Organic Brown Jaggery (Gud)</option>
                        <option>Pure Stevia Leaf Extract (Sugar-Free)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-6 pt-0 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleAdd(variety)}
                      className={`w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white shadow-md shadow-amber-950/40'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add to Order</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleWhatsAppDirect(variety)}
                      className="w-full py-2.5 rounded-lg bg-[#24170d] hover:bg-[#322011] text-amber-200 border border-amber-600/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Traditional Variety Guarantee Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-[#24170c] via-[#1d1209] to-[#24170c] border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif-luxury font-bold text-white text-base">
                Freshly Hand-Roasted Upon Order Confirmation
              </h4>
              <p className="text-xs text-[#cfbca4] mt-0.5">
                We never store pre-packaged warehouse stock. Each batch is made fresh in heavy kadais and packed in airtight tins to preserve maximum aroma and crunch.
              </p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">Direct Inquiries</div>
            <div className="text-sm font-bold text-white font-mono">Instagram: @desixghee.insta</div>
          </div>
        </div>
      </div>

      {/* Nutrition & Ayurvedic Modal */}
      {activeNutriModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#18110a] border border-amber-600/40 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[#362515] pb-3">
              <div>
                <h3 className="font-serif-luxury font-bold text-xl text-white">
                  {activeNutriModal.name}
                </h3>
                <p className="text-xs text-amber-400">{activeNutriModal.tagline}</p>
              </div>
              <button
                onClick={() => setActiveNutriModal(null)}
                className="text-[#a89582] hover:text-white text-sm font-semibold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Nutrition per 100g */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-[#8c7866] uppercase tracking-wider">
                Nutritional Profile (per 100g):
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-2.5 rounded-lg bg-[#120d07] border border-[#2e2013]">
                  <div className="text-xs font-bold text-amber-300">{activeNutriModal.nutrition.calories}</div>
                  <div className="text-[10px] text-[#baa792]">Calories</div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#120d07] border border-[#2e2013]">
                  <div className="text-xs font-bold text-amber-300">{activeNutriModal.nutrition.protein}</div>
                  <div className="text-[10px] text-[#baa792]">Clean Protein</div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#120d07] border border-[#2e2013]">
                  <div className="text-xs font-bold text-amber-300">{activeNutriModal.nutrition.healthyFats}</div>
                  <div className="text-[10px] text-[#baa792]">A2 Ghee Fats</div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#120d07] border border-[#2e2013]">
                  <div className="text-xs font-bold text-amber-300">{activeNutriModal.nutrition.carbs}</div>
                  <div className="text-[10px] text-[#baa792]">Slow Carbs</div>
                </div>
              </div>
            </div>

            {/* Ayurvedic Benefits */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-[#8c7866] uppercase tracking-wider">
                Ayurvedic Indications:
              </div>
              <ul className="space-y-1 text-xs text-[#cfbca4]">
                {activeNutriModal.benefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Ritual */}
            <div className="p-3 rounded-lg bg-[#24170c] border border-amber-600/30 text-xs text-[#d8c7b3]">
              <span className="font-semibold text-amber-300">How to Consume:</span> Best enjoyed warm (1-2 heaped tablespoons) with a cup of warm saffron or cardamom milk in the morning.
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveNutriModal(null)}
                className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
