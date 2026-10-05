# Development & Engineering Rules
## MOTORIST Blog + Content Management System (CMS)

---

### Document Control
- **Document Version:** 1.0.0
- **Status:** Enforced
- **Scope:** All engineers, automated tools, and AI coding agents working on the MOTORIST codebase.

---

## 1. General Development Principles

1. **Simplicity Over Cleverness (KISS):** Write transparent, readable code that any senior engineer can understand immediately. Do not introduce premature abstractions.
2. **Don't Repeat Yourself (DRY):** Extract reusable logic into utility functions, hooks, or shared UI primitives only after the third occurrence (Rule of Three).
3. **Fail Fast & Explicitly:** Validate inputs at boundaries (HTTP requests, server actions, environment variables) using Zod schemas. Never allow invalid state to propagate into domain services or database operations.
4. **Zero Tolerance for Secrets in Code:** Never commit passwords, API tokens, database connection strings, or encryption keys to Git or documentation files.
5. **Brand Integrity:** All public UI components must strictly reflect the MOTORIST aesthetic (industrial, rugged, precision-engineered, high-contrast) documented in `docs/DESIGN.md`.

---

## 2. TypeScript Rules

1. **Strict Type Safety:** `tsconfig.json` must enforce `"strict": true`, `"noImplicitAny": true`, and `"strictNullChecks": true`.
2. **Ban on `any`:** The use of `any` is strictly prohibited. Use `unknown` with type narrowing (e.g. `typeof`, `instanceof`, or Zod validation) if types cannot be predetermined.
3. **Interface vs. Type:**
   - Use `interface` for object definitions and component props that can be extended.
   - Use `type` for unions, intersections, primitives, and mapped types.
4. **Explicit Return Types:** All public utility functions, Server Actions, Route Handlers, and API contracts must define explicit return types.
5. **No Non-Null Assertions:** Avoid `!` operator unless guarded immediately beforehand. Prefer optional chaining (`?.`) and nullish coalescing (`??`).

---

## 3. Next.js & React Component Rules

### 3.1 Next.js App Router Rules
1. **Server Components by Default:** Every component in `src/app/` must be a React Server Component (RSC) unless interactivity is explicitly required.
2. **Boundary Minimization for Client Components:** When interactivity is required, push the `"use client"` directive as far down the component tree as possible (e.g., wrap only the Like button icon and counter, not the entire article page).
3. **Image Optimization:** Always use `next/image` (`<Image />`) for rendering images. Never use raw `<img>` tags. Always supply descriptive `alt` text, explicit dimensions (`width`/`height`), or `fill` with appropriate `sizes` attributes.
4. **Font Optimization:** Use `next/font/google` for `Jost` and `Open Sans`. Prevent layout shift by enabling font display swap.
5. **Data Mutations:** Use Next.js **Server Actions** located in `src/actions/` for internal mutations. Every Server Action must validate inputs via Zod, enforce authorization, and call `revalidatePath()` or `revalidateTag()`.

### 3.2 React Component Rules
1. **Functional Components Only:** Class components are forbidden.
2. **Single Responsibility:** Each component must accomplish one focused task. Split complex components exceeding 200 lines into sub-components.
3. **Prop Typing:** Every component must declare its props interface immediately above the component declaration:
   ```typescript
   export interface BlogCardProps {
     post: BlogPostPreview;
     featured?: boolean;
     className?: string;
   }
   export function BlogCard({ post, featured = false, className }: BlogCardProps) { ... }
   ```
4. **Hooks Rules:** Follow standard React Hooks rules. Encapsulate multi-step client state inside custom hooks in `src/hooks/`.

---

## 4. Tailwind CSS Rules

1. **No Arbitrary Magic Values:** Use predefined Tailwind utility classes that align with the MOTORIST design tokens (e.g., use `p-4`, `p-6`, not `p-[17px]`).
2. **Dynamic Class Merging:** Always use the standard `cn()` utility (`clsx` + `tailwind-merge`) when composing conditional or custom class names:
   ```typescript
   import { clsx, type ClassValue } from 'clsx';
   import { twMerge } from 'tailwind-merge';

   export function cn(...inputs: ClassValue[]): string {
     return twMerge(clsx(inputs));
   }
   ```
