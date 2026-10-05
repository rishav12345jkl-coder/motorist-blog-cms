# Project AI Memory & Engineering Context
## MOTORIST Blog + Content Management System (CMS)

---

### Project Identity & Vision
- **Project Name:** MOTORIST Blog + CMS
- **Reference Website:** [MOTORIST Store](https://motoriststore.com/)
- **Core Purpose:** High-performance, SEO-optimized editorial platform and content management system for the MOTORIST motorcycle performance parts & lifestyle brand.
- **Brand Continuity:** Bridges enthusiast technical journalism (guides, mods, touring builds) with e-commerce conversion to `motoriststore.com`.

---

### Approved Technology Stack
- **Framework:** Next.js (App Router, React 19 / Server Components + Server Actions)
- **Language:** TypeScript (`strict: true`, no `any`)
- **Styling:** Tailwind CSS (Tokens aligned with MOTORIST store design properties)
- **Database:** MySQL 8.0+
- **ORM:** Prisma ORM
- **Backend Architecture:** Unified Next.js full-stack (Server Actions for mutations, Route Handlers for external APIs/uploads; NO separate Node.js backend)
- **Validation:** Zod (shared across client and server boundaries)
- **Sanitization:** `isomorphic-dompurify` (mandatory for all rendered markdown/HTML)

---

### Core Architecture & Database Decisions
1. **Unified Application:** Avoid separate microservice backend. Next.js App Router handles both public SSR/ISR routes and the secure `/admin` CMS.
2. **Database Engine & ORM:** MySQL 8.0 with Prisma ORM. Models: `User`, `Category`, `Tag`, `Blog`, `BlogTag`, `Comment`, `BlogLike`, `Media`, `Setting`.
3. **Comment Threading:** Self-referencing relationship on `Comment` (`parentId` field) capped at 2-tier depth (root comments + 1-level nested replies) to protect mobile layout integrity.
4. **Like System:** Public article likes (`BlogLike`) allowed with optimistic UI; duplicate spam throttled using SHA-256 hash of `(Client IP + User-Agent + Server Salt)` stored in `BlogLike` table (`@@unique([blogId, identifierHash])`) plus `localStorage` persistence.
5. **Search Architecture:** MySQL Native Full-Text Search on `(title, excerpt, content)` with debounced (250ms) client autocomplete (`Ctrl+K` command dialog).
6. **Publishing & Scheduling:** Post statuses: `DRAFT`, `SCHEDULED`, `PUBLISHED`, `ARCHIVED`. Scheduled releases executed via authenticated cron endpoint `/api/v1/cron/publish`.

---

### Brand Design Tokens (Reference: motoriststore.com)
- **Typography:**
  - Body: `Jost, sans-serif` (weights: 400, 500, 600, 700)
  - Headings: `Open Sans, sans-serif` & `Jost, sans-serif`
  - Specs / Code: `JetBrains Mono, monospace`
- **Color Palette:**
  - Chassis Charcoal (Primary Dark): `#1E2024`
  - Brand Dark Contrast: `#2B2C2D`
  - Titanium Taupe (Warm Neutral): `#C2B7AC` / `#B7ACA2`
  - Racing Amber (Active Accent / Focus / Badges): `#E05A2B`
  - Gunmetal Slate: `#323841`
  - Page Background (Light Mode): `#F8F9FA`
  - Surface Card Background: `#FFFFFF`
- **Geometry & Radii:**
  - Buttons & Inputs: `6px` (`rounded-md`)
  - Badges & Pills: `40px` (`rounded-full`)
  - Content Cards & Media: `8px` (`rounded-lg`)
  - Max Container Width: `1200px` (`max-w-7xl` / `120rem`)
  - Article Prose Reading Width: `740px` (`max-w-3xl`)

---

### Strict Engineering Rules & Constraints
1. **Server Components First:** Write React Server Components by default. Keep `"use client"` pushed to leaf components (Like button, Comment form, Search modal, Editor toolbar).
2. **Never Commit Secrets:** Zero secrets in code or docs. All sensitive values (DB credentials, session secrets, cron tokens) reside in `.env.local` validated by Zod at startup.
3. **No Arbitrary Magic Values:** Use defined Tailwind utility classes that correspond to the MOTORIST design tokens.
4. **Mandatory Sanitization:** Always sanitize user inputs and markdown output using DOMPurify before DOM injection.
5. **Soft / Protected Deletes:** Never delete categories containing active articles.

---

### Record of Approved Architecture Decisions
1. **Comment Moderation:** **Approved — Option A (100% Pre-Moderation)**. All public comments default to `PENDING` and require admin review before publication.
2. **Spam Defense:** **Approved — Option A (Cloudflare Turnstile + Honeypot)**. Multi-layer bot prevention without user friction.
3. **Media Storage Backend:** **Approved — Option A (Local disk for dev; Cloudflare R2 for prod)**. S3-compatible API client abstraction with zero egress bandwidth fees.
4. **Anonymous Likes:** **Approved — Option A (Composite SHA-256 Hash + localStorage)**. Prevents vote inflation without storing raw IP PII.
5. **Comment Liking Scope:** **Approved — Option B (Deferred to Future Scope)**. MVP focuses exclusively on article-level likes (`BlogLike`).
6. **Admin Role Capability:** **Approved — Option A (Single Admin tier for MVP)**. Full editorial access for team members; schema future-proofed with `Role` enum for zero-migration RBAC expansion.

---

### Current Development Phase & Status
- **Active Phase:** **Phase 2 — Design System & UI Foundations Complete**
- **Status:** **PHASE 2 COMPLETE / READY FOR PHASE 3 REVIEW**
- **Next Step:** Database & Backend Architecture (Phase 3: MySQL provisioning, Prisma schema implementation, and initial migrations) upon user approval.

---

### Instructions for AI Coding Sessions
1. **Do not begin application implementation until explicitly directed by the user.**
2. When starting implementation, execute tasks strictly in accordance with the logical dependency graph in `docs/TASKS.md`.
3. Read the relevant section of `docs/RULES.md` and `docs/DESIGN.md` before generating or modifying any UI components or API endpoints.
4. Update `docs/TASKS.md` status flags as implementation milestones are completed and verified.
