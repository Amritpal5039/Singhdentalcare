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
    <nav className="relative z-[100] flex justify-between items-center px-5 lg:px-16 py-3 min-h-[80px] w-full bg-white">
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
  <button className="px-2 py-2 h-auto w-full rounded-lg bg-[#006A7F] text-white font-medium transition-shadow duration-200 shadow-[-4px_-4px_10px_0px_#ffffff,4px_4px_10px_0px_#E5DFC9] active:shadow-[inset_4px_4px_10px_0px_#005566,inset_-4px_-4px_10px_0px_#007F98] buttoncss ">
    Book an Appointment
  </button>
</div>
    </nav>
  );
}
