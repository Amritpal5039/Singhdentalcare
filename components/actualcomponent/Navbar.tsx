"use client";
import { Suspense} from "react";
import Image from "next/image";

import dynamic from "next/dynamic";

// Defer NavLinks hydration to after paint — Radix + useState not needed for initial render
const NavLinks = dynamic(() => import("./Navlinks"), { 
  ssr: false,
  loading: () => (
    <div className="flex-1 flex justify-center items-center h-10">
      <p className="font-sfpro text-gray-500 animate-pulse font-medium whitespace-nowrap hidden md:block">
        Welcome to Singh Dental Care
      </p>
    </div>
  )
});

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-5 lg:px-15 py-3 min-h-[80px]">
      {/* Logo Container - fixed width to prevent shift */}
      <div className="w-[120px] flex-shrink-0">
        <Image
          src="https://res.cloudinary.com/dkh75izoh/image/upload/v1777103371/with_less_space_krwfd4.png"
          alt="Singh Dental Care logo"
          width={100}
          height={68}
          style={{ height: "auto", width: "100px" }}
          priority
        />
      </div>

      {/* Nav links area - takes up remaining space.
          Mobile: justify-end (hamburger to the right)
          Desktop: justify-center (links centered) */}
      <div className="flex-1 flex justify-end md:justify-center mx-4">
        <NavLinks />
      </div>

      {/* Book an Appointment CTA area - fixed width to match logo side for balance */}
      <div className="w-[180px] hidden md:flex justify-end flex-shrink-0">
        <button className="bg-black text-white px-5 py-2.5 rounded-full font-semibold hover:bg-gray-800 transition-all active:scale-95 text-sm whitespace-nowrap">
          Book an Appointment
        </button>
      </div>
    </nav>
  );
}
