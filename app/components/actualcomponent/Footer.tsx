"use client"
import { useState, useEffect } from "react";
import Link from "next/link";

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
      { label: "Blogs", href: "/blog" },
      { label: "SDC Culture", href: "/sdc-league" },
      { label: "Our Experts", href: "/expert" },
      { label: "Our Locations", href: "/locations" },
      { label: "Our Services", href: "/Our-services" },
    ],
  },
  {
    heading: "About",
    items: [
      { label: "About Us", href: "/about" },
    ],
  },
  {
    heading: "Support",
    items: [
      { label: "Contact Us", href: "/contact" },
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
      className="h-11 md:h-14 w-auto object-contain"
    />
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Footer() {
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [currentYear, setCurrentYear] = useState<number>(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleSubmit = () => {
    if (!email.trim() || !email.includes("@")) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="w-full bg-[#f5f5f7] pt-16 pb-12">
      <div className="apple-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          <div className="lg:col-span-2">
            <a href="/" className="inline-block mb-6">
              <NietzscheLogo />
            </a>
            <p className="apple-body !text-[#6e6e73] mb-6">
              Sign up to receive health tips and world-class dental innovation updates.
            </p>
            {submitted ? (
              <p className="apple-body !text-[#1d1d1f]">Thanks for subscribing! ✓</p>
            ) : (
              <div className="flex bg-white rounded-full p-1 border border-[#d2d2d7] focus-within:ring-2 focus-within:ring-[#0071e3] transition-all">
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 bg-transparent px-4 py-2 outline-none apple-nav-text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={handleSubmit}
                  className="bg-[#1d1d1f] text-white px-6 py-2 rounded-full apple-nav-text font-medium hover:bg-[#323232] transition-colors"
                >
                  Submit
                </button>
              </div>
            )}
          </div>

          {NAV_COLUMNS.map((col) => (
            <div key={col.heading} className="flex flex-col">
              <h4 className="apple-nav-text font-semibold text-[#1d1d1f] mb-4">{col.heading}</h4>
              <ul className="space-y-2">
                {col.items.map((item) => {
                  const isExternal = item.href.startsWith("http") || item.href === "#";
                  return (
                    <li key={item.label}>
                      {isExternal ? (
                        <a
                          href={item.href}
                          className="apple-nav-text text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className="apple-nav-text text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#d2d2d7] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="apple-caption !text-[#86868b]">
            © {currentYear} Singh Dental Care. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="apple-caption !text-[#86868b] hover:underline">Privacy Policy</a>
            <a href="#" className="apple-caption !text-[#86868b] hover:underline">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}