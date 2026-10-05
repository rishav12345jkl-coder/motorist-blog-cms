# Development Roadmap & Task Breakdown
## MOTORIST Blog + Content Management System (CMS)

---

### Document Control
- **Document Version:** 1.0.0
- **Status:** Pending Review & Execution
- **Rules Notice:** All tasks are initialized to `TODO`, `IN PROGRESS`, or `BLOCKED`. No tasks may be marked as `DONE` until implementation commences and verification passes.

---

## Roadmap Overview

```
Phase 1: Planning & Setup
  └── Phase 2: Design System & Tokens
        └── Phase 3: Database & Backend Services
              ├── Phase 4: Public Editorial Platform
              └── Phase 5: Admin CMS Application
                    └── Phase 6: Security, SEO & Performance
                          └── Phase 7: Automated Testing & Audits
                                └── Phase 8: Production Deployment & Monitoring
```

---

## Phase 1 — Planning & Infrastructure Setup

### TASK-101: Project Architecture & Documentation Baseline
- **Objective:** Finalize product requirements, technical architecture, engineering rules, design specs, and roadmap.
- **Description:** Review all foundational documents (`PRD.md`, `ARCHITECTURE.md`, `RULES.md`, `DESIGN.md`, `TASKS.md`, `MEMORY.md`) with the lead architect and project stakeholders to resolve open decisions.
- **Priority:** CRITICAL
- **Dependencies:** None
- **Status:** DONE
- **Acceptance Criteria:**
  - All 6 markdown specification documents are drafted and checked for consistency.
  - Stakeholder reviews open decisions (Comment moderation policy, Spam defense, Storage provider).

### TASK-102: Next.js Fullstack Project Initialization
- **Objective:** Scaffold the Next.js 15+ App Router application with TypeScript and tooling.
- **Description:** Initialize the repository using standard Next.js App Router scaffolding with strict TypeScript, ESLint, Prettier, and absolute path aliases (`@/*`).
- **Priority:** CRITICAL
- **Dependencies:** TASK-101
- **Status:** DONE
- **Acceptance Criteria:**
  - `package.json` configured with Next.js, React 19, TypeScript, and core dependencies.
  - `tsconfig.json` enforces `strict: true` and `@/*` mapping to `./src/*`.
  - Next.js development server builds with zero errors or warnings.

---

## Phase 2 — Design System & UI Foundations

### TASK-201: Tailwind CSS Design Tokens & Typography Configuration
- **Objective:** Implement the MOTORIST brand visual system within Tailwind CSS.
- **Description:** Configure `tailwind.config.ts` and `globals.css` with exact color tokens (`#1E2024`, `#2B2C2D`, `#C2B7AC`, `#E05A2B`), Jost and Open Sans font families, and border radii matching `motoriststore.com`.
- **Priority:** HIGH
- **Dependencies:** TASK-102
- **Status:** DONE
- **Acceptance Criteria:**
  - Tailwind config provides `brand-black`, `brand-charcoal`, `brand-taupe`, `brand-amber`, and `brand-slate`.
  - Font families import and configure Jost, Open Sans, and JetBrains Mono without layout shifts.
  - Utility helper `cn()` (`clsx` + `tailwind-merge`) is implemented in `src/lib/utils.ts`.

### TASK-202: Base UI Primitive Component Library
- **Objective:** Create accessible, reusable UI component primitives.
- **Description:** Build foundational UI elements: Button (variants: primary, accent, outline, ghost, danger), Input, Textarea, Badge/Pill, Modal/Dialog, Card, and Skeleton Loader.
- **Priority:** HIGH
- **Dependencies:** TASK-201
- **Status:** DONE
- **Acceptance Criteria:**
  - Button supports loading spinner, disabled state, and all brand color variants.
  - Inputs support error rings and focus rings styled with Racing Amber (`#E05A2B`).
  - All primitives have explicit TypeScript prop interfaces and pass WCAG AA contrast tests.

