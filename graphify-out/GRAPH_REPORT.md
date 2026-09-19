# Graph Report - mainwebsite  (2026-09-19)

## Corpus Check
- 154 files · ~133,913 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 758 nodes · 968 edges · 87 communities (60 shown, 27 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8ebd9fb3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 80|Community 80]]
- [[_COMMUNITY_Community 81|Community 81]]
- [[_COMMUNITY_Community 82|Community 82]]
- [[_COMMUNITY_Community 83|Community 83]]
- [[_COMMUNITY_Community 84|Community 84]]
- [[_COMMUNITY_Community 85|Community 85]]
- [[_COMMUNITY_Community 87|Community 87]]

## God Nodes (most connected - your core abstractions)
1. `connectDB()` - 96 edges
2. `auth` - 25 edges
3. `Apple Design System — Complete Reference Guide` - 21 edges
4. `compilerOptions` - 16 edges
5. `AI SEO` - 14 edges
6. `What You Must Do When Invoked` - 12 edges
7. `cn()` - 10 edges
8. `/graphify` - 10 edges
9. `Open Knowledge Format (OKF)` - 9 edges
10. `How Each AI Platform Picks Sources` - 9 edges

## Surprising Connections (you probably didn't know these)
- `main()` --calls--> `getDbName()`  [INFERRED]
  scripts/create-it-admin.ts → app/lib/auth.ts
- `DELETE()` --calls--> `connectDB()`  [EXTRACTED]
  app/api/admin/membership-plans/[id]/route.ts → app/lib/db.ts
- `PATCH()` --calls--> `connectDB()`  [EXTRACTED]
  app/api/admin/membership-plans/[id]/route.ts → app/lib/db.ts
- `GET()` --calls--> `connectDB()`  [EXTRACTED]
  app/api/admin/membership-plans/route.ts → app/lib/db.ts
- `POST()` --calls--> `connectDB()`  [EXTRACTED]
  app/api/admin/membership-plans/route.ts → app/lib/db.ts

## Import Cycles
- None detected.

## Communities (87 total, 27 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.40
Nodes (4): GET(), HeroItem, HeroItemSchema, IHeroItem

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (28): AppointmentsManager(), BlogsManager(), BlogsManagerProps, DoctorOption, Application, CareersManager(), Job, DashboardNav() (+20 more)

### Community 2 - "Community 2"
Cohesion: 0.24
Nodes (4): ContactUs(), ChatButton(), ChatButtonProps, metadata

### Community 3 - "Community 3"
Cohesion: 0.20
Nodes (9): 1. 🧠 High-Level Mental Map (The Mindmap), 2. 🍌 The "Monkey Analogy": How to Understand It in 30 Seconds, 3. 🔄 Before vs. After Visual Comparison, 4. 🧭 Step-by-Step Lifecycle Flowchart, 5. 📂 File-by-File Blueprint (What changed & why), 6. 🏆 The Golden Rules for Your Memory, The Fix (The Live Digital Screen):, 🐵 The "Monkey Map": Next.js Dynamic Sitemap & Canonical Fix (+1 more)

### Community 4 - "Community 4"
Cohesion: 0.07
Nodes (27): dependencies, axios, bcryptjs, class-variance-authority, cloudinary, clsx, jsonwebtoken, lucide-react (+19 more)

### Community 5 - "Community 5"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 6 - "Community 6"
Cohesion: 0.18
Nodes (10): GET(), POST(), slugify(), GET(), GET(), Blog, BlogSchema, IBlog (+2 more)

### Community 7 - "Community 7"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 8 - "Community 8"
Cohesion: 0.10
Nodes (19): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/bcryptjs, @types/jsonwebtoken, @types/node (+11 more)

### Community 9 - "Community 9"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 10 - "Community 10"
Cohesion: 0.12
Nodes (9): COUNTRIES, TREATMENTS, NAV_COLUMNS, NavColumn, NavItem, Navbar(), NavLinks, metadata (+1 more)

