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
        
        <p className="apple-subtitle mb-10 max-w-[600px] mx-auto text-[#6e6e73]">
          Precision on the pitch, just like in our practice. 
          The most awaited dental community sports event is warming up.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="px-8 py-4 bg-[#f5f5f7] rounded-full">
            <span className="apple-body !font-semibold text-[#1d1d1f]">Coming Soon — Summer 2026</span>
          </div>
          <Link href="/contact" className="apple-btn-primary">
            Stay Notified
          </Link>
        </div>
      </div>
    </main>
  );
}
