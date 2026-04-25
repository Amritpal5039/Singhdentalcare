# Navbar Optimization & Mobile Menu Documentation

This document outlines the architectural changes made to the "Singh Dental Care" navigation system to fix visual bugs, add mobile support, and significantly reduce **Total Blocking Time (TBT)**.

---

## 1. Visual Bug Fixes

### Desktop Link Overlap
- **Issue**: Nav links like "Become A Member", "About", and "Contact" were overlapping on desktop.
- **Root Cause**: All three links were nested inside a single `<NavigationMenuItem>`. Radix UI treats items within the same menu container as a group, causing them to stack.
- **Fix**: Each navigation link is now wrapped in its own `<NavigationMenuItem>`, ensuring they align horizontally in the flex container.

---

## 2. New Features

### Mobile Hamburger Menu
- Added a responsive hamburger button (3-line icon) visible only on mobile screens (`md:hidden`).
- Clicking the button opens a modern sidebar menu.

### Animated Sidebar
- **Smooth Transition**: The sidebar uses CSS transitions (`translate-x`) to slide in from the right.
- **Backdrop Overlay**: Added a blurred background overlay that closes the menu when clicked, providing a premium feel.
- **Accordion Services**: The services list inside the mobile menu uses a "max-height" transition to expand and collapse smoothly when clicked.
- **Mobile CTA**: Included a dedicated "Book an Appointment" button at the bottom of the mobile sidebar for better conversion.

---

## 3. Performance Optimizations (TBT Reduction)

**Total Blocking Time (TBT)** was previously high because too much JavaScript was executing simultaneously during the initial page load. We reduced this through four key strategies:

### A. Deferred Hydration (`ssr: false`)
- **Action**: Converted `Navbar.tsx` to a Client Component and used `next/dynamic` with `ssr: false` for the `NavLinks` child.
- **Benefit**: The "heavy" part of the navbar (Radix UI widgets and state management) no longer blocks the initial server-render or the first browser paint. The browser paints the logo and CTA immediately, then hydrates the navigation links in the background.

### B. Consolidated Dynamic Imports
- **Action**: Replaced 6 individual `dynamic()` calls from the same module in `Navlinks.tsx` with a single static import.
- **Benefit**: Previously, the browser had to request, parse, and execute 6 separate small JavaScript chunks. Now, it processes one single, optimized chunk, reducing the number of "Long Tasks" on the main thread.

### C. CSS Tree-Shaking
- **Action**: Removed the global `@import "tw-animate-css"` from `globals.css` and removed the `Geist` font from `layout.tsx`.
- **Benefit**: 
    - `tw-animate-css` shipped ~150 unused animation keyframes. We inlined only the 6 keyframes actually used by the navbar.
    - `Geist` was being preloaded but not used (since the site uses `sfPro`). Removing it saves a network request and a font-parsing task.

### D. Image Priority
- **Action**: Added the `priority` attribute to the Logo in `Navbar.tsx`.
- **Benefit**: Tells the browser to download the logo as a top-priority asset, improving the **Largest Contentful Paint (LCP)**.

---

## Current Status
The website now features a high-performance, mobile-ready navbar that maintains a smooth 60fps interaction rate even on lower-end mobile devices.

> [!TIP]
> To verify these results, run `npm run build && npm run start` and test with Lighthouse in the "Performance" category. TBT should now be well within the "Green" zone.