### TASK-203: Global Layout Shell (Header, Navigation, Footer, Brand Continuity Bar)
- **Objective:** Construct the public shell linking the blog with `motoriststore.com`.
- **Description:** Build the sticky navigation header with desktop menu, mobile off-canvas drawer, search icon trigger, announcement continuity bar, and 4-column footer matching the store.
- **Priority:** HIGH
- **Dependencies:** TASK-202
- **Status:** DONE
- **Acceptance Criteria:**
  - Header is responsive across mobile (360px) and desktop (>1024px).
  - Prominent "Shop Store" button directs users to `https://motoriststore.com/`.
  - Sticky header activates subtle shadow on scroll.

---

## Phase 3 — Database & Backend Architecture

### TASK-301: MySQL Database Provisioning & Prisma ORM Schema Definition
- **Objective:** Define the complete relational schema in Prisma and execute initial migration.
- **Description:** Implement models for `User`, `Category`, `Tag`, `Blog`, `BlogTag`, `Comment`, `BlogLike`, `Media`, and `Setting` with full indexes, foreign keys, and fulltext search capabilities in `prisma/schema.prisma`.
- **Priority:** CRITICAL
- **Dependencies:** TASK-102
- **Status:** DONE
- **Acceptance Criteria:**
  - `prisma/schema.prisma` compiles with zero schema validation errors.
  - Successful migration execution (`npx prisma migrate dev --name init_blog_schema`).
  - Fulltext index applied to `(title, excerpt, content)` in MySQL.

### TASK-302: Database Client Singleton & Idempotent Seeder
- **Objective:** Setup global Prisma client and populate realistic development data.
- **Description:** Create `src/lib/prisma.ts` with connection caching. Write `prisma/seed.ts` to seed an admin user, 5 core categories (Performance Mods, Himalayan 450, Duke 390, Touring & Gear, Maintenance), 10 tags, 8 rich sample articles, and demo comments.
- **Priority:** HIGH
- **Dependencies:** TASK-301
- **Status:** DONE
- **Acceptance Criteria:**
  - `npx prisma db seed` runs idempotently without primary/unique key conflicts.
  - Seeded articles contain realistic motorcycle content, specs, and store product links.

### TASK-303: Core Server Actions & Validation Layer
- **Objective:** Implement type-safe backend mutation actions with Zod.
- **Description:** Create Server Actions in `src/actions/` for `submitCommentAction`, `toggleLikeAction`, `createBlogAction`, `updateBlogAction`, `deleteBlogAction`, and `moderateCommentAction`.
- **Priority:** HIGH
- **Dependencies:** TASK-301
- **Status:** DONE
- **Acceptance Criteria:**
  - Every action validates inputs against Zod schemas in `src/lib/validations/`.
  - Actions return deterministic `{ success: boolean, data?: T, error?: ApiError }` structures.
  - Dynamic cache invalidation occurs via `revalidatePath()`.

---

## Phase 4 — Public Editorial Platform

### TASK-401: Blog Homepage & Hero Showcase
- **Objective:** Build the high-impact editorial homepage.
- **Description:** Implement `src/app/(public)/page.tsx` featuring the top Featured Story hero, 3-card trending row, category switcher tabs, latest articles feed, and newsletter signup card.
- **Priority:** HIGH
- **Dependencies:** TASK-203, TASK-302
- **Status:** TODO
- **Acceptance Criteria:**
  - Fetches featured and recent posts via Prisma in Server Components.
  - Smooth hover zoom animations on card thumbnails.
  - Category tabs filter content seamlessly.

### TASK-402: Category & Tag Archive Pages
- **Objective:** Construct dynamic taxonomy listing pages.
- **Description:** Implement `/category/[slug]` and `/tag/[slug]` pages with hero description banners, sorting options (Latest, Oldest, Most Liked), and responsive 3-column article grids with pagination.
- **Priority:** MEDIUM
- **Dependencies:** TASK-401
- **Status:** TODO
- **Acceptance Criteria:**
  - Generates 404 via `notFound()` for invalid slugs.
  - Correctly displays assigned articles count.
  - Implements clean numeric pagination controls.

