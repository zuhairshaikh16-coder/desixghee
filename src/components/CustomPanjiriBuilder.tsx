import React, { useState } from 'react';
import { Sparkles, Sliders, ShoppingBag, Check, Flame } from 'lucide-react';
import { CartItem } from '../types';

interface CustomPanjiriBuilderProps {
  onAddToCart: (item: CartItem) => void;
  onQuickOrder: (item: CartItem) => void;
}

export const CustomPanjiriBuilder: React.FC<CustomPanjiriBuilderProps> = ({ onAddToCart, onQuickOrder }) => {
  const [baseFlour, setBaseFlour] = useState<'wheat' | 'suji' | 'besan_sattu'>('wheat');
  const [gheeLevel, setGheeLevel] = useState<'standard' | 'royal_rich'>('standard');
  const [nutDensity, setNutDensity] = useState<'regular' | 'double_nuts' | 'imperial'>('double_nuts');
  const [sweetener, setSweetener] = useState<'shakkar' | 'khandsari' | 'jaggery' | 'stevia'>('shakkar');
  const [addGond, setAddGond] = useState(true);
  const [addMakhana, setAddMakhana] = useState(true);
  const [addKamarkas, setAddKamarkas] = useState(false);
  const [addSaffron, setAddSaffron] = useState(false);
  const [weightKg, setWeightKg] = useState<number>(1);
  const [isAdded, setIsAdded] = useState(false);

  // Live price calculation
  const calculatePricePerKg = () => {
    let base = 1200; // base price

    if (baseFlour === 'besan_sattu') base += 100;
    if (gheeLevel === 'royal_rich') base += 150;

    if (nutDensity === 'double_nuts') base += 200;
    if (nutDensity === 'imperial') base += 350;

    if (sweetener === 'stevia') base += 150;

    if (addGond) base += 100;
    if (addMakhana) base += 80;
    if (addKamarkas) base += 120;
    if (addSaffron) base += 250;

    return base;
  };

  const pricePerKg = calculatePricePerKg();
  const totalPrice = Math.round(pricePerKg * (weightKg === 0.5 ? 0.55 : weightKg));

  const handleAdd = () => {
    const customSummary = `Custom (${baseFlour}, ${nutDensity.replace('_', ' ')}, ${addGond ? '+Gond' : ''}${addMakhana ? ' +Makhana' : ''}${addSaffron ? ' +Kesar' : ''})`;

    const cartItem: CartItem = {
      id: `custom-panjiri-${Date.now()}`,
      productId: 'custom-panjiri',
      name: `Bespoke Custom Panjiri (${weightKg} kg)`,
      type: 'panjiri',
      weightOrVolume: `${weightKg} kg`,
      sweetener: sweetener.toUpperCase(),
      packaging: 'Handcrafted Brass Royal Tin',
      price: totalPrice,
      quantity: 1,
      image: '/images/panjiri_cooking_1793380083114.jpg',
    };

    onAddToCart(cartItem);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <section id="customizer" className="py-16 lg:py-24 bg-[#0d0905] relative border-t border-[#291b0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400">
            <Sliders className="w-4 h-4 text-amber-400" />
            <span>Artisanal Customization Lab</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#fffdfa]">
            Craft Your <span className="gold-gradient-text">Bespoke Panjiri</span>
          </h2>

          <p className="text-sm text-[#baa792] font-light">
            Tailor the ingredients to your exact body requirements. Whether preparing for postpartum recovery, winter athletic endurance, or diabetic wellness.
          </p>
        </div>

        {/* Builder Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6 bg-[#140e08] p-6 sm:p-8 rounded-2xl border border-[#332213]">
            
            {/* Step 1: Base Flour */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-300">
                1. Select Base Flour:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'wheat', label: 'Stoneground Wheat', note: 'Traditional classic taste' },
                  { id: 'suji', label: 'Golden Semolina', note: 'Granular crunch texture' },
                  { id: 'besan_sattu', label: 'Besan & Sattu', note: 'High plant protein' },
                ].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBaseFlour(b.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      baseFlour === b.id
                        ? 'bg-amber-600/20 text-white border-amber-500 shadow-sm'
                        : 'bg-[#100b06] text-[#9c8976] border-[#291b0f] hover:border-[#422c18]'
                    }`}
                  >
                    <div className="text-xs font-bold">{b.label}</div>
                    <div className="text-[10px] text-[#baa792] mt-0.5">{b.note}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Ghee Richness */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-300">
                2. A2 Bilona Desi Ghee Richness:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'standard', label: 'Classic Traditional Ghee', note: 'Optimal golden balance' },
                  { id: 'royal_rich', label: 'Royal Drenched Ghee (+Rs. 150)', note: 'Supreme royal richness' },
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGheeLevel(g.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      gheeLevel === g.id
                        ? 'bg-amber-600/20 text-white border-amber-500 shadow-sm'
                        : 'bg-[#100b06] text-[#9c8976] border-[#291b0f] hover:border-[#422c18]'
                    }`}
                  >
                    <div className="text-xs font-bold">{g.label}</div>
                    <div className="text-[10px] text-[#baa792] mt-0.5">{g.note}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Dry Fruit & Nut Concentration */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-300">
                3. Dry Fruits Overload (Almonds, Cashews, Pistachios):
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'regular', label: '40% Nuts', note: 'Standard balance' },
                  { id: 'double_nuts', label: '60% Double Nuts (+Rs. 200)', note: 'Nut lover favorite' },
                  { id: 'imperial', label: '75% Imperial (+Rs. 350)', note: 'Overloaded nuts' },
                ].map((n) => (
                  <button
                    key={n.id}
                    onClick={() => setNutDensity(n.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      nutDensity === n.id
                        ? 'bg-amber-600/20 text-white border-amber-500 shadow-sm'
                        : 'bg-[#100b06] text-[#9c8976] border-[#291b0f] hover:border-[#422c18]'
                    }`}
                  >
                    <div className="text-xs font-bold">{n.label}</div>
                    <div className="text-[10px] text-[#baa792] mt-0.5">{n.note}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Herbal & Ayurvedic Boosters */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-300">
                4. Ayurvedic Fortification Boosters:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: 'Fried Gond (+Rs. 100)', active: addGond, toggle: () => setAddGond(!addGond), benefit: 'Joint & Spine' },
                  { label: 'Makhana (+Rs. 80)', active: addMakhana, toggle: () => setAddMakhana(!addMakhana), benefit: 'Light Calcium' },
                  { label: 'Kamarkas (+Rs. 120)', active: addKamarkas, toggle: () => setAddKamarkas(!addKamarkas), benefit: 'Back Support' },
                  { label: 'Kashmiri Kesar (+Rs. 250)', active: addSaffron, toggle: () => setAddSaffron(!addSaffron), benefit: 'Royal Glow' },
                ].map((b, i) => (
                  <button
                    key={i}
                    onClick={b.toggle}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      b.active
                        ? 'bg-amber-600/20 text-amber-300 border-amber-500'
                        : 'bg-[#100b06] text-[#827263] border-[#291b0f]'
                    }`}
                  >
                    <div className="text-xs font-bold">{b.label}</div>
                    <div className="text-[10px] text-[#a89582]">{b.benefit}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Sweetener */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-300">
                5. Sweetener Preference:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'shakkar', label: 'Desi Shakkar' },
                  { id: 'khandsari', label: 'Raw Khandsari' },
                  { id: 'jaggery', label: 'Organic Jaggery' },
                  { id: 'stevia', label: 'Stevia (Sugar-Free)' },
                ].map((sw) => (
                  <button
                    key={sw.id}
                    onClick={() => setSweetener(sw.id as any)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      sweetener === sw.id
                        ? 'bg-amber-600/20 text-amber-300 border-amber-500'
                        : 'bg-[#100b06] text-[#827263] border-[#291b0f]'
                    }`}
                  >
                    <div className="text-xs font-bold">{sw.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Order Summary & Recipe Card */}
          <div className="lg:col-span-5 bg-[#171009] p-6 sm:p-8 rounded-2xl border border-amber-600/40 space-y-6 shadow-xl sticky top-28">
            <div className="flex items-center justify-between border-b border-[#302112] pb-4">
              <div>
                <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-widest">
                  Live Custom Batch
                </span>
                <h3 className="font-serif-luxury text-2xl font-bold text-white">
                  Bespoke Panjiri Batch
                </h3>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold font-serif-luxury text-amber-300">
                  Rs. {totalPrice}
                </div>
                <div className="text-[10px] text-[#baa792]">Rs. {pricePerKg} / kg</div>
              </div>
            </div>

            {/* Summary Points */}
            <div className="space-y-2.5 text-xs text-[#cfbca4]">
              <div className="flex items-center justify-between">
                <span>Base:</span>
                <span className="text-white font-medium capitalize">{baseFlour.replace('_', ' ')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Ghee Richness:</span>
                <span className="text-white font-medium capitalize">{gheeLevel.replace('_', ' ')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Dry Fruit Overload:</span>
                <span className="text-white font-medium capitalize">{nutDensity.replace('_', ' ')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Sweetener:</span>
                <span className="text-amber-300 font-medium capitalize">{sweetener}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Boosters:</span>
                <span className="text-white font-medium">
                  {[addGond && 'Gond', addMakhana && 'Makhana', addKamarkas && 'Kamarkas', addSaffron && 'Kesar']
                    .filter(Boolean)
                    .join(', ') || 'None'}
                </span>
              </div>
            </div>

            {/* Weight Stepper */}
            <div className="space-y-2 pt-2 border-t border-[#302112]">
              <div className="text-xs font-semibold text-[#8c7866] uppercase tracking-wider">
                Select Batch Quantity:
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[0.5, 1, 2, 5].map((w) => (
                  <button
                    key={w}
                    onClick={() => setWeightKg(w)}
                    className={`py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      weightKg === w
                        ? 'bg-amber-600 text-stone-950 border-amber-500 font-bold'
                        : 'bg-[#100b06] text-[#9c8976] border-[#291b0f]'
                    }`}
                  >
                    {w === 0.5 ? '500g' : `${w} kg`}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleAdd}
                className={`w-full py-3.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-500 text-stone-950 shadow-lg shadow-amber-950/60'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added Custom Batch!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Custom Panjiri ({weightKg} kg)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
