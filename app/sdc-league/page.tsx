import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SDC League | Singh Dental Care",
  description: "Learn about the SDC League, our community initiative to promote dental health awareness.",
  keywords: ["Singh Dental Care", "dentist", "SDC League", "dental community", "oral health awareness", "dental outreach"],
  openGraph: {
    images: [
      {
        url: "https://res.cloudinary.com/ddrhe6ojc/image/upload/v1783944660/qgrmieqtkpqombmojegj.webp",
        width: 1200,
        height: 630,
        alt: "Singh Dental Care - SDC League",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://res.cloudinary.com/ddrhe6ojc/image/upload/v1783944660/qgrmieqtkpqombmojegj.webp"],
  },
};

import React from 'react';
import Link from 'next/link';

export default function SDCLeaguePage() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center bg-white overflow-hidden relative px-6">
      {/* Creative Background Element - Stylized Cricket Field/Ball concept */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03] pointer-events-none">
        {/* Outer Circle (Field) */}
        <div className="absolute inset-0 border-[2px] border-black rounded-full" />
        {/* Pitch */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[300px] border-[2px] border-black rounded-sm" />
        {/* Inner Circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border-[1px] border-dashed border-black rounded-full" />
      </div>

      <div className="apple-container-narrow relative z-10 text-center py-20">
        <p className="apple-eyebrow mb-6 text-[#0071e3] font-semibold tracking-widest uppercase">
          Beyond the Clinic
        </p>
        
        <h1 className="apple-hero-title mb-6 leading-[1.05]">
          Singh Dental Care<br />
          <span className="text-[#1d1d1f]">Super League.</span>
        </h1>
        
        <div className="flex flex-col sm:flex items-center justify-center gap-6">
          <div className="relative w-full aspect-video rounded-[32px] overflow-hidden shadow-2xl border-4 border-[#f5f5f7]">
            <iframe
              src="https://www.youtube.com/embed/1kGi9SXwkXA?autoplay=1&mute=1&controls=1&rel=0"
              title="Main Podcast Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            
          </div>
          <h2 className="apple-title-md text-[#1d1d1f] text-base md:text-lg lg:text-[18px] leading-relaxed">
            At Singh Dental Care, we don't believe that work should be something you simply finish at the end of the day.

We believe you should be able to enjoy the people you work with…</h2>
        </div>
      </div>

      {/* Culture & Celebrations Section */}
      <section className="apple-container-wide w-full relative z-10 pb-24">
        <div className="flex flex-col gap-16 md:gap-24">
          {/* Row 1: Diwali Celebration - Video on Left, Text on Right */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16">
            <div className="w-full max-w-[300px] sm:w-72 aspect-[9/16] rounded-[24px] overflow-hidden shadow-xl border-2 border-[#f5f5f7] bg-black shrink-0">
              <iframe
                src="https://www.youtube.com/embed/GDEcLegxnxY?rel=0"
                title="Diwali Celebration Short"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="w-full md:max-w-[643px] flex flex-col justify-center text-left">
              <h3 className="apple-title-md md:apple-title-lg text-[#1d1d1f] mb-3 font-semibold">
                Diwali celebration
              </h3>
              <p className="apple-body text-[#1d1d1f] text-base md:text-lg lg:text-[18px] leading-relaxed">
                We celebrate Diwali with people who make this place feel like home, the entire Singh Dental Care Team came together for a day of pure celebration—kicking things off with traditional decor, followed by competitive party games, impromptu dance-offs, and lots of festive treats. Here’s a peek into our office culture, where teamwork and fun go hand in hand.
              </p>
            </div>
          </div>

          {/* Row 2: Republic Day Celebration - Text on Left, Video on Right */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16">
            <div className="w-full md:max-w-[643px] flex flex-col justify-center text-left order-2 md:order-1">
              <h3 className="apple-title-md md:apple-title-lg text-[#1d1d1f] mb-3 font-semibold">                  
                Republic Day celebration                                                                                 
              </h3> 
              <p className="apple-body text-[#1d1d1f] text-base md:text-lg lg:text-[18px] leading-relaxed">
                We honor the dedication that drives us forward. Our 26th January celebrations brought the whole team together in tri-color spirit—unfurling the national flag, sharing inspiring moments of teamwork, and carrying that patriotic energy straight into the care we deliver every single day.
              </p>
            </div>

            <div className="w-full max-w-[300px] sm:w-72 aspect-[9/16] rounded-[24px] overflow-hidden shadow-xl border-2 border-[#f5f5f7] bg-black shrink-0 order-1 md:order-2">
              <iframe
                src="https://www.youtube.com/embed/h-zhGAL2-Rc?rel=0"
                title="Republic Day Celebration Short"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
