import React from 'react';
import { Zap, ShieldCheck, Leaf, Dumbbell, Award, Flame, Heart, Sparkles } from 'lucide-react';

export const AyurvedicBenefits: React.FC = () => {
  const benefits = [
    {
      title: 'Energy Booster',
      icon: Zap,
      tagline: 'Deep cellular Ojas and stamina',
      description: 'Slow-digesting roasted complex carbs paired with medium-chain fatty acids in Desi Ghee supply steady sustained cellular energy for cold winter mornings and intense mental or physical labor.',
      details: ['No sudden glycemic crashes', 'Enhances endurance & stamina', 'Ideal morning breakfast fuel']
    },
    {
      title: 'Immunity Support',
      icon: ShieldCheck,
      tagline: 'Ayurvedic winter defense',
      description: 'Natural antioxidants from California almonds, green cardamom, and zinc-rich makhana strengthen the natural immune barrier against seasonal colds, coughs, and joint aches.',
      details: ['Rich in Vitamin E & zinc', 'Warming digestive agni', 'Protects against winter chills']
    },
    {
      title: '100% Natural',
      icon: Leaf,
      tagline: 'Zero preservatives & pure ghee',
      description: 'Honoring ancient traditions: absolutely zero industrial preservatives, zero hydrogenated palm oil, zero synthetic colorants, and zero artificial stabilizers.',
      details: ['Pure A2 Gir cow bilona ghee', 'Natural raw cane sweeteners', 'Whole premium dry fruits']
    },
    {
      title: 'Good For All Ages',
      icon: Dumbbell,
      tagline: 'Nourishing four generations',
      description: 'A complete functional superfood designed to nurture cognitive growth in children, rebuild tissue & calcium for new postpartum mothers, build muscle in athletes, and ease knees in elders.',
      details: ['Postpartum mother recovery', 'Brain fuel for students', 'Joint lubrication for elders']
    }
  ];

  return (
    <section id="benefits" className="py-16 lg:py-24 bg-[#0a0805] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Ayurvedic Superfood Science</span>
            <span aria-hidden="true" className="text-amber-600">·</span>
            <span>Generational Nutrition</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#fffdfa]">
            Four Pillars of <span className="gold-gradient-text">Pure Nourishment</span>
          </h2>

          <p className="text-sm sm:text-base text-[#baa792] font-light">
            Panjiri has been praised for centuries across northern India as the supreme royal rasayana: a rejuvenating food that balances all three doshas during cold and recovering seasons.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#140e08] border border-[#312214] hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between group shadow-lg shadow-black/40"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2f1f10] to-[#1a1108] border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:text-amber-300 transition-all shadow-md">
                    <Icon className="w-7 h-7" />
                  </div>

                  <div>
                    <h3 className="font-serif-luxury text-xl font-bold text-[#fffdfa] group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-amber-400 font-medium mt-0.5">
                      {item.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-[#baa792] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#26190d] mt-6 space-y-1.5">
                  {item.details.map((d, di) => (
                    <div key={di} className="flex items-center gap-2 text-[11px] text-[#cfbca4]">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500/70" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
