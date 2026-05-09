# Apple Design System — Complete Reference Guide

> Keep this file open while building. Every decision you need is here.
> Pair with `apple-design-system.css` — all classes mentioned below are already built.

---

## Table of Contents

1. [Font Setup](#1-font-setup)
2. [Typography Scale](#2-typography-scale)
3. [Letter Spacing Rules](#3-letter-spacing-rules)
4. [Font Weights](#4-font-weights)
5. [Line Heights](#5-line-heights)
6. [Color System](#6-color-system)
7. [Container Widths](#7-container-widths)
8. [Section Spacing](#8-section-spacing)
9. [Component Spacing](#9-component-spacing)
10. [Navbar](#10-navbar)
11. [Hero Section](#11-hero-section)
12. [Product Cards](#12-product-cards)
13. [Feature Grid](#13-feature-grid)
14. [Buttons](#14-buttons)
15. [Footer](#15-footer)
16. [Responsive Rules](#16-responsive-rules)
17. [Common Mistakes](#17-common-mistakes)
18. [Copy-Paste HTML Templates](#18-copy-paste-html-templates)

---

## 1. Font Setup

Apple uses **SF Pro** — but it is licensed and cannot be used on websites.
The correct free replacement is **Inter**. It matches SF Pro's proportions almost exactly.

### Add to your HTML `<head>`

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="apple-design-system.css">
```

### Add to your Next.js project

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

### CSS font stack (already in the CSS file)

```css
font-family: 'Inter', -apple-system, 'SF Pro Display', BlinkMacSystemFont,
             'Helvetica Neue', Arial, sans-serif;
```

> **Why this order?** On Apple devices, `-apple-system` loads SF Pro natively.
> On all other devices, Inter loads. Best of both worlds.

---

## 2. Typography Scale

Use the CSS class OR copy the raw values. Never invent your own sizes.

| Role | Class | Size | Weight | Tracking | Line Height |
|------|-------|------|--------|----------|-------------|
| Hero headline | `.apple-hero-title` | 80px | 600 | -0.025em | 1.04 |
| Display | `.apple-display` | 64px | 600 | -0.025em | 1.04 |
| Section title XL | `.apple-title-xl` | 48px | 600 | -0.020em | 1.10 |
| Section title LG | `.apple-title-lg` | 32px | 600 | -0.015em | 1.10 |
| Card title | `.apple-title-md` | 24px | 600 | -0.010em | 1.10 |
| Hero subtitle | `.apple-subtitle` | 21px | 400 | 0 | 1.35 |
| Body text | `.apple-body` | 17px | 400 | 0 | 1.47 |
| Caption | `.apple-caption` | 14px | 400 | 0 | 1.43 |
| Nav / footer | `.apple-nav-text` | 13px | 400 | 0 | 1.33 |
| Eyebrow / label | `.apple-eyebrow` | 12px | 400 | 0 | 1.33 |

### Rules

- Use **maximum 4 font sizes** per page. More = visual chaos.
- Heading sizes scale down automatically on mobile via CSS variables.
- Never set font sizes in pixels directly — use the CSS variables or classes.

---

## 3. Letter Spacing Rules

This is the #1 thing that makes headlines look "Apple-quality" vs generic.

| Font Size | Tracking Value | CSS Variable |
|-----------|---------------|--------------|
| 64px–80px (hero) | `-0.025em` | `--apple-tracking-hero` |
| 48px (display) | `-0.020em` | `--apple-tracking-display` |
| 32px (title XL) | `-0.015em` | `--apple-tracking-title-xl` |
| 24px (title MD) | `-0.010em` | `--apple-tracking-title-md` |
| 17px (body) | `0` | `--apple-tracking-body` |
| 13px (nav) | `0` | `--apple-tracking-nav` |

### The rule to remember

> **Bigger text = more negative tracking. Smaller text = zero tracking.**

Negative tracking compresses letters together, making large display text look
intentional and designed — like a headline, not an accident.

```css
/* Right */
h1 { font-size: 64px; letter-spacing: -0.025em; }

/* Wrong — looks like default browser rendering */
h1 { font-size: 64px; letter-spacing: 0; }
```

---

## 4. Font Weights

Apple uses **only 3 weights** on their website. Stick to these.

| Weight | Value | Use for |
|--------|-------|---------|
| Regular | `400` | Body text, subtitles, nav links, captions, button labels |
| Medium | `500` | Rarely used. Feature labels, minor emphasis |
| Semibold | `600` | ALL headings — hero, section titles, card titles |

### What Apple never uses

- `100` Thin — too weak, fails accessibility contrast
- `300` Light — feels fragile on screen
- `700` Bold — too aggressive for Apple's refined tone
- `900` Black — never

```css
/* Right */
h1 { font-weight: 600; }
p  { font-weight: 400; }

/* Wrong */
h1 { font-weight: 700; }  /* too heavy */
p  { font-weight: 300; }  /* too light */
```

---

## 5. Line Heights

| Role | Line Height | Reasoning |
|------|------------|-----------|
| Hero / display (64px+) | `1.04` | Very tight — dense, confident |
| Section titles (32–48px) | `1.10` | Tight but readable |
| Subtitles (21px) | `1.35` | Medium — comfortable |
| Body text (17px) | `1.47` | Relaxed — easy to read paragraphs |
| Captions (14px) | `1.43` | Similar to body |
| Nav / labels (12–13px) | `1.33` | Compact |

### The pattern

Tight line height on big text (`1.04`). Relaxed line height on small text (`1.47`).
This is the opposite of what most beginners do.

---

## 6. Color System

Apple's entire website uses only these colors. Add nothing else.

### Text colors

```css
--apple-text-primary:   #1d1d1f   /* Headings — NOT pure black #000000 */
--apple-text-secondary: #6e6e73   /* Subtitles, descriptions */
--apple-text-caption:   #86868b   /* Captions, footnotes */
--apple-text-link:      #0071e3   /* Links, CTA text */
--apple-text-inverted:  #f5f5f7   /* Text on dark cards */
```

> **Why #1d1d1f and not #000000?**
> Pure black on white creates too much contrast — it feels harsh and cheap.
> #1d1d1f is a very dark gray — softer, more refined.

### Background colors

```css
--apple-bg:           #ffffff   /* Page background */
--apple-surface:      #f5f5f7   /* Cards, feature strip backgrounds */
--apple-surface-dark: #1d1d1f   /* Dark card backgrounds */
--apple-divider:      #d2d2d7   /* Horizontal rules */
```

### Brand color

```css
--apple-blue:       #0071e3   /* Primary buttons, links */
--apple-blue-hover: #0077ed   /* Button hover state */
--apple-blue-dark:  #2997ff   /* Blue text on dark backgrounds */
```

### Usage rules

1. **Never use pure `#000000`** for text. Use `#1d1d1f`.
2. **Never use pure `#333333`** or any random gray — stick to the 3 grays above.
3. **One accent color only** — `#0071e3`. Apple only uses one blue per product.
4. **No gradients** on the main page. Apple uses them only inside product hero images.
5. **No box shadows** on cards. Background color difference does the separation.

---

## 7. Container Widths

This is what creates the famous horizontal whitespace.

| Container | Width | Class | Use for |
|-----------|-------|-------|---------|
| Narrow | `692px` | `.apple-container-narrow` | Text-heavy sections, centered paragraphs |
| Standard | `980px` | `.apple-container` | Product grids, most sections |
| Wide | `1200px` | `.apple-container-wide` | Hero images only |

### Always add horizontal padding

```css
padding-left: 22px;
padding-right: 22px;
```

This is already included in all `.apple-container-*` classes.

### The math behind the whitespace

On a 1440px screen with `max-width: 980px`:
- Available margin = `(1440 - 980) / 2 = 230px` on each side
- That **230px of white** per side is what your owner noticed

```html
<!-- Correct — content never touches edges -->
<section class="apple-section">
  <div class="apple-container">
    <!-- your content -->
  </div>
</section>

<!-- Wrong — content spans full screen width -->
<section style="padding: 40px;">
  <!-- your content -->
</section>
```

---

## 8. Section Spacing

Every section needs big vertical breathing room. This is the single biggest
factor in whether your site feels premium or cheap.

| Context | Value | CSS Variable |
|---------|-------|--------------|
| Hero section top padding | `160px` | `--apple-hero-pad-top` |
| Standard section (top + bottom) | `120px` | `--apple-section-pad-v` |
| Tighter section (related content) | `80px` | — (add manually) |

```css
/* Already done if you use the CSS classes */
.apple-section         { padding: 120px 0; }
.apple-hero            { padding: 160px 0 120px; }
.apple-section-surface { background: #f5f5f7; padding: 120px 0; }
```

### Comparison

```css
/* What most beginners write — feels cramped */
section { padding: 40px 20px; }

/* Apple — feels premium */
section { padding: 120px 22px; }
```

---

## 9. Component Spacing

Internal spacing within sections.

| Gap | Size | Between |
|-----|------|---------|
| Eyebrow → H1 | `8px` | Label and main headline |
| H1 → subtitle | `16px` | Hero title and subtitle |
| Subtitle → CTA | `32px` | Subtitle and buttons |
| Section text → image | `48px` | Text block and image below |
| Card grid gap | `12px` | Cards in a grid (tight, like Apple) |
| Feature items gap | `48px` | Items in feature grid |

---

## 10. Navbar

```html
<nav class="apple-nav">
  <a href="/" class="apple-nav-logo">&#xf8ff;</a>

  <ul class="apple-nav-links">
    <li><a href="/store">Store</a></li>
    <li><a href="/mac">Mac</a></li>
    <li><a href="/iphone">iPhone</a></li>
    <li><a href="/ipad">iPad</a></li>
    <li><a href="/watch">Watch</a></li>
  </ul>

  <span class="apple-nav-action">&#128269;</span>
</nav>
```

### Navbar rules

| Property | Value | Why |
|----------|-------|-----|
| Height | `44px` | Apple's exact height |
| Font size | `13px` | Small — nav should whisper |
| Font weight | `400` | Never bold — bold fights the content |
| Background | `rgba(255,255,255,0.85)` | Frosted glass effect |
| Blur | `backdrop-filter: blur(20px)` | Premium frosted look |
| Position | `sticky top: 0` | Stays on scroll |
| Link color | `rgba(29,29,31,0.8)` | Slightly muted, not full black |
| Link hover | `rgba(29,29,31,1)` | Just removes muting — subtle |

---

## 11. Hero Section

### HTML structure

```html
<section class="apple-hero">
  <div class="apple-container-narrow">

    <!-- Step 1: Eyebrow label (optional) -->
    <p class="apple-eyebrow apple-hero-eyebrow">New  —  2026</p>

    <!-- Step 2: Main headline -->
    <h1 class="apple-hero-title">
      Your Product Name.
    </h1>

    <!-- Step 3: Subtitle -->
    <p class="apple-subtitle">
      One sentence that says what it does.
    </p>

    <!-- Step 4: CTA buttons -->
    <div class="apple-hero-cta">
      <a href="/buy" class="apple-btn-primary">Buy</a>
      <a href="/learn" class="apple-btn-secondary">Learn more ›</a>
    </div>

  </div>

  <!-- Step 5: Hero image (full container width) -->
  <div class="apple-container-wide" style="margin-top: 48px;">
    <div class="apple-image-wrap" style="aspect-ratio: 16/9;">
      <img src="/hero-image.jpg" alt="Product name" />
    </div>
  </div>
</section>
```

### Hero rules

1. **One message only** — one headline, one subtitle. Never two headlines.
2. **Short headline** — Apple hero headlines are often 3–6 words. Not a sentence.
3. **Headline ends with a period** — "iPhone 16 Pro." not "iPhone 16 Pro"
4. **Subtitle is muted gray** — `#6e6e73`, never black
5. **Two CTAs max** — one primary (solid blue), one secondary (text only)
6. **Center aligned** — Apple hero is always centered on desktop

---

## 12. Product Cards

### HTML structure

```html
<div class="apple-card-grid">

  <!-- Light card (default) -->
  <div class="apple-card">
    <div class="apple-card-spacer"></div>
    <p class="apple-card-eyebrow">From ₹79,900</p>
    <h3 class="apple-card-title">Product Name</h3>
    <p class="apple-card-desc">One short sentence about what it does.</p>
    <a href="#" class="apple-card-link">Learn more ›</a>
  </div>

  <!-- Dark card -->
  <div class="apple-card apple-card-dark">
    <div class="apple-card-spacer"></div>
    <p class="apple-card-eyebrow">From ₹1,19,900</p>
    <h3 class="apple-card-title">Pro Product</h3>
    <p class="apple-card-desc">The most powerful version.</p>
    <a href="#" class="apple-card-link">Learn more ›</a>
  </div>

  <!-- Blue card -->
  <div class="apple-card apple-card-blue">
    <div class="apple-card-spacer"></div>
    <p class="apple-card-eyebrow">New feature</p>
    <h3 class="apple-card-title">Service Name</h3>
    <p class="apple-card-desc">Available on all devices.</p>
    <a href="#" class="apple-card-link">Learn more ›</a>
  </div>

</div>
```

### Card rules

| Property | Value | Why |
|----------|-------|-----|
| Background | `#f5f5f7` | Subtle surface — not white |
| Border radius | `20px` | Softer, more modern than 8px |
| Padding | `48px 32px` | Very generous — cards breathe |
| Min height | `320px` | Cards feel substantial |
| Grid gap | `12px` | Tight — cards are related |
| No border | — | Background difference is enough |
| No shadow | — | Shadows feel dated |
| Text at bottom | flex-end | Leaves room for image at top |

---

## 13. Feature Grid

```html
<section class="apple-section-surface">
  <div class="apple-container">

    <div class="apple-heading-group">
      <p class="apple-eyebrow">Why us.</p>
      <h2 class="apple-title-xl">Built different.</h2>
    </div>

    <div class="apple-feature-grid">
      <div class="apple-feature-item">
        <div class="apple-feature-icon">🔒</div>
        <p class="apple-feature-label">Privacy</p>
        <p class="apple-feature-desc">Your data stays yours, always.</p>
      </div>
      <div class="apple-feature-item">
        <div class="apple-feature-icon">⚡</div>
        <p class="apple-feature-label">Performance</p>
        <p class="apple-feature-desc">Chips designed for speed.</p>
      </div>
      <div class="apple-feature-item">
        <div class="apple-feature-icon">🌐</div>
        <p class="apple-feature-label">Ecosystem</p>
        <p class="apple-feature-desc">Everything works together.</p>
      </div>
    </div>

  </div>
</section>
```

---

## 14. Buttons

| Button | Class | Use when |
|--------|-------|---------|
| Primary | `.apple-btn-primary` | Main CTA — "Buy", "Get started" |
| Secondary | `.apple-btn-secondary` | Alternative CTA — "Learn more" |
| Ghost | `.apple-btn-ghost` | CTA on dark or blue card backgrounds |

### Button rules

1. **Pill shape** — `border-radius: 980px`. Always.
2. **Font size 17px** — same as body. Never bigger.
3. **Font weight 400** — regular, not bold.
4. **Padding** — `12px 24px`. Never less.
5. **Max 2 buttons** side by side — primary + secondary.
6. **Never use border-only buttons** on white background — too weak.

---

## 15. Footer

```html
<footer class="apple-footer">
  <div class="apple-footer-inner">
    <p class="apple-footer-text">
      Copyright © 2026 Your Company. All rights reserved.
    </p>
    <ul class="apple-footer-links">
      <li><a href="/privacy">Privacy Policy</a></li>
      <li><a href="/terms">Terms of Use</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </div>
</footer>
```

---

## 16. Responsive Rules

The CSS file handles breakpoints automatically via CSS variables.
All sizes shrink at `834px` and `600px`.

| Screen | Section padding | Hero title | Display |
|--------|----------------|------------|---------|
| Desktop (1440px) | 120px | 80px | 64px |
| Tablet (834px) | 80px | 48px | 40px |
| Mobile (600px) | 60px | 40px | 32px |

### Mobile-specific

- Nav links hidden on mobile (add hamburger menu as needed)
- Card grid collapses to 1 column
- CTA buttons stack vertically
- Horizontal padding reduces to `16px`

---

## 17. Common Mistakes

### ❌ Mistake 1 — Section padding too small

```css
/* Wrong */
section { padding: 40px 20px; }

/* Correct */
section { padding: 120px 22px; }
```

### ❌ Mistake 2 — Container too wide

```css
/* Wrong — content touches screen edges on large monitors */
.container { max-width: 1440px; }

/* Correct */
.container { max-width: 980px; }
```

### ❌ Mistake 3 — Wrong text color

```css
/* Wrong — too harsh */
h1 { color: #000000; }

/* Correct — Apple's near-black */
h1 { color: #1d1d1f; }
```

### ❌ Mistake 4 — No letter spacing on headlines

```css
/* Wrong — looks generic */
h1 { font-size: 64px; }

/* Correct — tight tracking makes it premium */
h1 { font-size: 64px; letter-spacing: -0.025em; }
```

### ❌ Mistake 5 — Line height too high on headlines

```css
/* Wrong — headlines look loose and weak */
h1 { font-size: 64px; line-height: 1.5; }

/* Correct — tight line height on big text */
h1 { font-size: 64px; line-height: 1.04; }
```

### ❌ Mistake 6 — Too many font sizes

```
Wrong:  12px, 13px, 14px, 15px, 16px, 17px, 18px, 20px, 24px, 28px, 32px
Correct: 12px, 14px, 17px, 21px, 32px, 48px  (max 4–5 per page)
```

### ❌ Mistake 7 — Card box shadows

```css
/* Wrong — looks dated */
.card { box-shadow: 0 4px 20px rgba(0,0,0,0.1); }

/* Correct — background color does the separation */
.card { background: #f5f5f7; }
```

### ❌ Mistake 8 — Bold nav links

```css
/* Wrong — fights the content */
nav a { font-weight: 700; }

/* Correct — nav should whisper */
nav a { font-weight: 400; }
```

---

## 18. Copy-Paste HTML Templates

### Full page scaffold

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Product</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="apple-design-system.css">
</head>
<body>

  <!-- NAVBAR -->
  <nav class="apple-nav">
    <a href="/" class="apple-nav-logo">&#xf8ff;</a>
    <ul class="apple-nav-links">
      <li><a href="#">Products</a></li>
      <li><a href="#">Features</a></li>
      <li><a href="#">Pricing</a></li>
      <li><a href="#">Support</a></li>
    </ul>
    <a href="/buy" class="apple-btn-primary" style="font-size:13px; padding: 7px 16px;">Buy now</a>
  </nav>

  <!-- HERO -->
  <section class="apple-hero">
    <div class="apple-container-narrow">
      <p class="apple-eyebrow apple-hero-eyebrow">Introducing — 2026</p>
      <h1 class="apple-hero-title">Product Name.</h1>
      <p class="apple-subtitle">One line that explains what makes it different.</p>
      <div class="apple-hero-cta">
        <a href="/buy" class="apple-btn-primary">Buy</a>
        <a href="/learn" class="apple-btn-secondary">Learn more ›</a>
      </div>
    </div>
    <div class="apple-container-wide" style="margin-top: 48px;">
      <div class="apple-image-wrap" style="aspect-ratio: 16/9; background: #f5f5f7;">
        <!-- <img src="/hero.jpg" alt="Product"> -->
      </div>
    </div>
  </section>

  <div class="apple-divider"></div>

  <!-- PRODUCT CARDS -->
  <section class="apple-section">
    <div class="apple-container">
      <div class="apple-heading-group">
        <p class="apple-eyebrow">The lineup.</p>
        <h2 class="apple-title-xl">Choose yours.</h2>
      </div>
      <div class="apple-card-grid">
        <div class="apple-card">
          <div class="apple-card-spacer"></div>
          <p class="apple-card-eyebrow">From ₹79,900</p>
          <h3 class="apple-card-title">Standard</h3>
          <p class="apple-card-desc">Everything you need, beautifully done.</p>
          <a href="#" class="apple-card-link">Learn more ›</a>
        </div>
        <div class="apple-card apple-card-dark">
          <div class="apple-card-spacer"></div>
          <p class="apple-card-eyebrow">From ₹1,19,900</p>
          <h3 class="apple-card-title">Pro</h3>
          <p class="apple-card-desc">For those who want more.</p>
          <a href="#" class="apple-card-link">Learn more ›</a>
        </div>
        <div class="apple-card apple-card-blue">
          <div class="apple-card-spacer"></div>
          <p class="apple-card-eyebrow">Subscription</p>
          <h3 class="apple-card-title">Service</h3>
          <p class="apple-card-desc">All your needs in one place.</p>
          <a href="#" class="apple-card-link">Learn more ›</a>
        </div>
      </div>
    </div>
  </section>

  <div class="apple-divider"></div>

  <!-- FEATURES -->
  <section class="apple-section-surface">
    <div class="apple-container">
      <div class="apple-heading-group">
        <p class="apple-eyebrow">Why us.</p>
        <h2 class="apple-title-xl">Built different.</h2>
        <p class="apple-subtitle" style="margin-top: 14px;">The details that set us apart.</p>
      </div>
      <div class="apple-feature-grid">
        <div class="apple-feature-item">
          <div class="apple-feature-icon">🔒</div>
          <p class="apple-feature-label">Privacy</p>
          <p class="apple-feature-desc">Your data stays yours, always.</p>
        </div>
        <div class="apple-feature-item">
          <div class="apple-feature-icon">⚡</div>
          <p class="apple-feature-label">Performance</p>
          <p class="apple-feature-desc">Designed from the ground up for speed.</p>
        </div>
        <div class="apple-feature-item">
          <div class="apple-feature-icon">🌐</div>
          <p class="apple-feature-label">Connected</p>
          <p class="apple-feature-desc">Everything works together seamlessly.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="apple-footer">
    <div class="apple-footer-inner">
      <p class="apple-footer-text">Copyright © 2026 Your Company. All rights reserved.</p>
      <ul class="apple-footer-links">
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms of Use</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>
  </footer>

</body>
</html>
```

---

## Quick Decision Card

When stuck, ask yourself these questions:

| Question | Answer |
|----------|--------|
| Is my section padding enough? | Should be `120px` top and bottom |
| Is my container wide enough? | Should be max `980px` |
| Is my headline tracking negative? | Yes — at least `-0.015em` |
| Am I using more than 4 font sizes? | Use fewer |
| Is my heading `font-weight: 600`? | Yes — never 700 or 400 |
| Is my body text `17px`? | Yes — not 14px or 16px |
| Are my cards bordered or shadowed? | Neither — background color only |
| Is my text color `#1d1d1f`? | Yes — not pure `#000000` |
| Does each section have one idea? | Yes — never two |
| Are my CTA buttons pill-shaped? | Yes — `border-radius: 980px` |
