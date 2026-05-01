"use client"
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  href: string;
}

interface NavColumn {
  heading: string;
  items: NavItem[];
}

// ─── Static data ──────────────────────────────────────────────────────────────

const NAV_COLUMNS: NavColumn[] = [
  {
    heading: "Care Plans",
    items: [
      { label: "Standard Plan", href: "https://pages.razorpay.com/stores/singhdentalcare" },
      { label: "Premium Plan", href: "https://pages.razorpay.com/stores/singhdentalcare" },
    ],
  },
  {
    heading: "Learn",
    items: [
      { label: "Blogs", href: "#" },
      { label: "Singh Dental Super League", href: "#" },
      { label: "Our Experts", href: "#" },
      { label: "Franchise", href: "#" },
      { label: "Our Locations", href: "#" },
      { label: "Our Products", href: "#" },
      { label: "Our Services", href: "#" },
    ],
  },
  {
    heading: "About",
    items: [
      { label: "About Us", href: "#" },
    ],
  },
  {
    heading: "Support",
    items: [
      { label: "FAQ's", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  },
  {
    heading: "Legal",
    items: [
      { label: "Terms & Conditions", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
];

// ─── Logo SVG (inline, no next/image dependency) ──────────────────────────────

function NietzscheLogo() {
  return (
    <img
      src="https://res.cloudinary.com/dkh75izoh/image/upload/v1777103371/with_less_space_krwfd4.png"
      alt="Nietzsche"
      className="h-7 w-auto object-contain"
    />
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Footer() {
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = () => {
    if (!email.trim() || !email.includes("@")) return;
    console.log("Subscribing:", email);
    setSubmitted(true);
    setEmail("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <footer
      className="w-full max-w-[1200px] mx-auto px-6 pb-10 sm:px-4 sm:pb-8 mt-16"
      aria-label="Site footer"
      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" }}
    >
      <div className="bg-[#f5f5f7] rounded-[28px] overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_32px_rgba(0,0,0,0.07),0_0_0_0.5px_rgba(0,0,0,0.06)] sm:rounded-[20px]">

        {/* ── Main body ──────────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:gap-12 lg:items-start p-8 lg:p-12 lg:pb-10 gap-10">

          {/* ── LEFT COLUMN: Logo + newsletter ─────────────────────────── */}
          <div className="flex flex-col gap-5 lg:min-w-[260px] lg:max-w-[280px]">
            {/* Logo */}
            <a href="/" className="inline-flex items-center no-underline" aria-label="Nietzsche home">
              <NietzscheLogo />
            </a>

            {/* Newsletter block */}
            <div className="flex flex-col gap-3">
              <p className="text-sm font-normal text-[#6e6e73] leading-6 tracking-[-0.14px]">
                Sign up to receive health tips.
              </p>

              {submitted ? (
                <p className="text-sm font-medium text-[#1d1d1f] tracking-[-0.14px] py-3">
                  Thanks for subscribing! ✓
                </p>
              ) : (
                <div
                  className="flex rounded-full border border-black/10 bg-white overflow-hidden transition-shadow duration-200 focus-within:shadow-[0_0_0_3px_rgba(0,102,204,0.22)] focus-within:border-transparent"
                  role="group"
                  aria-label="Email subscription"
                >
                  <input
                    type="email"
                    className="flex-1 min-w-0 px-4 py-[10px] text-sm text-[#1d1d1f] bg-transparent border-none outline-none tracking-[-0.14px] placeholder:text-[#aeaeb2]"
                    placeholder="Enter your email"
                    aria-label="Email address"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <button
                    className="bg-[#1d1d1f] text-white border-none px-4 py-[8px] text-[13px] font-medium cursor-pointer rounded-full m-[3px] tracking-[-0.14px] whitespace-nowrap transition-all duration-150 hover:bg-[#3a3a3c] active:scale-[0.96]"
                    type="button"
                    onClick={handleSubmit}
                    aria-label="Subscribe"
                  >
                    Submit
                  </button>
                </div>
              )}

              <p className="text-[11px] text-[#aeaeb2] leading-5 tracking-[-0.08px]">
                By subscribing you agree with our{" "}
                <a href="#" className="text-[#0066cc] no-underline hover:underline">
                  Privacy Policy
                </a>{" "}
                and provide consent to receive updates from our company.
              </p>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Nav columns ───────────────────────────────── */}
          <nav
            className="grid grid-cols-2 gap-y-8 gap-x-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-4 lg:gap-y-0 flex-1"
            aria-label="Footer navigation"
          >
            {NAV_COLUMNS.map((col) => (
              <div key={col.heading} className="flex flex-col">
                <span className="text-[13px] font-semibold text-[#1d1d1f] tracking-[-0.14px] mb-[14px] block">
                  {col.heading}
                </span>
                <ul className="list-none p-0 m-0 flex flex-col gap-[10px]">
                  {col.items.map((item) => (
                    <li key={item.href + item.label}>
                      <a
                        href={item.href}
                        className="text-[13px] font-normal text-[#6e6e73] no-underline tracking-[-0.12px] leading-[1.4] inline-block relative transition-colors duration-150 hover:text-[#1d1d1f]
                          after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-0 after:h-[0.5px] after:bg-[#6e6e73] after:transition-all after:duration-200 hover:after:w-full hover:after:bg-[#1d1d1f]"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────────────── */}
        <div className="border-t border-t-[0.5px] border-black/10 px-8 lg:px-12 py-[18px] flex items-center justify-center sm:py-4">
          <p className="text-[12px] text-[#aeaeb2] tracking-[-0.1px] text-center">
            © {new Date().getFullYear()} Singh Dental Care. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}