"use client";
import { Suspense} from "react";
import Image from "next/image";
import Link from "next/link";
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
    <nav className="sticky top-0 z-[100] w-full bg-white/85 backdrop-blur-[20px] border-b border-black/[0.05]">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-[22px] h-[72px] lg:h-[80px] relative">
      {/* Logo Container */}
      <div className="flex-shrink-0 flex items-center lg:absolute lg:left-[22px] lg:top-1/2 lg:-translate-y-1/2">
        <Link href="/">
          <Image
            src="https://res.cloudinary.com/dkh75izoh/image/upload/v1777103371/with_less_space_krwfd4.png"
            alt="Singh Dental Care logo"
            width={200}
            height={80}
            className="h-[46px] lg:h-[54px] w-auto"
            style={{ width: "auto" }}
            priority
          />
        </Link>
      </div>

      {/* Nav links area */}
      <div className="flex-1 flex justify-end lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:justify-center lg:items-center">
        <NavLinks />
      </div>

      {/* Book an Appointment CTA area */}
      <div className="hidden lg:flex lg:absolute lg:right-[22px] lg:top-1/2 lg:-translate-y-1/2 items-center">
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('open-appointment-modal'))}
          className="apple-btn-primary !text-[14px] !py-[8px] !px-[16px]"
        >
          Book Appointment
        </button>
      </div>
      </div>
    </nav>
  );
}
