import React from 'react';
import Link from 'next/link';

export default function SDCLeaguePage() {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-[220px] pb-[120px] flex flex-col items-center justify-center text-center px-6">
        {/* Creative Background Element - Stylized Cricket Field/Ball concept */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03] pointer-events-none">
            {/* Outer Circle (Field) */}
            <div className="absolute inset-0 border-[2px] border-black rounded-full" />
            {/* Pitch */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[300px] border-[2px] border-black rounded-sm" />
            {/* Inner Circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border-[1px] border-dashed border-black rounded-full" />
        </div>

        <div className="apple-container-narrow relative z-10">
          <p className="apple-eyebrow mb-6 text-[#0071e3] font-semibold tracking-widest uppercase">
            Beyond the Clinic
          </p>
          
          <h1 className="apple-hero-title mb-6 leading-[1.05]">
            Singh Dental Care<br />
            <span className="text-[#1d1d1f]">Cricket League.</span>
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
      </section>

      {/* Feature/Creative Detail Section */}
      <section className="bg-[#f5f5f7] py-[120px]">
        <div className="apple-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center md:text-left space-y-4">
               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mx-auto md:mx-0">
                  <span className="text-2xl">🏏</span>
               </div>
               <h3 className="apple-title-md">The Game</h3>
               <p className="apple-body text-[#6e6e73]">
                 Professional T20 format with a focus on healthy competition and community building.
               </p>
            </div>
            
            <div className="text-center md:text-left space-y-4">
               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mx-auto md:mx-0">
                  <span className="text-2xl">🏆</span>
               </div>
               <h3 className="apple-title-md">The Trophy</h3>
               <p className="apple-body text-[#6e6e73]">
                 Compete for the ultimate prize. Excellence recognized both on the field and off.
               </p>
            </div>

            <div className="text-center md:text-left space-y-4">
               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mx-auto md:mx-0">
                  <span className="text-2xl">🤝</span>
               </div>
               <h3 className="apple-title-md">The Community</h3>
               <p className="apple-body text-[#6e6e73]">
                 A unique platform for dental professionals and enthusiasts to connect and celebrate.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Creative Footer Graphic */}
      <section className="py-[120px] bg-white text-center">
         <div className="apple-container-narrow">
            <h2 className="apple-title-xl mb-8">Ready to play?</h2>
            <div className="relative w-full aspect-[21/9] bg-[#f5f5f7] rounded-[40px] overflow-hidden group">
               {/* Abstract Grass Pattern */}
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-50/30" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[120px] filter blur-[2px] opacity-10 select-none">SDC</span>
               </div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <p className="apple-title-lg text-[#86868b] group-hover:text-[#1d1d1f] transition-colors duration-500">
                    Registration Opening Soon
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* Small Footer Links */}
      <footer className="py-12 border-t border-[#d2d2d7]">
        <div className="apple-container flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="apple-caption text-[#86868b]">
            © 2026 Singh Dental Care League. All rights reserved.
          </p>
          <div className="flex gap-8">
             <Link href="/" className="apple-caption text-[#6e6e73] hover:text-[#0071e3]">Home</Link>
             <Link href="/about" className="apple-caption text-[#6e6e73] hover:text-[#0071e3]">About</Link>
             <Link href="/contact" className="apple-caption text-[#6e6e73] hover:text-[#0071e3]">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
