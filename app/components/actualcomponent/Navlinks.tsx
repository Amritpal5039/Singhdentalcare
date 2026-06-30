"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
// Single static import — all exports share one chunk, not 6 separate dynamic tasks
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/app/components/ui/navigation-menu";

const Ourservices = [
  { 
    label: "Dental Implants & TMJ", 
    href: "/services/dental-implants",
    description: "", 
  },
  { 
    label: "Orthodontic Treatment", 
    href: "/services/orthodontic",
    description: "", 
  },
  { 
    label: "Oral Cancer Screening", 
    href: "/services/oral-cancer",
    description: "", 
  },
  { 
    label: "Dental Crown", 
    href: "/services/dental-crown",
    description: "", 
  },
  { 
    label: "Root Canal Treatment", 
    href: "/services/root-canal",
    description: "", 
  },
  { 
    label: "Teeth Whitening", 
    href: "/services/teeth-whitening",
    description: "", 
  },
];

const plainLinks = [
  { label: "Our Expert", href: "/expert" },
  { label: "Our Locations", href: "/locations" },
  { label: "Blog", href: "/blog" },
  { label: "SDC League", href: "/sdc-league" },
  { label: "Podcast", href: "/podcast" },
  { label: "Become A Member", href: "/become-a-member" },
  { label: "About", href: "/about" },
];

// Apple easing curve
const APPLE_EASE = "cubic-bezier(0.28, 0.11, 0.32, 1)";

// All mobile links — grouped for the sidebar
const mobileLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", isHeader: true },
  ...Ourservices.map(s => ({ label: s.label, href: s.href })),
  ...plainLinks,
];

export default function NavLinks() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  return (
    <>
      {/* ── Desktop Nav ─────────────────────────────────────────── */}
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-0">
            <NavigationMenuItem>
              <NavigationMenuLink asChild className="apple-nav-text opacity-80 hover:opacity-100 transition-opacity whitespace-nowrap px-3 cursor-pointer">
                <Link href="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="apple-nav-text opacity-80 hover:opacity-100 transition-opacity whitespace-nowrap px-3">Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-1 p-3 md:w-[500px] md:grid-cols-2">
                  {Ourservices.map((service) => (
                    <li key={service.href}>
                      <NavigationMenuLink asChild>
                        <Link href={service.href} className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-[13px] font-medium leading-none whitespace-nowrap">{service.label}</div>
                          <p className="line-clamp-1 text-[11px] leading-snug text-muted-foreground">
                            {service.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {plainLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink asChild className="apple-nav-text opacity-80 hover:opacity-100 transition-opacity whitespace-nowrap px-3 cursor-pointer">
                  <Link href={link.href}>
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* ── Hamburger Button (mobile only) — 3 lines ──────────────────────── */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Open menu"
          className="relative z-[1100] w-9 h-9 flex flex-col justify-center items-center bg-transparent border-none outline-none"
          style={{
            opacity: sidebarOpen ? 0 : 1,
            pointerEvents: sidebarOpen ? "none" : "auto",
            transition: `opacity 0.2s ${APPLE_EASE}`,
          }}
        >
          {/* Top line */}
          <span
            className="block w-[20px] bg-black rounded-full"
            style={{
              height: "1.5px",
              transform: "translateY(-4px)",
            }}
          />
          {/* Middle line */}
          <span
            className="block w-[20px] bg-black rounded-full"
            style={{
              height: "1.5px",
            }}
          />
          {/* Bottom line */}
          <span
            className="block w-[20px] bg-black rounded-full"
            style={{
              height: "1.5px",
              transform: "translateY(4px)",
            }}
          />
        </button>
      </div>

      {/* ── Mobile Sidebar Overlay (Apple Style) — rendered via Portal to escape navbar stacking context ── */}
      {typeof document !== "undefined" && createPortal(
        <div
          className="md:hidden"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            pointerEvents: sidebarOpen ? "auto" : "none",
          }}
        >
          {/* Solid white background */}
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "#ffffff",
              transition: `opacity 0.4s ${APPLE_EASE}`,
              opacity: sidebarOpen ? 1 : 0,
              cursor: "pointer",
            }}
          />

          {/* Dedicated Close Button */}
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
            style={{
              position: "absolute",
              top: "16px",
              right: "18px",
              zIndex: 10,
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              border: "none",
              cursor: "pointer",
              transition: `opacity 0.3s ${APPLE_EASE}, transform 0.3s ${APPLE_EASE}`,
              opacity: sidebarOpen ? 1 : 0,
              transform: sidebarOpen ? "scale(1)" : "scale(0.8)",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1d1d1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Scrollable nav content */}
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: "relative",
              zIndex: 1,
              height: "100%",
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
              paddingTop: "90px",
              paddingBottom: "40px",
              transition: `opacity 0.4s ${APPLE_EASE}, transform 0.5s ${APPLE_EASE}`,
              opacity: sidebarOpen ? 1 : 0,
              transform: sidebarOpen ? "translateY(0)" : "translateY(-20px)",
            }}
          >
            <nav className="px-8 sm:px-12">
              <ul className="flex flex-col">
                {mobileLinks.map((link, i) => (
                  <li
                    key={link.href + i}
                    style={{
                      borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
                      transition: `opacity 0.5s ${APPLE_EASE}, transform 0.5s ${APPLE_EASE}`,
                      transitionDelay: sidebarOpen ? `${i * 50}ms` : "0ms",
                      opacity: sidebarOpen ? 1 : 0,
                      transform: sidebarOpen ? "translateY(0)" : "translateY(12px)",
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSidebarOpen(false);
                      }}
                      className="inline-block py-[12px] w-fit"
                      style={{
                        fontSize: "20px",
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                        color: "#1d1d1f",
                        textDecoration: "none",
                        transition: `color 0.2s ${APPLE_EASE}`,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#6e6e73")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#1d1d1f")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <div
                style={{
                  marginTop: "32px",
                  transition: `opacity 0.6s ${APPLE_EASE}, transform 0.6s ${APPLE_EASE}`,
                  transitionDelay: sidebarOpen ? `${mobileLinks.length * 50 + 100}ms` : "0ms",
                  opacity: sidebarOpen ? 1 : 0,
                  transform: sidebarOpen ? "translateY(0)" : "translateY(12px)",
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSidebarOpen(false);
                    window.dispatchEvent(new CustomEvent('open-appointment-modal'));
                  }}
                  className="w-full text-center py-4 rounded-xl font-medium text-lg text-white"
                  style={{
                    backgroundColor: "#006A7F",
                    transition: `background-color 0.2s ${APPLE_EASE}`,
                    boxShadow: "0 4px 14px rgba(0, 106, 127, 0.25)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#005566")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#006A7F")}
                >
                  Book an Appointment
                </button>
              </div>
            </nav>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
