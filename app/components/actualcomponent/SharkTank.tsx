import React from 'react';
import Image from 'next/image';
import { Award, Star, ShieldCheck } from 'lucide-react';

const SharkTank = () => {
  const logoUrl = 'https://res.cloudinary.com/ddrhe6ojc/image/upload/v1777544886/Shark_tank_x6ius8.png';

  return (
    <section className="apple-section bg-white overflow-hidden">
      <div className="apple-container-wide">
        {/* Fibonacci Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-8 md:grid-rows-5 gap-4 lg:gap-6 min-h-[600px]">
          
          {/* Main Content Card (5x5 Area) */}
          <div className="md:col-span-5 md:row-span-5 bg-[#f5f5f7] rounded-[32px] p-8 md:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden group transition-all duration-500 hover:shadow-xl hover:shadow-black/5">
            <div className="relative z-10">
              <span className="apple-eyebrow text-apple-blue font-semibold mb-4 block">National Recognition</span>
              <h2 className="apple-display text-[#1d1d1f] mb-6 leading-[1.1]">
                Recognized for <br />
                <span className="text-[#86868b]">Excellence & Innovation.</span>
              </h2>
              <p className="apple-subtitle text-[#424245] max-w-md">
                Dr. Bikram Singh&apos;s vision for accessible, high-quality dental care was featured on Shark Tank India, bringing world-class innovation to your smile.
              </p>
            </div>
            {/* Subtle background decoration */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/50 rounded-full blur-3xl" />
          </div>

          {/* Logo Card (3x3 Area) */}
          <div className="md:col-span-3 md:row-span-3 bg-white border border-[#d2d2d7]/30 rounded-[32px] p-8 flex items-center justify-center group transition-all duration-500 hover:bg-[#f5f5f7]">
            <div className="relative w-full max-w-[200px] aspect-square transition-transform duration-700 group-hover:scale-105">
              <Image
                src={logoUrl}
                alt="Shark Tank India Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Achievement Card (2x2 Area) */}
          <div className="md:col-span-2 md:row-span-2 bg-white border border-[#d2d2d7]/30 rounded-[32px] p-6 flex flex-col justify-between transition-all duration-500 hover:border-apple-blue/30 group">
            <div className="w-12 h-12 rounded-full bg-apple-blue/10 flex items-center justify-center text-apple-blue mb-4 transition-colors group-hover:bg-apple-blue group-hover:text-white">
              <Award size={24} />
            </div>
            <div>
              <p className="apple-title-md !text-lg mb-1">National Feature</p>
              <p className="apple-caption">Shark Tank India Season 2</p>
            </div>
          </div>

          {/* Stat/Icon Card 1 (1x1 Area) */}
          <div className="md:col-span-1 md:row-span-1 bg-[#1d1d1f] text-white rounded-[24px] flex items-center justify-center group transition-all duration-500 hover:scale-[1.02]">
            <div className="text-center">
              <Star size={20} className="mx-auto mb-1 text-yellow-400" fill="currentColor" />
              <p className="text-[10px] uppercase tracking-tighter opacity-70">Top Rated</p>
            </div>
          </div>

          {/* Trust Card (1x1 Area) */}
          <div className="md:col-span-1 md:row-span-1 bg-apple-blue text-white rounded-[24px] flex items-center justify-center group transition-all duration-500 hover:scale-[1.02]">
            <ShieldCheck size={32} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default SharkTank;



