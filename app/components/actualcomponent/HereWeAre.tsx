"use client";

import { useState } from "react";

export default function HereWeAre() {
  const branches = [
    {
      name: "100 Feet Branch",
      address: "279, Main, 100 Feet Rd, East Mohan Nagar, Amritsar, Punjab",
      phone: "+91 90561 90567",
      hours: "Mon - Sun: 10:00 AM - 8:00 PM",
      mapUrl: "https://maps.google.com/maps?q=31.6215178,74.8977264+(Singh+Dental+Care)&t=&z=15&ie=UTF8&iwloc=&output=embed",
      directionsUrl: "https://www.google.com/maps/place/Singh+Dental+Care/@31.6377021,74.8897063,5940m/data=!3m1!1e3!4m6!3m5!1s0x39197cb93aaaaaab:0x1c718a343a92cf0d!8m2!3d31.6215178!4d74.8977264!16s%2Fg%2F11bw3drbtw?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D",
      rating: "4.9",
      reviewCount: "500+"
    },
    {
      name: "Circular Road Branch",
      address: "5 AB, First floor, Circular Rd, Opposite print & gift gallery, near Gupta Hospital, Beauty Avenue, Amritsar, Punjab",
      phone: "+91 90561 90567",
      hours: "Mon - Sat: 10:00 AM - 7:00 PM (Sun: Closed)",
      mapUrl: "https://maps.google.com/maps?q=31.6538864,74.8816863+(Singh+Dental+Care)&t=&z=15&ie=UTF8&iwloc=&output=embed",
      directionsUrl: "https://www.google.com/maps/place/Singh+Dental+Care/@31.6538864,74.8466674,5939m/data=!3m1!1e3!4m6!3m5!1s0x39196388b63acbd1:0xb45a18f0ed83d067!8m2!3d31.6538864!4d74.8816863!16s%2Fg%2F11j_0jz7m1?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D",
      rating: "4.8",
      reviewCount: "150+"
    },
    {
      name: "Khalsa College Branch",
      address: "48, Dasmesh Avenue Main GT Road, Khalsa College Rd, Opposite Gate no 2, adjoining Indian Oil Petrol Pump, Amritsar, Punjab 143001",
      phone: "+91 90561 90567",
      hours: "Mon - Sun: 10:00 AM - 7:00 PM",
      mapUrl: "https://maps.google.com/maps?q=31.6315675,74.8344733+(Singh+Dental+Care)&t=&z=15&ie=UTF8&iwloc=&output=embed",
      directionsUrl: "https://www.google.com/maps/place/Singh+Dental+Care/@31.631572,74.8318984,743m/data=!3m2!1e3!4b1!4m6!3m5!1s0x391965dec2fc2b09:0xad3b488f532c6d71!8m2!3d31.6315675!4d74.8344733!16s%2Fg%2F11s7jsy_fr?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D",
      rating: "4.9",
      reviewCount: "200+"
    }
  ];

  const [activeBranch, setActiveBranch] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleBranchChange = (index: number) => {
    if (index !== activeBranch) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveBranch(index);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const currentBranch = branches[activeBranch];

  return (
    <section className="apple-section bg-gradient-to-b from-white to-[#f5f5f7] border-t border-[#e5e5e7]">
      <div className="apple-container-wide">
        {/* Section Header */}
        <div className="text-center max-w-[692px] mx-auto mb-16 px-4">
          <p className="apple-eyebrow text-[#006A7F] font-semibold tracking-[0.15em] uppercase mb-3">Our Presence</p>
          <h2 className="text-3xl md:text-[40px] lg:text-[48px] font-bold tracking-tight text-[#1d1d1f] leading-none mb-6">
            Visit Our Clinics
          </h2>
          <p className="text-[19px] md:text-[21px] font-normal text-[#6e6e73] leading-relaxed">
            With three state-of-the-art dental centers in Amritsar, world-class dental care is always close to you. Choose a branch to view on the map.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Branch Cards List */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-4">
            {branches.map((branch, index) => {
              const isActive = index === activeBranch;
              return (
                <button
                  key={index}
                  onClick={() => handleBranchChange(index)}
                  className={`text-left w-full p-6 rounded-[24px] border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#006A7F]/40 ${
                    isActive
                      ? "bg-white border-[#006A7F] shadow-[0_10px_30px_rgba(0,106,127,0.08)] scale-[1.02]"
                      : "bg-[#f5f5f7] border-transparent hover:bg-[#eaeaea] hover:border-gray-300"
                  }`}
                >
                  <h3 className={`font-semibold text-lg transition-colors mb-3 ${isActive ? "text-[#006A7F]" : "text-[#1d1d1f]"}`}>
                    {branch.name}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-[#515154]">
                    <div className="flex items-start gap-2.5">
                      <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="line-clamp-2">{branch.address}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{branch.phone}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-medium">{branch.hours.split(" (")[0]}</span>
                    <span className="text-[#006A7F] font-semibold flex items-center gap-1 group">
                      View Map
                      <svg className="w-3.5 h-3.5 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Map & Info Card */}
          <div className="col-span-1 lg:col-span-7 flex flex-col">
            <div className="bg-white rounded-[32px] border border-[#e5e5e7] p-5 md:p-8 flex flex-col justify-between h-full shadow-[0_15px_50px_rgba(0,0,0,0.04)]">
              {/* Map Iframe Container */}
              <div className="relative w-full rounded-[24px] overflow-hidden bg-[#f5f5f7] aspect-video md:h-[400px] shadow-inner mb-6">
                <iframe
                  src={currentBranch.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className={`w-full h-full transition-all duration-300 ease-in-out ${
                    isTransitioning ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"
                  }`}
                ></iframe>
              </div>

              {/* Branch Detail & Action Panel */}
              <div className={`space-y-6 transition-all duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="flex items-center gap-1 text-[#FBBC05]">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                      <span className="text-xs font-bold text-[#1d1d1f]">{currentBranch.rating}</span>
                      <span className="text-xs text-gray-500 font-medium">({currentBranch.reviewCount} reviews)</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-[#1d1d1f]">{currentBranch.name}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100 text-sm text-[#1d1d1f]">
                  <div className="flex gap-2.5">
                    <svg className="w-5 h-5 text-[#006A7F] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-xs uppercase tracking-wider text-gray-400 mb-0.5">Address</h4>
                      <p className="leading-relaxed text-[#1d1d1f]">{currentBranch.address}</p>
                    </div>
                  </div>

                  <div className="flex gap-2.5">
                    <svg className="w-5 h-5 text-[#006A7F] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-xs uppercase tracking-wider text-gray-400 mb-0.5">Hours & Contact</h4>
                      <p className="leading-relaxed text-[#1d1d1f]">{currentBranch.hours}</p>
                      <p className="mt-1 font-semibold text-[#006A7F]">{currentBranch.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                  <a
                    href={currentBranch.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-[#006A7F] hover:bg-[#005666] text-white py-2.5 px-4 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md transform active:scale-98 text-center"
                  >
                    <span>Get Directions</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  
                  <a
                    href={`tel:${currentBranch.phone.replace(/\s+/g, "")}`}
                    className="flex items-center justify-center gap-1.5 border border-gray-200 hover:bg-gray-50 text-[#1d1d1f] hover:border-gray-300 py-2.5 px-4 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 transform active:scale-98 text-center"
                  >
                    <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>Call Clinic</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}