### Community 11 - "Community 11"
Cohesion: 0.24
Nodes (13): mobileMenuStructure, Ourservices, plainLinks, NavigationMenu(), NavigationMenuContent(), NavigationMenuIndicator(), NavigationMenuItem(), NavigationMenuLink() (+5 more)

### Community 12 - "Community 12"
Cohesion: 0.15
Nodes (12): 13. Feature Grid, 15. Footer, 18. Copy-Paste HTML Templates, 3. Letter Spacing Rules, 4. Font Weights, 9. Component Spacing, Apple Design System — Complete Reference Guide, Full page scaffold (+4 more)

### Community 13 - "Community 13"
Cohesion: 0.17
Nodes (11): 1. Global Navbar Container (Navbar.tsx), 2. Desktop View (md:block), 3. Mobile View (md:hidden), 4. Custom Animation Constants (globals.css), CTA Button (Book Appointment), Full-Screen Overlay, Hamburger Button, Mobile Link Typography (+3 more)

### Community 14 - "Community 14"
Cohesion: 0.17
Nodes (11): 1. Global Navbar Container (Navbar.tsx), 2. Desktop View (md:block), 3. Mobile View (md:hidden), 4. Custom Animation Constants (globals.css), CTA Button (Book Appointment), Full-Screen Overlay, Hamburger Button, Mobile Link Typography (+3 more)

### Community 15 - "Community 15"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 16 - "Community 16"
Cohesion: 0.22
Nodes (9): 17. Common Mistakes, ❌ Mistake 1 — Section padding too small, ❌ Mistake 2 — Container too wide, ❌ Mistake 3 — Wrong text color, ❌ Mistake 4 — No letter spacing on headlines, ❌ Mistake 5 — Line height too high on headlines, ❌ Mistake 6 — Too many font sizes, ❌ Mistake 7 — Card box shadows (+1 more)

### Community 17 - "Community 17"
Cohesion: 0.25
Nodes (7): Implementation Log, Phase 1: Database & API Updates, Phase 2: Admin Dashboard Updates, Phase 3: Frontend SEO Enhancements, Phase 4: Discovery & Crawling, SEO Implementation Plan - Singh Dental Care, Status Key

### Community 18 - "Community 18"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 19 - "Community 19"
Cohesion: 0.29
Nodes (3): Doctor, DoctorGridProps, metadata

### Community 20 - "Community 20"
Cohesion: 0.40
Nodes (5): 6. Color System, Background colors, Brand color, Text colors, Usage rules

### Community 21 - "Community 21"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 22 - "Community 22"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 23 - "Community 23"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 24 - "Community 24"
Cohesion: 0.50
Nodes (4): 1. Font Setup, Add to your HTML `<head>`, Add to your Next.js project, CSS font stack (already in the CSS file)

### Community 25 - "Community 25"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 29 - "Community 29"
Cohesion: 0.67
Nodes (3): 11. Hero Section, Hero rules, HTML structure

### Community 30 - "Community 30"
Cohesion: 0.67
Nodes (3): 12. Product Cards, Card rules, HTML structure

### Community 31 - "Community 31"
Cohesion: 0.67
Nodes (3): 7. Container Widths, Always add horizontal padding, The math behind the whitespace

### Community 43 - "Community 43"
Cohesion: 0.06
Nodes (36): 1. Current AI Visibility, 2. Content & Domain, 3. Goals, 4. Competitive Landscape, Agentic Experiences, AI SEO, AI SEO by Content Type, AI Visibility Audit (+28 more)

### Community 55 - "Community 55"
Cohesion: 0.24
Nodes (7): DELETE(), getYouTubeId(), PATCH(), GET(), getYouTubeId(), POST(), TestimonialSchema

### Community 60 - "Community 60"
Cohesion: 0.10
Nodes (21): DELETE(), GET(), PUT(), slugify(), GET(), POST(), slugify(), GET() (+13 more)

### Community 61 - "Community 61"
Cohesion: 0.15
Nodes (17): DELETE(), PATCH(), GET(), DELETE(), PATCH(), GET(), POST(), PUT() (+9 more)