### TASK-403: Article Reading Experience & Typography
- **Objective:** Create the long-form article page layout with rich typography.
- **Description:** Implement `src/app/(public)/blog/[slug]/page.tsx` with high-resolution hero image, reading time estimate, author badge, formatted markdown prose, styled callout blocks, and responsive table of contents (TOC).
- **Priority:** CRITICAL
- **Dependencies:** TASK-401
- **Status:** TODO
- **Acceptance Criteria:**
  - Article prose maintains optimal reading width (`740px`) with 1.75 line height.
  - Sticky Table of Contents tracks active heading on scroll.
  - Custom callouts for torque specs, warning notes, and compatibility tips render cleanly.

### TASK-404: E-Commerce Product Embed Card
- **Objective:** Create contextual product shopping widgets inside blog posts.
- **Description:** Build `<ProductEmbedCard />` displaying product image, title, price in INR, fitment badges, and direct links to `motoriststore.com`.
- **Priority:** HIGH
- **Dependencies:** TASK-403
- **Status:** TODO
- **Acceptance Criteria:**
  - Can be embedded in any blog article via markdown or shortcode.
  - Visuals seamlessly match MOTORIST store branding.
  - Tracks outbound click analytics events.

### TASK-405: Interactive Like System
- **Objective:** Build the real-time blog like button.
- **Description:** Build `<BlogLikeButton />` client component with optimistic UI update, heart pop micro-animation, local storage caching, and backend IP-hash throttling.
- **Priority:** MEDIUM
- **Dependencies:** TASK-403, TASK-303
- **Status:** TODO
- **Acceptance Criteria:**
  - Clicking like immediately increments counter visually without waiting for network.
  - Server Action records like and enforces duplicate vote prevention.
  - Handles network failures gracefully by reverting state.

### TASK-406: Threaded Comments & Moderation Submission
- **Objective:** Implement 2-tier nested discussion system.
- **Description:** Build `<CommentSection />`, `<CommentItem />`, and `<CommentForm />` supporting root comments, 1-level nested replies, honeypot spam protection, and pending moderation feedback.
- **Priority:** HIGH
- **Dependencies:** TASK-403, TASK-303
- **Status:** TODO
- **Acceptance Criteria:**
  - Guest can submit a comment with Name, Email, and Message.
  - Honeypot traps automated bots silently.
  - Successful submissions display an informative toast: *"Comment submitted for review"*.
  - Approved replies indent cleanly under parent comments.

### TASK-407: Instant Search Modal & Dedicated Results Page
- **Objective:** Deliver fast search across all articles, categories, and tags.
- **Description:** Implement `Cmd+K` / `Ctrl+K` global search dialog with debounced autocomplete and dedicated search archive `/search?q=...` leveraging MySQL fulltext search.
- **Priority:** MEDIUM
- **Dependencies:** TASK-401, TASK-301
- **Status:** TODO
- **Acceptance Criteria:**
  - Search dialog opens with keyboard shortcut and mobile tap.
  - Debounces input by 250ms and presents top 5 instant results.
  - Enter key navigates to full search results page.

---

## Phase 5 — Admin Content Management System (CMS)

### TASK-501: Admin Authentication & Session Security
- **Objective:** Secure the `/admin` portal with credential authentication.
- **Description:** Implement admin login form, Argon2id password verification, and secure HttpOnly JWT session cookies. Build Next.js middleware to protect all `/admin/*` routes.
- **Priority:** CRITICAL
- **Dependencies:** TASK-301
- **Status:** TODO
- **Acceptance Criteria:**
  - Unauthenticated requests to `/admin/*` redirect to `/admin/login`.
  - Passwords hashed with high-cost salt.
  - Session cookie marked `HttpOnly`, `Secure`, and `SameSite=Lax`.

### TASK-502: Admin Dashboard & Analytics Overview
- **Objective:** Build the CMS landing dashboard.
- **Description:** Create `/admin` dashboard with metrics tiles (Total Published, Drafts, Scheduled, Pending Comments, Total Likes) and recent activity stream.
- **Priority:** MEDIUM
- **Dependencies:** TASK-501
- **Status:** TODO
- **Acceptance Criteria:**
  - Displays accurate metrics calculated directly from Prisma queries.
  - Quick action buttons to create a new post or moderate comments.

