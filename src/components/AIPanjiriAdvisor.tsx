import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, ShieldCheck, Heart, User, Target } from 'lucide-react';
import { PANJIRI_VARIETIES } from '../data/products';
import { CartItem } from '../types';

interface AIPanjiriAdvisorProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const AIPanjiriAdvisor: React.FC<AIPanjiriAdvisorProps> = ({
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [ageGroup, setAgeGroup] = useState('New Mother (Postpartum Healing)');
  const [goal, setGoal] = useState('Joint & Spine Recovery with Gond');
  const [dietary, setDietary] = useState('Traditional Shakkar');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<{
    recommendedVariety: string;
    why: string;
    keyIngredients: string[];
    howToConsume: string;
    sweetenerRecommendation: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleConsult = async () => {
    setLoading(true);
    setRecommendation(null);

    try {
      const res = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ageGroup,
          goal,
          dietaryPreference: dietary,
          notes,
        }),
      });

      const data = await res.json();
      if (data.recommendedVariety) {
        setRecommendation(data);
      } else {
        // Fallback default recommendation
        setRecommendation({
          recommendedVariety: 'Gond Panjiri',
          why: 'Gond Panjiri provides pure bio-available calcium and collagen-supporting acacia gum fried in A2 Bilona Ghee to deeply nourish and restore maternal vitality and ease spine fatigue.',
          keyIngredients: ['Crunchy Fried Gond', 'California Almonds', 'Pure Bilona Ghee', 'Kamarkas Herb', 'Makhana'],
          howToConsume: 'Take 2 heaped tablespoons warm with a glass of warm milk every morning.',
          sweetenerRecommendation: 'Traditional Desi Shakkar for clean warming energy.',
        });
      }
    } catch (e) {
      setRecommendation({
        recommendedVariety: 'Dry Fruits Panjiri',
        why: 'Loaded with over 60% almonds, cashews, and pistachios slow-roasted in pure A2 Gir cow ghee for sustained brain and muscle energy.',
        keyIngredients: ['Almonds', 'Cashews', 'Pistachios', 'Pure Ghee', 'Makhana'],
        howToConsume: 'Enjoy 2 spoons with breakfast.',
        sweetenerRecommendation: 'Khandsari Raw Cane Sugar',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecommended = () => {
    if (!recommendation) return;
    const variety =
      PANJIRI_VARIETIES.find((v) =>
        v.name.toLowerCase().includes(recommendation.recommendedVariety.toLowerCase())
      ) || PANJIRI_VARIETIES[1];

    const item: CartItem = {
      id: `${variety.id}-recommended-${Date.now()}`,
      productId: variety.id,
      name: `${variety.name} (AI Recommended)`,
      type: 'panjiri',
      weightOrVolume: '1 kg',
      sweetener: recommendation.sweetenerRecommendation,
      packaging: 'Handcrafted Royal Brass Tin',
      price: variety.pricePerKg,
      quantity: 1,
      image: variety.image,
    };

    onAddToCart(item);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#18110a] border border-amber-600/40 rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#302112] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury font-bold text-xl text-white">
                AI Ayurvedic Panjiri Advisor
              </h3>
              <p className="text-xs text-[#a89582]">
                Personalized formulation powered by Ayurvedic nutritional intelligence
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#a89582] hover:text-white text-sm font-semibold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-amber-300">
              Stage / Life Profile:
            </label>
            <select
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
              className="w-full bg-[#100b06] border border-[#332212] focus:border-amber-500 text-xs text-[#f5ebd9] rounded-lg p-2.5 outline-none"
            >
              <option>New Mother (Postpartum Healing & Lactation)</option>
              <option>Senior Citizen (Knee & Joint Lubrication)</option>
              <option>Fitness Enthusiast / Gym Workout Recovery</option>
              <option>School / University Student (Brain & Memory Fuel)</option>
              <option>Working Professional (Winter Energy & Anti-Fatigue)</option>
              <option>Diabetic / Pre-Diabetic Wellness</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-amber-300">
              Primary Wellness Goal:
            </label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-[#100b06] border border-[#332212] focus:border-amber-500 text-xs text-[#f5ebd9] rounded-lg p-2.5 outline-none"
            >
              <option>Joint & Spine Recovery with Gond</option>
              <option>Sustained Stamina & Cold Weather Protection</option>
              <option>High Clean Plant Protein & Muscle Building</option>
              <option>Zero Blood Sugar Spike Indulgence</option>
              <option>Royal Revitalization with Saffron & Pine Nuts</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-amber-300">
              Dietary Note:
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Prefer extra makhana, light digestion, back discomfort..."
              className="w-full bg-[#100b06] border border-[#332212] focus:border-amber-500 text-xs text-[#f5ebd9] rounded-lg p-2.5 outline-none"
            />
          </div>

          <button
            onClick={handleConsult}
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50"
          >
            {loading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Formulating Recommendation...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Analyze & Recommend Best Panjiri</span>
              </>
            )}
          </button>
        </div>

        {/* Results Card */}
        {recommendation && (
          <div className="p-5 rounded-xl bg-[#24170c] border border-amber-500/40 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-[#3b2816] pb-2.5">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                  Recommended For You
                </span>
                <h4 className="font-serif-luxury text-xl font-bold text-white">
                  {recommendation.recommendedVariety}
                </h4>
              </div>
              <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                100% Tailored
              </span>
            </div>

            <p className="text-xs text-[#cfbca4] leading-relaxed">
              {recommendation.why}
            </p>

            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-[#8c7866] uppercase">Key Power Ingredients:</span>
              <div className="flex flex-wrap gap-1.5">
                {recommendation.keyIngredients.map((ing, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2 py-0.5 rounded bg-[#160e08] text-amber-200 border border-[#3b2816]"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#191008] border border-[#332212] space-y-1 text-xs">
              <div className="text-amber-300 font-semibold">How & When to Eat:</div>
              <div className="text-[#baa792]">{recommendation.howToConsume}</div>
              <div className="text-amber-400/90 text-[11px] pt-1">
                Sweetener Match: {recommendation.sweetenerRecommendation}
              </div>
            </div>

            <button
              onClick={handleAddRecommended}
              className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
            >
              <span>Add {recommendation.recommendedVariety} to Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
