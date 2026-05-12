"use client";

import Link from "next/link";

export default function BlogCTA() {
  const openModal = () => {
    window.dispatchEvent(new CustomEvent('open-appointment-modal'));
  };

  return (
    <div className="flex flex-wrap justify-center gap-6">
      <button 
        onClick={openModal}
        className="px-10 py-5 bg-[#0071e3] text-white rounded-full font-bold text-[17px] hover:bg-[#0077ed] transition-all hover:scale-[1.02]"
      >
        Book Appointment Now
      </button>
      <Link href="/locations" className="px-10 py-5 bg-white/10 text-white rounded-full font-bold text-[17px] hover:bg-white/20 transition-all">
        Find Our Clinics
      </Link>
    </div>
  );
}