### TASK-503: Blog Management Data Table
- **Objective:** Build the blog management listing interface.
- **Description:** Implement `/admin/blogs` data table with status filtering (`All`, `Published`, `Draft`, `Scheduled`), search filter, pagination, and action buttons (Edit, Preview, Archive, Delete).
- **Priority:** HIGH
- **Dependencies:** TASK-501
- **Status:** TODO
- **Acceptance Criteria:**
  - Sorting by title, date, views, and likes.
  - Status badges accurately styled according to post status.
  - Action confirmation modal before archiving or deleting articles.

### TASK-504: Post Editor with Live Markdown Preview & Split Canvas
- **Objective:** Create the comprehensive article authoring canvas.
- **Description:** Build `/admin/blogs/new` and `/admin/blogs/[id]` with split-pane editing (Markdown on left, styled HTML preview on right), title input, slug auto-generation, excerpt, and featured image uploader.
- **Priority:** CRITICAL
- **Dependencies:** TASK-503, TASK-202
- **Status:** TODO
- **Acceptance Criteria:**
  - Live preview renders headings, images, blockquotes, and code identically to public site.
  - Auto-saves draft changes to state.
  - Slug auto-populates from title with manual edit support.

### TASK-505: Publishing Controls & Scheduling Engine
- **Objective:** Implement immediate publishing, draft saving, and future scheduling.
- **Description:** Build publishing sidebar drawer allowing editors to select status (`DRAFT`, `PUBLISHED`, `SCHEDULED`), pick a future date/time, and create Route Handler `/api/v1/cron/publish` to execute scheduled releases.
- **Priority:** HIGH
- **Dependencies:** TASK-504
- **Status:** TODO
- **Acceptance Criteria:**
  - Scheduled posts remain invisible to public queries until `publishedAt` timestamp.
  - Cron endpoint updates overdue scheduled posts to `PUBLISHED` and revalidates cache.

### TASK-506: Taxonomy Managers (Categories & Tags)
- **Objective:** Provide CRUD interfaces for categories and tags.
- **Description:** Build `/admin/categories` and `/admin/tags` management tables with create/edit modal dialogs, slug validation, and delete protections for assigned items.
- **Priority:** MEDIUM
- **Dependencies:** TASK-501
- **Status:** TODO
- **Acceptance Criteria:**
  - Prevent deleting categories that currently contain active blog posts.
  - Live slug generation and conflict detection.

### TASK-507: Media Library & Asset Uploader
- **Objective:** Build centralized image management for blog articles.
- **Description:** Create `/admin/media` with drag-and-drop upload zone, MIME type magic-byte validation, sharp image resizing/WebP conversion, image grid, and 1-click copy URL button.
- **Priority:** HIGH
- **Dependencies:** TASK-501
- **Status:** TODO
- **Acceptance Criteria:**
  - Validates file type and size (< 5MB).
  - Automatically generates WebP format and thumbnail preview.
  - Provides quick copy button for markdown image insertion (`![Alt](url)`).

### TASK-508: Comment Moderation Queue
- **Objective:** Build moderation dashboard for public discussions.
- **Description:** Create `/admin/comments` displaying pending, approved, and flagged comments with batch actions (`Approve`, `Mark as Spam`, `Delete`).
- **Priority:** HIGH
- **Dependencies:** TASK-501, TASK-406
- **Status:** TODO
- **Acceptance Criteria:**
  - Tabbed interface separating `Pending Approval` from `Approved`.
  - One-click approve immediately publishes comment to article thread.
  - One-click spam blocks IP hash from submitting further comments.

---

## Phase 6 — Security, SEO & Performance

### TASK-601: Dynamic XML Sitemap & Robots.txt
- **Objective:** Deliver search engine crawl architecture.
- **Description:** Implement `src/app/sitemap.ts` and `src/app/robots.ts` dynamically including all published articles, category archives, tag archives, and static pages with correct `lastModified` dates.
- **Priority:** HIGH
- **Dependencies:** TASK-401
- **Status:** TODO
- **Acceptance Criteria:**
  - Generates valid XML at `/sitemap.xml` with zero broken links.
  - Robots.txt disallows `/admin/` and `/api/` while allowing public pages.

