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
      <div className="max-w-[980px] mx-auto flex items-center px-[22px] h-[64px] md:h-[52px]">
      {/* Logo Container — fixed width so center stays balanced */}
      <div className="flex-shrink-0 w-[100px] md:w-[120px]">
        <Link href="/">
          <Image
            src="https://res.cloudinary.com/dkh75izoh/image/upload/v1777103371/with_less_space_krwfd4.png"
            alt="Singh Dental Care logo"
            width={120}
            height={48}
            style={{ height: "36px", width: "auto" }}
            priority
          />
        </Link>
      </div>

      {/* Nav links area — flex-1 centers the nav in the remaining space */}
      <div className="flex-1 flex justify-end md:justify-center">
        <NavLinks />
      </div>

      {/* Book an Appointment CTA area — same fixed width as logo for balance */}
      <div className="hidden md:flex justify-end flex-shrink-0 w-[130px]">
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('open-appointment-modal'))}
          className="apple-btn-primary !text-[12px] !py-[4px] !px-[12px]"
        >
          Book Appointment
        </button>
      </div>
      </div>
    </nav>
  );
}
