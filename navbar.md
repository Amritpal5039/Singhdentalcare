# Navbar Design System & Specifications

This document outlines the detailed styling, typography, and animation logic implemented for the Singh Dental Care Navbar, following the Apple-inspired "Premium Tech" aesthetic.

## 1. Global Navbar Container (Navbar.tsx)
*   **Positioning:** `sticky top-0` (Locks to top on scroll).
*   **Layering:** `z-[100]` (Ensures it stays above all page content).
*   **Background:** `bg-white/80` (80% opacity for glass effect).
*   **Effect:** `backdrop-blur-md` (Blurs content moving underneath).
*   **Border:** `border-b border-black/[0.03]` (Ultra-subtle hairline bottom border).
*   **Width:** `max-w-[1100px] mx-auto` (Centered content column).
*   **Padding:** `px-6 sm:px-4` (Responsive horizontal gutters).

---

## 2. Desktop View (md:block)

### Typography & Links
*   **Font Size:** `text-[12px]` (Compact, premium scale).
*   **Font Weight:** `font-normal`.
*   **Text Wrap:** `whitespace-nowrap` (Forces links onto a single line).
*   **Color:** Base `black` with `hover:text-gray-500`.
*   **Spacing:** 
    *   **Gap:** `gap-0` (Tight, technical spacing).
    *   **Internal Padding:** `px-1.5 py-1` (Ensures links are clickable but close together).

### Navigation Menu (Shadcn UI Based)
*   **Trigger:** Includes a small chevron icon.
*   **Content (Dropdowns):**
    *   **Grid:** `grid-cols-2` for Services/Products.
    *   **Dropdown Width:** `w-[400px]` scaling to `md:w-[500px]`.
    *   **Hover State:** `hover:bg-accent` (Subtle light grey highlight).

### CTA Button (Book Appointment)
*   **Typography:** `text-[13px] font-sfpro`.
*   **Background:** `#006A7F` (Signature Teal).
*   **Shape:** `rounded-lg`.
*   **Shadow:** `shadow-[-4px_-4px_10px_0px_#ffffff,4px_4px_10px_0px_#E5DFC9]` (Neumorphic floating effect).

---

## 3. Mobile View (md:hidden)

### Hamburger Button
*   **Structure:** 2-line custom SVG-like CSS bars.
*   **Line Thickness:** `1.2px`.
*   **Animations:**
    *   **Open:** Top line rotates `45deg`, bottom line rotates `-45deg`.
    *   **Transition:** `duration-300 ease-apple` (Custom Apple cubic-bezier).
*   **Z-Index:** `z-[1100]` (highest priority).

### Full-Screen Overlay
*   **Position:** `fixed inset-0` (Covers entire viewport).
*   **Background:** `bg-white` (Solid white for clarity).
*   **Animation:** `translate-y` transition (Slides from top).
*   **Z-Index:** `z-[1000]`.

### Mobile Link Typography
*   **Font Size:** `text-[26px]` (Large, readable header style).
*   **Font Weight:** `font-semibold`.
*   **Tracking:** `tracking-tight` (Reduced letter spacing for high-end look).
*   **Entrance Animation:** 
    *   **Effect:** Fade in + Slide up from `translate-y-4`.
    *   **Stagger:** `i * 40ms` (Each link appears slightly after the previous one).
    *   **Easing:** `ease-apple` (Smooth, weighted deceleration).

---

## 4. Custom Animation Constants (globals.css)
*   **Transition Timing:** `cubic-bezier(0.28, 0.11, 0.32, 1)` (The "Apple" Ease).
*   **Utility Class:** `animate-enter` used for initial component fade-in.