### TASK-602: Schema.org Structured Data & Open Graph Meta
- **Objective:** Maximize search engine rich snippet eligibility and social share previews.
- **Description:** Add `BlogPosting`, `BreadcrumbList`, and `Organization` JSON-LD schemas to article pages. Implement dynamic Open Graph and Twitter Card generation via `metadata` API.
- **Priority:** HIGH
- **Dependencies:** TASK-403
- **Status:** TODO
- **Acceptance Criteria:**
  - Google Rich Results Test passes with zero errors on article URLs.
  - Social media share cards display high-res featured image, title, and brand watermark.

### TASK-603: Rate Limiting & Input Sanitization Hardening
- **Objective:** Protect against spam attacks, brute force, and XSS vulnerabilities.
- **Description:** Apply Next.js middleware sliding-window rate limiting on comment submissions and like endpoints. Configure strict DOMPurify rules for all rendered markdown.
- **Priority:** CRITICAL
- **Dependencies:** TASK-406, TASK-501
- **Status:** TODO
- **Acceptance Criteria:**
  - Repeated rapid comment submissions trigger HTTP 429 Too Many Requests.
  - Malicious script tags or event handlers in markdown content are completely stripped.

---

## Phase 7 — Automated Testing & Quality Assurance

### TASK-701: Unit & Integration Testing
- **Objective:** Verify utility functions, Zod schemas, and Server Actions.
- **Description:** Write Vitest / Jest test suites covering reading time calculations, slug generation, comment sanitization, and like toggling logic.
- **Priority:** HIGH
- **Dependencies:** TASK-303, TASK-603
- **Status:** TODO
- **Acceptance Criteria:**
  - 100% test pass rate on all core utilities and server action validations.

### TASK-702: End-to-End (E2E) Critical Flow Testing
- **Objective:** Validate end-user and admin user journeys.
- **Description:** Implement Playwright tests for:
  1. Reader journey: Homepage -> Search -> Read Article -> Like -> Submit Comment.
  2. Admin journey: Login -> Create Post -> Publish -> Moderate Comment.
- **Priority:** HIGH
- **Dependencies:** TASK-508, TASK-701
- **Status:** TODO
- **Acceptance Criteria:**
  - Playwright test suites execute headlessly and pass without flake.

### TASK-703: Accessibility & Core Web Vitals Audit
- **Objective:** Ensure performance and accessibility benchmarks are met.
- **Description:** Run automated Lighthouse and Axe-core audits on mobile and desktop viewports.
- **Priority:** HIGH
- **Dependencies:** TASK-702
- **Status:** TODO
- **Acceptance Criteria:**
  - Lighthouse scores $\ge 95$ across Performance, Accessibility, Best Practices, and SEO.
  - Zero Axe-core accessibility violations.

---

## Phase 8 — Production Deployment & Monitoring

### TASK-801: Production Build Validation & Environment Hardening
- **Objective:** Prepare production artifacts and lock down runtime configuration.
- **Description:** Validate `next build` with zero type errors. Setup `.env.production` validation schema using Zod.
- **Priority:** CRITICAL
- **Dependencies:** TASK-703
- **Status:** TODO
- **Acceptance Criteria:**
  - `npm run build` completes successfully with optimal static route generation.
  - Application halts gracefully if production environment variables are missing.

### TASK-802: Deployment Pipeline & Database Migration Automation
- **Objective:** Deploy to production infrastructure (Vercel + Managed MySQL).
- **Description:** Configure CI/CD pipeline to run linting, tests, database migrations (`prisma migrate deploy`), and edge deployment.
- **Priority:** CRITICAL
- **Dependencies:** TASK-801
- **Status:** TODO
- **Acceptance Criteria:**
  - Production deployment accessible with SSL/TLS.
  - Prisma migrations execute safely during deployment lifecycle.
