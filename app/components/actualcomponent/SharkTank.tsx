import React from 'react';
import Image from 'next/image';

const SharkTank = () => {
  const logoUrl = 'https://res.cloudinary.com/ddrhe6ojc/image/upload/v1777544886/Shark_tank_x6ius8.png';

  return (
    <section className="py-12 md:py-24 px-5 lg:px-16 bg-white font-sfpro overflow-hidden flex justify-center">
      {/* 
        The 3D Floating Banner 
        - bg-[#006A7F] (Teal)
        - 3D Floating Shadow Strategy
      */}
      <div className="
        relative w-full max-w-7xl min-h-[300px] md:min-h-[400px] 
        bg-[#006A7F] rounded-[32px] md:rounded-[48px] overflow-hidden
        flex flex-col md:flex-row items-center justify-center 
        p-10 md:p-16 gap-8 md:gap-16
        
        /* Apple-style 3D Shadow */
        shadow-[0_20px_50px_rgba(0,106,127,0.15),0_40px_100px_rgba(0,106,127,0.1)]
        transition-all duration-700 ease-out
        hover:shadow-[0_30px_70px_rgba(0,106,127,0.25),0_60px_120px_rgba(0,106,127,0.15)]
        hover:-translate-y-2
      ">
        
        {/* Subtle Background Radial Gradient for Apple Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.15),transparent)] pointer-events-none" />

        {/* Logo Section */}
        <div className="relative z-10 w-full max-w-[140px] md:max-w-[200px] flex-shrink-0 animate-enter">
          <Image
            src={logoUrl}
            alt="Shark Tank India Logo"
            width={200}
            height={200}
            className="w-full h-auto drop-shadow-2xl"
            priority
          />
        </div>

        {/* Text Section */}
        <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left max-w-[550px]">
            
            <div className="inline-block px-3 py-1 border border-white/20 rounded-full text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 mb-6 backdrop-blur-md">
                National Recognition
            </div>

            <h2 className="text-[28px] sm:text-[36px] md:text-[48px] font-semibold text-white leading-[1.1] tracking-tight mb-4">
                Recognized for <br />
                <span className="font-light text-white/90 text-[24px] sm:text-[32px] md:text-[44px]">Excellence & Innovation.</span>
            </h2>

            <p className="text-[14px] md:text-[16px] text-white/70 leading-relaxed font-normal">
                Dr. Bikram Singh&apos;s vision for accessible, high-quality
                dental care, as featured on <span className="text-white font-medium">Shark Tank India</span>. 
                Bringing world-class innovation to your smile.
            </p>
        </div>

        {/* 3D Top-edge Reflection */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
    </section>
  );
};

export default SharkTank;