### Community 62 - "Community 62"
Cohesion: 0.21
Nodes (8): DELETE(), PATCH(), GET(), POST(), GET(), IMembershipPlan, MembershipPlan, MembershipPlanSchema

### Community 63 - "Community 63"
Cohesion: 0.13
Nodes (14): GET(), POST(), DELETE(), GET(), PUT(), GET(), POST(), IJob (+6 more)

### Community 64 - "Community 64"
Cohesion: 0.24
Nodes (7): DELETE(), getYouTubeId(), PATCH(), GET(), getYouTubeId(), POST(), PodcastSchema

### Community 65 - "Community 65"
Cohesion: 0.06
Nodes (28): AI SEO by Content Type, Blog Content, Comparison / Alternative Pages, Documentation / Help Content, Local Business / Ecom (Google emphasis), SaaS Product Pages, 1. Suganthan's free web tool (recommended for most sites), 2. WordPress plugin (pending wp.org approval) (+20 more)

### Community 66 - "Community 66"
Cohesion: 0.08
Nodes (24): 1. Enhanced BlogPosting & MedicalWebPage Schema, 1. Fix Canonical Domain Everywhere, 1. Restore SSR in Navbar, 1. Shift from Pure Generic to Local + Transactional Intent, 1. The 308 Permanent Canonical Redirect Loop (Critical Severity), 2. Fix Blog Index Metadata, 2. Make Sitemap Dynamic, 2. Stale / Frozen Sitemap: 7 Out of 9 Blogs Are Invisible to Google (+16 more)

### Community 67 - "Community 67"
Cohesion: 0.08
Nodes (24): AEO and GEO Content Patterns, Answer Engine Optimization (AEO) Patterns, Authoritative Claim Block, Business/Marketing Content, Comparison Table Block, Contents, Definition Block, Domain-Specific GEO Tactics (+16 more)

### Community 68 - "Community 68"
Cohesion: 0.17
Nodes (5): auth, db, dbName, getDB(), MONGODB_URI

### Community 69 - "Community 69"
Cohesion: 0.22
Nodes (4): metadata, Aboutus(), Dentist, MeetTheDentistsProps

### Community 70 - "Community 70"
Cohesion: 0.15
Nodes (12): DELETE(), GET(), PUT(), GET(), POST(), ScheduleButton(), BlogPostPage(), generateMetadata() (+4 more)

### Community 71 - "Community 71"
Cohesion: 0.25
Nodes (6): DEFAULT_ITEMS, HeroItem, HeroSectionProps, NavigatorWithConnection, NetworkInformation, STATS

### Community 72 - "Community 72"
Cohesion: 0.29
Nodes (7): AiSeoFaq(), SharkTank(), getDoctors(), getHeroItems(), Home(), jsonLd, metadata

### Community 73 - "Community 73"
Cohesion: 0.29
Nodes (6): Cosmetic Dentistry (Teeth Whitening), Dental Implants, General Consultations, Orthodontics (Braces & Clear Aligners), Pricing & Treatments — Singh Dental Care, Root Canal Therapy (RCT)

### Community 77 - "Community 77"
Cohesion: 0.47
Nodes (4): BlogCTA(), BlogListingPage(), getBlogs(), metadata

### Community 80 - "Community 80"
Cohesion: 0.40
Nodes (4): basePath, fs, pages, path

## Knowledge Gaps
- **369 isolated node(s):** `DoctorOption`, `BlogsManagerProps`, `Job`, `Application`, `DashboardNavProps` (+364 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `connectDB()` connect `Community 61` to `Community 64`, `Community 0`, `Community 6`, `Community 70`, `Community 72`, `Community 77`, `Community 55`, `Community 60`, `Community 62`, `Community 63`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Why does `AI SEO` connect `Community 43` to `Community 65`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **What connects `DoctorOption`, `BlogsManagerProps`, `Job` to the rest of the system?**
  _369 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05117845117845118 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `Community 5` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `Community 7` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._