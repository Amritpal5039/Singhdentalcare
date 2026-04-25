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
} from "@/components/ui/navigation-menu";
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
  { label: "Franchise", href: "/franchise" },
  { label: "Become A Member", href: "/become-a-member" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function NavLinks() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <div className="animate-enter">
      {/* ── Desktop Nav ─────────────────────────────────────────── */}
      <div className="hidden md:block ">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="/">Home</NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2">
                  {Ourservices.map((service) => (
                    <li key={service.href}>
                      <NavigationMenuLink href={service.href} className="block select-none space-y-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">{service.label}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {service.description}
                        </p>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Our Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2">
                  {Ourproducts.map((product) => (
                    <li key={product.href}>
                      <NavigationMenuLink href={product.href} className="block select-none space-y-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">{product.title}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {product.description}
                        </p>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {plainLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink href={link.href}>
                  {link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* ── Hamburger Button (mobile only) ──────────────────────── */}
      <button
        onClick={() => setSidebarOpen(true)}
        aria-label="Open menu"
        className="md:hidden flex flex-col justify-center items-center gap-[5px] w-9 h-9 rounded-md hover:bg-gray-100 transition-colors"
      >
        <span className="block w-5 h-[2px] bg-gray-800 rounded-full" />
        <span className="block w-5 h-[2px] bg-gray-800 rounded-full" />
        <span className="block w-5 h-[2px] bg-gray-800 rounded-full" />
      </button>

      {/* ── Mobile Sidebar Overlay ───────────────────────────────── */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <span className="text-lg font-semibold text-gray-800">Menu</span>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
          <Link
            href="/"
            onClick={() => setSidebarOpen(false)}
            className="block px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors"
          >
            Home
          </Link>

          {/* Services accordion */}
          <div>
            <button
              onClick={() => setServicesOpen((v) => !v)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              Services
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  servicesOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                servicesOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <ul className="ml-4 mt-1 space-y-1 border-l-2 border-blue-100 pl-3">
                {Ourservices.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      onClick={() => setSidebarOpen(false)}
                      className="block px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Products accordion */}
          <div>
            <button
              onClick={() => setProductsOpen((v) => !v)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              Our Products
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  productsOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                productsOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <ul className="ml-4 mt-1 space-y-1 border-l-2 border-blue-100 pl-3">
                {Ourproducts.map((p) => (
                  <li key={p.href}>
                    <Link
                      href={p.href}
                      onClick={() => setSidebarOpen(false)}
                      className="block px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {plainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setSidebarOpen(false)}
              className="block px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Footer CTA */}
        <div className="px-4 pb-6 pt-3 border-t border-gray-100">
          <Link
            href="/appointment"
            onClick={() => setSidebarOpen(false)}
            className="block w-full text-center bg-black text-white px-4 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
          >
            Book an Appointment
          </Link>
        </div>
      </aside>
    </div>
  );
}