# SEO Implementation Plan - Singh Dental Care

This document tracks the SEO improvements for the Singh Dental Care website, specifically focusing on the Blog and Disease Directory sections.

## Status Key
- [ ] Pending
- [/] In Progress
- [x] Implemented

---

## Phase 1: Database & API Updates
- [x] **Blog Model Update**: Add `coverImageAlt` field.
- [x] **Disease Model Update**: Add `coverImageAlt` and `seoDescription` fields.
- [x] **API Updates**: Update Blog and Disease API routes to accept and save new SEO fields.

## Phase 2: Admin Dashboard Updates
- [x] **Cover Image Alt Text**: Add input fields for `coverImageAlt` in `BlogsManager.tsx` and `DiseasesManager.tsx`.
- [x] **Disease SEO Description**: Add an input field for `seoDescription` in `DiseasesManager.tsx`.
- [x] **Inline Image Alt Text**: Update `TiptapEditor.tsx` to support alt text for images inserted within the content.
- [x] **UI Guidance**: Add tooltips or help text explaining why Alt Text is important for SEO.

## Phase 3: Frontend SEO Enhancements
- [x] **Disease Metadata**: Implement `generateMetadata` in `app/disease/[slug]/page.tsx` for dynamic SEO titles and descriptions.
- [x] **Structured Data (Schema.org)**: 
    - [x] Add `MedicalCondition` schema to Disease pages.
    - [x] Enhance `BlogPosting` schema on Blog pages.
- [x] **Canonical Tags**: Add dynamic `<link rel="canonical">` to all main pages.
- [x] **Last Updated Visibility**: Display the "Last Updated" date on Blog and Disease pages to signal fresh content to Google.
- [x] **Breadcrumbs**: Implement breadcrumb navigation (e.g., Home > Blog > Title) for better crawlability and UX.

## Phase 4: Discovery & Crawling
- [x] **Dynamic Sitemap**: Create `app/sitemap.ts` to automatically generate `sitemap.xml` including all Blogs and Diseases.
- [x] **Robots.txt**: Add a `robots.txt` file to guide search engine crawlers.
- [x] **OpenGraph Enhancements**: Ensure all social sharing tags (Facebook/Twitter) are fully populated.

---

## Implementation Log
*Plan created on May 13, 2026.*
*Implementation completed on May 13, 2026.*

**Summary of work:**
1.  **Alt Text Support**: Added `coverImageAlt` to Blogs and Diseases models and UI.
2.  **SEO Descriptions**: Added `seoDescription` to Diseases for custom meta tags.
3.  **Dynamic Metadata**: Implemented dynamic titles and descriptions for all Disease and Blog pages.
4.  **Structured Data**: Added `MedicalCondition` and enhanced `BlogPosting` JSON-LD for rich snippets.
5.  **Canonical Tags**: Added canonical links to prevent duplicate content issues.
6.  **UI Improvements**: Added breadcrumbs and "Last Updated" dates for better UX and signaling freshness to Google.
7.  **Sitemap & Robots**: Set up automated sitemap generation and crawler instructions.
