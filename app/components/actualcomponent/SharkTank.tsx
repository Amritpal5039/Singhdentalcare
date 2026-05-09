import React from 'react';
import Image from 'next/image';

const SharkTank = () => {
  const logoUrl = 'https://res.cloudinary.com/ddrhe6ojc/image/upload/v1777544886/Shark_tank_x6ius8.png';

  return (
    <section className="apple-section bg-white">
      <div className="apple-container">
        <div className="relative w-full min-h-[400px] bg-[#1d1d1f] rounded-[32px] md:rounded-[40px] overflow-hidden flex flex-col md:flex-row items-center justify-between p-12 md:p-20 gap-12 group transition-all duration-500">
          
          {/* Subtle Background Radial Gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,113,227,0.1),transparent)] pointer-events-none" />

          {/* Logo Section */}
          <div className="relative z-10 w-full max-w-[160px] md:max-w-[220px] flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
            <Image
              src={logoUrl}
              alt="Shark Tank India Logo"
              width={220}
              height={220}
              className="w-full h-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              priority
            />
          </div>

          {/* Text Section */}
          <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left max-w-[500px]">
              <p className="apple-eyebrow !text-[#86868b] mb-4">National Recognition.</p>

              <h2 className="apple-title-xl !text-[#f5f5f7] mb-6 leading-tight">
                  Recognized for <br />
                  <span className="text-[#0071e3]">Excellence & Innovation.</span>
              </h2>

              <p className="apple-body !text-[#86868b]">
                  Dr. Bikram Singh&apos;s vision for accessible, high-quality
                  dental care, as featured on <span className="text-white font-medium">Shark Tank India</span>. 
                  Bringing world-class innovation to your smile.
              </p>
          </div>

          {/* 3D Top-edge Reflection */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default SharkTank;