3. **Mobile-First Responsive Design:** Always write default styles for mobile viewports, applying breakpoint modifiers (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`) progressively.
4. **Design Token Alignment:**
   - Radius: Buttons = `rounded-md` (6px), Badges = `rounded-full` (40px), Cards = `rounded-lg` (8px).
   - Headings: `font-heading font-bold tracking-tight text-neutral-900`.
   - Body: `font-sans text-neutral-700 leading-relaxed`.

---

## 5. Directory & File Organization Rules

The project must strictly adhere to the following directory layout:

```
motorist/
├── docs/                      # Architectural specifications & guidelines
├── prisma/
│   ├── schema.prisma          # Database schema definition
│   ├── migrations/            # Version-controlled SQL migrations
│   └── seed.ts                # Database seed script for development
├── public/
│   ├── images/                # Static brand assets (logos, favicons)
│   └── uploads/               # Local media uploads (gitignored)
├── src/
│   ├── actions/               # Next.js Server Actions (mutations)
│   ├── app/                   # App Router pages and route handlers
│   ├── components/
│   │   ├── ui/                # Base reusable primitives (Button, Input, Modal, Badge)
│   │   ├── blog/              # Public blog components (Hero, BlogCard, LikeButton, TOC)
│   │   ├── comments/          # Comment list, item, reply, and form components
│   │   ├── admin/             # CMS components (Sidebar, PostEditor, MediaLibrary)
│   │   └── layout/            # Site Header, Footer, BrandBar, MobileNav
│   ├── hooks/                 # Reusable client hooks (useDebounce, useMediaQuery)
│   ├── lib/
│   │   ├── prisma.ts          # Singleton Prisma client instance
│   │   ├── auth.ts            # Authentication helpers & session validation
│   │   ├── utils.ts           # Shared utilities (cn, slugify, readingTime)
│   │   ├── sanitize.ts        # DOMPurify sanitizer configurations
│   │   └── validations/       # Shared Zod validation schemas
│   ├── types/                 # TypeScript type declarations
│   └── styles/                # Global CSS & Tailwind layers
├── .env.example               # Template environment configuration (no secrets)
├── next.config.mjs            # Next.js configuration
├── package.json
├── tailwind.config.ts         # Tailwind theme & token extensions
└── tsconfig.json
```

---

## 6. Naming Conventions

| Entity | Convention | Example |
|---|---|---|
| **Components** | `PascalCase` | `BlogCard.tsx`, `CommentSection.tsx` |
| **Component Files** | `PascalCase` or `kebab-case` | `blog-card.tsx` or `BlogCard.tsx` (Consistent `kebab-case` preferred) |
| **Utility Files** | `kebab-case` | `format-date.ts`, `reading-time.ts` |
| **Functions / Methods** | `camelCase` | `calculateReadingTime()`, `formatCurrency()` |
| **Variables / State** | `camelCase` | `isMenuOpen`, `pendingComments` |
| **Constants / Enums** | `SCREAMING_SNAKE_CASE` | `MAX_UPLOAD_SIZE_BYTES`, `DEFAULT_PAGE_SIZE` |
| **TypeScript Types / Interfaces** | `PascalCase` | `BlogPost`, `CommentWithAuthor` |
| **API Route Folders** | `kebab-case` | `/api/v1/search/route.ts` |
| **Prisma Models** | `PascalCase` | `model BlogTag { ... }` |
| **Database Tables** | `snake_case` (via `@@map`) | `@@map("blog_tags")` |
| **Database Columns** | `camelCase` in code, `snake_case` mapped | `createdAt @map("created_at")` |

---

## 7. Prisma & Database Migration Rules

1. **Singleton Client Instance:** Always import the shared Prisma client from `src/lib/prisma.ts` to prevent multiple instances exhausting MySQL connections in hot-reloading:
   ```typescript
   import { PrismaClient } from '@prisma/client';
   const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
   export const prisma = globalForPrisma.prisma || new PrismaClient();
   if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
   ```
2. **Never Edit Existing Migrations:** Once a migration has been applied or committed, never modify its SQL file. Always create a new migration using:
   ```bash
   npx prisma migrate dev --name describe_change
   ```
3. **Foreign Key Integrity:** All relational models must define explicit foreign keys and referential actions (`onDelete: Cascade` or `onDelete: Restrict`).
4. **Soft vs. Hard Deletes:**
   - Articles and Categories: Hard delete only if zero dependencies; otherwise status transitions to `ARCHIVED`.
   - Comments: Comments with replies must be soft-deleted (status set to `REJECTED` or content replaced with `"[This comment was removed]"`) to preserve thread integrity.
5. **Seeding:** The database seed script (`prisma/seed.ts`) must be strictly idempotent and safe to run multiple times without duplicating entries.

---

## 8. API & Mutation Rules

1. **Input Validation:** Every Server Action and API Route Handler must validate the incoming payload against a Zod schema before performing any business logic:
   ```typescript
   export async function submitCommentAction(rawInput: unknown): Promise<ApiResponse<Comment>> {
     const parseResult = commentSchema.safeParse(rawInput);
     if (!parseResult.success) {
       return { success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid comment submission', details: parseResult.error.flatten() } };
     }
     // ... proceed
   }
   ```
2. **Predictable Status Codes:**
   - `200 OK`: Successful read or update.
   - `201 Created`: Successful creation.
   - `400 Bad Request`: Validation failure or malformed payload.
   - `401 Unauthorized`: Missing or invalid session.
   - `403 Forbidden`: Authenticated user lacks permission.
   - `404 Not Found`: Target entity does not exist.
   - `429 Too Many Requests`: Rate limit exceeded.
   - `500 Internal Server Error`: Unhandled infrastructure failure.
3. **Structured Errors:** Never return raw database errors or stack traces to the client. Map all internal errors to safe, human-readable user messages.

---

## 9. Security & Sanitization Rules

1. **Content Sanitization:** Any HTML or user-submitted Markdown rendered in the browser must be thoroughly sanitized using `isomorphic-dompurify`.
2. **Honeypot Validation:** Public forms (comments, contact, likes) must include an invisible honeypot field (e.g. `<input type="text" name="hp_field" className="hidden" tabIndex={-1} autoComplete="off" />`). If this field contains any value, reject the submission silently.
3. **MIME Sniffing Prevention:** Validate file uploads using file signatures (magic bytes) via `file-type`. Do not trust the `Content-Type` header supplied by the browser.
4. **Environment Variable Validation:** Use `@t3-oss/env-nextjs` or a custom Zod schema in `src/env.mjs` to ensure the server crashes immediately at startup if required environment variables are absent.

---

## 10. Git, Testing & AI Coding Rules

### 10.1 Conventional Commits
All Git commit messages must follow the Conventional Commits specification:
- `feat:` A new feature for the user
- `fix:` A bug fix
- `docs:` Documentation only changes
- `style:` Changes that do not affect the meaning of the code (formatting, white-space)
- `refactor:` A code change that neither fixes a bug nor adds a feature
- `perf:` A code change that improves performance
- `test:` Adding missing tests or correcting existing tests
- `chore:` Changes to the build process, dependencies, or auxiliary tools

### 10.2 AI Coding Rules
1. **Never Assume File Structure:** Always list directory contents or view the target file before modifying it.
2. **Targeted Replacements:** Use precise search-and-replace tools rather than replacing entire files.
3. **Preserve Documentation:** Never delete, overwrite, or truncate existing comments, JSDoc headers, or architecture documents without explicit instruction.
4. **Zero Pseudo-Code:** Provide production-ready, complete TypeScript code. Never use placeholder comments like `// TODO: implement later` in core business logic.
