"use client";

import { useState } from "react";
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
const Ourservices=[
 { label: "Dental Implants & TMJ", href: "/services/dental-implants",
    description: "High-quality bristles for sensitive gums.", },
  { label: "Orthodontic Treatment", href: "/services/orthodontic",
    description: "High-quality bristles for sensitive gums.", },
  { label: "Oral Cancer Screening", href: "/services/oral-cancer",
    description: "High-quality bristles for sensitive gums.", },
  { label: "Dental Crown", href: "/services/dental-crown",
    description: "High-quality bristles for sensitive gums.", },
  { label: "Root Canal Treatment", href: "/services/root-canal",
    description: "High-quality bristles for sensitive gums.", },
  { label: "Teeth Whitening", href: "/services/teeth-whitening",
    description: "High-quality bristles for sensitive gums.", },
];
const Ourproducts = [
  {
    title: "Singh Dental Care Toothbrush",
    href: "/products/tooth-brush",
    description: "High-quality bristles for sensitive gums.",
  },
  {
    title: "Singh Dental Care Mouthwash",
    href: "/products/mouthwash",
    description: "Alcohol-free formula for long-lasting freshness.",
  },
];

const plainLinks = [
  { label: "Our Expert", href: "/expert" },
  { label: "Our Locations", href: "/locations" },
  { label: "Blog", href: "/blog" },
  { label: "SDC League", href: "/sdc-league" },
  { label: "Franchise", href: "/franchise" },
  { label: "Podcast", href: "/podcast" },
  { label: "Become A Member", href: "/become-a-member" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function NavLinks() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

            <NavigationMenuItem>
              <NavigationMenuTrigger className="apple-nav-text opacity-80 hover:opacity-100 transition-opacity whitespace-nowrap px-3">Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-1 p-3 md:w-[500px] md:grid-cols-2">
                  {Ourproducts.map((product) => (
                    <li key={product.href}>
                      <NavigationMenuLink asChild>
                        <Link href={product.href} className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-[13px] font-medium leading-none whitespace-nowrap">{product.title}</div>
                          <p className="line-clamp-1 text-[11px] leading-snug text-muted-foreground">
                            {product.description}
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

      {/* ── Hamburger Button (mobile only) ──────────────────────── */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          className="relative z-[1100] w-8 h-8 flex flex-col justify-center items-center group bg-transparent border-none outline-none"
        >
          <div className="w-5 h-[1.2px] bg-black transition-all duration-300 ease-apple" 
            style={{ 
              transform: sidebarOpen ? 'rotate(45deg) translateY(0)' : 'translateY(-3px)' 
            }} 
          />
          <div className="w-5 h-[1.2px] bg-black transition-all duration-300 ease-apple" 
            style={{ 
              transform: sidebarOpen ? 'rotate(-45deg) translateY(0)' : 'translateY(3px)' 
            }} 
          />
        </button>
      </div>

      {/* ── Mobile Sidebar Overlay (Apple Style) ───────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[1000] bg-white transition-all duration-500 ease-apple md:hidden ${
          sidebarOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full">
          <nav className="flex-1 px-10 pt-24 overflow-y-auto">
            <ul className="flex flex-col gap-6">
              {[
                { label: "Home", href: "/" },
                ...Ourservices,
                ...Ourproducts.map(p => ({ label: p.title, href: p.href })),
                ...plainLinks
              ].map((link, i) => (
                <li 
                  key={link.href + i}
                  className={`transition-all duration-700 ease-apple ${
                    sidebarOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${sidebarOpen ? i * 40 : 0}ms` }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setSidebarOpen(false)}
                    className="text-[26px] font-semibold text-black hover:text-gray-500 transition-colors block py-1 whitespace-nowrap tracking-tight"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className={`mt-12 mb-20 transition-all duration-700 ease-apple ${
              sidebarOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: '500ms' }}>
               <Link
                href="/appointment"
                onClick={() => setSidebarOpen(false)}
                className="inline-block bg-[#006A7F] text-white px-8 py-3.5 rounded-full font-medium text-lg hover:bg-[#005566] transition-all whitespace-nowrap shadow-lg shadow-[#006A7F]/20"
              >
                Book an Appointment
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}