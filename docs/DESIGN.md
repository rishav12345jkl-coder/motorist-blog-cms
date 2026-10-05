# UI/UX Design System Specification
## MOTORIST Blog + Content Management System (CMS)

---

### Document Control
- **Document Version:** 1.0.0
- **Status:** Approved Specification
- **Primary Brand Reference:** [MOTORIST Store](https://motoriststore.com/)
- **Visual Design Identity:** Modern Industrial Performance / Editorial Precision
- **Lead Architect:** Antigravity AI (Lead Product Architect & Senior Software Engineer)

---

## 1. Brand Analysis & Visual Philosophy

### 1.1 Brand Identity & Personality
The MOTORIST brand embodies **raw mechanical performance, utilitarian precision, and modern adventure**. Unlike generic lifestyle blogs or sterile software publications, MOTORIST's identity is rooted in the tactile reality of high-performance motorcycles—anodized billet aluminum, brushed stainless steel exhausts, deep matte carbon fiber, and dusty highway asphalt.

- **Tone & Mood:** Direct, technical, authoritative, adventurous, and passionate.
- **Visual Philosophy:** Form follows function. High-contrast typography, generous negative space, crisp technical borders, minimal ornamental fluff, and high-impact motorcycle photography.
- **Continuity with motoriststore.com:** The blog acts as the technical journal of the MOTORIST store. It inherits the brand's distinct typography (Jost + Open Sans), dark charcoal contrasts (`#2B2C2D`), sand/titanium neutrals (`#B7ACA2` / `#C2B7AC`), and crisp corner radii, while elevating the editorial reading experience with dedicated long-form typography tokens and interactive community elements.

---

## 2. Color Palette & Design Tokens

The color system is derived directly from the MOTORIST store design tokens with curated extensions for editorial publishing and dark/light contrast.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        MOTORIST COLOR SYSTEM                           │
├─────────────────┬──────────────────┬─────────────────┬─────────────────┤
│ Dark Charcoal   │ Titanium Taupe   │ Asphalt Slate   │ Racing Amber    │
│ #1E2024         │ #C2B7AC          │ #323841         │ #E05A2B         │
│ (Primary Dark)  │ (Warm Neutral)   │ (Gunmetal)      │ (Active Accent) │
└─────────────────┴──────────────────┴─────────────────┴─────────────────┘
```

### 2.1 Core Palette Tokens

```css
:root {
  /* Brand Core Solids */
  --color-brand-black: #121316;        /* Deepest chassis black */
  --color-brand-charcoal: #1E2024;     /* Primary text & dark background */
  --color-brand-contrast: #2B2C2D;     /* Secondary dark surface / border */
  --color-brand-taupe: #C2B7AC;        /* Warm titanium taupe (from motoriststore.com) */
  --color-brand-taupe-light: #E7E3DF;  /* Muted sand background */
  --color-brand-slate: #323841;        /* Industrial gunmetal accent */
  --color-brand-amber: #E05A2B;        /* Racing amber / high-vis indicator */
  --color-brand-amber-hover: #C84B1F;  /* Darker amber for hover states */

  /* Neutral Backgrounds & Surfaces */
  --color-bg-base: #F8F9FA;            /* Clean off-white editorial page base */
  --color-bg-surface: #FFFFFF;         /* Crisp card / container surface */
  --color-bg-surface-subtle: #F1F3F5;  /* Subtle secondary card background */
  --color-border-subtle: rgba(43, 44, 45, 0.08); /* Minimal border */
  --color-border-medium: rgba(43, 44, 45, 0.16); /* Input / Card border */
  --color-border-strong: rgba(43, 44, 45, 0.35); /* Focus / Outline */

  /* Typography Text Colors */
  --color-text-primary: #1E2024;       /* Main headings and critical text */
  --color-text-secondary: #525866;     /* Body prose and metadata */
  --color-text-muted: #868C98;         /* Timestamps, tags, captions */
  --color-text-inverse: #FFFFFF;       /* White text on dark elements */

  /* Feedback & Functional States */
  --color-feedback-success: #10B981;   /* Emerald 500 */
  --color-feedback-warning: #F59E0B;   /* Amber 500 */
  --color-feedback-error: #EF4444;     /* Rose Red 500 */
  --color-feedback-info: #3B82F6;      /* Blue 500 */
}
```

---

## 3. Typography & Font Hierarchy

### 3.1 Font Families
- **Body & Prose Font:** `Jost, sans-serif` (Identical to `motoriststore.com`, weights: 400 Regular, 500 Medium, 600 SemiBold, 700 Bold).
- **Headings & Technical Labels:** `Open Sans, sans-serif` and `Jost, sans-serif` (Clean geometric forms for headers, specs, and badges).
- **Code & Specs Monospace:** `JetBrains Mono, Menlo, monospace` (For torque specs, wiring diagrams, and technical part numbers).

### 3.2 Type Scale

| Style / Element | Font Family | Size | Weight | Line Height | Tracking |
|---|---|---|---|---|---|
| **Display H1 (Hero)** | Jost | 40px – 48px (`2.5rem – 3.0rem`) | 700 Bold | 1.15 | -0.025em |
| **Article Title H1** | Jost | 32px – 40px (`2.0rem – 2.5rem`) | 700 Bold | 1.20 | -0.02em |
| **Section H2** | Jost | 24px – 28px (`1.5rem – 1.75rem`) | 700 Bold | 1.25 | -0.015em |
| **Sub-section H3** | Jost | 20px – 22px (`1.25rem – 1.375rem`)| 600 SemiBold | 1.35 | -0.01em |
| **Component H4** | Jost | 16px – 18px (`1.0rem – 1.125rem`) | 600 SemiBold | 1.40 | normal |
| **Article Body Lead** | Jost | 18px – 20px (`1.125rem – 1.25rem`) | 400 Regular | 1.65 | normal |
| **Article Body Text** | Jost | 16px (`1.0rem`) | 400 Regular | 1.75 | +0.01em |
| **Caption / Meta** | Jost | 13px – 14px (`0.8125rem – 0.875rem`)| 500 Medium | 1.40 | +0.02em |
| **Badge / Pill Tag** | Jost | 12px (`0.75rem`) | 600 SemiBold | 1.00 | +0.05em (Uppercase) |
| **Monospace Spec** | JetBrains Mono | 13px (`0.8125rem`) | 500 Medium | 1.50 | normal |

---

## 4. Spacing, Grid & Layout System

### 4.1 Spacing Scale (4px Baseline)
`4px` (`space-1`), `8px` (`space-2`), `12px` (`space-3`), `16px` (`space-4`), `24px` (`space-6`), `32px` (`space-8`), `48px` (`space-12`), `64px` (`space-16`), `96px` (`space-24`).

### 4.2 Layout Widths
- **Max Page Container:** `1200px` (`max-w-7xl` or `120rem` matching MOTORIST layout token `--page-width: 120rem`).
- **Article Reading Column:** Optimal reading width `740px` (`max-w-3xl`) to maintain 65–75 characters per line.
- **Article Layout with Sticky Sidebar:** Total `1140px` (Main article `740px` + Gap `48px` + Sticky TOC/Author Sidebar `352px`).
- **Admin Dashboard Width:** Full fluid width with max bounds `1600px`.

### 4.3 Border Radius Tokens
Directly aligned with MOTORIST store CSS custom properties:
- **Buttons:** `6px` (`--buttons-radius: 6px;` / `rounded-md`)
- **Inputs & Fields:** `6px` (`--inputs-radius: 6px;` / `rounded-md`)
- **Cards & Media:** `8px` (`--media-radius: 8px;` / `rounded-lg`)
- **Pills & Badges:** `40px` (`--variant-pills-radius: 40px;` / `rounded-full`)

### 4.4 Shadows & Elevations
- **Subtle (Cards):** `0 1px 3px rgba(0, 17, 40, 0.04), 0 1px 2px rgba(0, 17, 40, 0.02)`
- **Hover Elevation:** `0 6px 16px rgba(0, 17, 40, 0.08)`
- **Modal / Floating Drawer:** `0 12px 32px rgba(0, 17, 40, 0.16)`

---

## 5. Core UI Component Specifications

### 5.1 Buttons
- **Primary Action (Brand Dark):** Background `#1E2024`, text `#FFFFFF`, border `1px solid #1E2024`, radius `6px`. On hover: Background `#2B2C2D`.
- **Accent Action (Racing Amber):** Background `#E05A2B`, text `#FFFFFF`, radius `6px`. On hover: Background `#C84B1F`.
- **Secondary (Outline):** Background transparent, text `#1E2024`, border `1px solid rgba(43,44,45,0.2)`, radius `6px`. On hover: Background `#F1F3F5`.
- **Ghost:** Background transparent, text `#525866`, radius `6px`. On hover: Background `#F1F3F5`, text `#1E2024`.
- **Category / Tag Pills:** Height `28px`, padding `0 12px`, radius `40px` (full pill), text `12px` uppercase font-semibold, background `#F1F3F5`, text `#2B2C2D`. On hover: Background `#C2B7AC`, text `#1E2024`.

### 5.2 Form Inputs & Controls
- **Text Input & Textarea:** Background `#FFFFFF`, border `1px solid rgba(43,44,45,0.2)`, radius `6px`, padding `10px 14px`, text `15px`.
- **Focus State:** Border color `#E05A2B`, ring `2px solid rgba(224, 90, 43, 0.20)` (Racing amber focus ring).
- **Error State:** Border color `#EF4444`, ring `2px solid rgba(239, 68, 68, 0.20)`.

### 5.3 Blog Cards
- **Structure:**
  - Thumbnail container with fixed 16:9 ratio, overflow hidden, radius `8px`.
  - Image smoothly scales (`scale-105`) on card hover with 300ms cubic-bezier transition.
  - Category pill floating top-left over image or positioned above headline.
  - Headline: 2-line clamp (`line-clamp-2`), font-bold, `#1E2024`.
  - Excerpt: 3-line clamp (`line-clamp-3`), font-normal, text `#525866`.
  - Footer meta row: Author avatar (24x24 circle), author name, publication date bullet, reading time badge, and heart like counter.

### 5.4 E-Commerce Product Embed Card (MOTORIST Store Callout)
- Designed to feel like a high-end product card from `motoriststore.com`.
- **Visuals:** Dark stone surface (`#1E2024` or `#F8F9FA`), subtle metallic border, product image (square 1:1), title (e.g., "AKRAPOVIC SLIP-ON EXHAUST - KTM DUKE 390"), fitment badge ("Guaranteed Fit: Gen-3"), price display ("₹34,999"), and primary CTA button: *"View on Store →"*.

---

## 6. Page Layout & Section Blueprints

### 6.1 Header & Brand Navigation
```
┌────────────────────────────────────────────────────────────────────────┐
│ [Brand Bar: "OFFICIAL MOTORIST JOURNAL — UPGRADE YOUR RIDE AT MOTORISTSTORE.COM ↗"] │
├────────────────────────────────────────────────────────────────────────┤
│ [MOTORIST]   All Stories  Guides  Exhausts & Mods  Gear  [Shop Store ↗] │
│                                                [Search Ctrl+K] [Likes] │
└────────────────────────────────────────────────────────────────────────┘
```
- **Top Announcement / Continuity Bar:** Charcoal background (`#121316`), white uppercase typography (`12px`), highlighting store link and free shipping perks.
- **Main Nav Header:** White background with subtle bottom border (`rgba(0,0,0,0.06)`). Sticky on scroll.
- **Brand Logo:** Distinctive "MOTORIST" bold typography referencing store branding.
- **Nav Links:** High-contrast links with active bottom indicator line.
- **Store CTA Button:** Pill button with arrow icon linking directly to `https://motoriststore.com/`.

### 6.2 Blog Post Detail Blueprint
```
┌────────────────────────────────────────────────────────────────────────┐
│ Breadcrumb: Home > Guides > Himalayan 450 Touring Setup               │
│                                                                        │
│ [CATEGORY PILL]                                                        │
│ The Ultimate Himalayan 450 Touring Setup: Racks, LED Lighting & Crash Protection │
│                                                                        │
│ [Author Avatar] Arjun Mehta • Oct 5, 2026 • 8 Min Read • [♥ 142 Likes]│
├────────────────────────────────────────────────────────────────────────┤
│ [Featured Image: Full Width 16:9 Crisp Photography]                    │
├──────────────────────────────────────┬─────────────────────────────────┤
│ [Sticky Social Share Bar]            │ [STICKY SIDEBAR (Desktop)]      │
│  [♥ Like 142]                        │  Table of Contents              │
│  [WhatsApp]                          │  • Introduction                 │
│  [X / Twitter]                       │  • Luggage Rack Selection       │
│  [Copy Link]                         │  • Auxiliary LED Wiring         │
│                                      │  • Crash Protection Checklist   │
│ [Article Prose Body (max-w-3xl)]     │                                 │
│  Lead Paragraph...                   │ [MOTORIST Store Featured Part]  │
│  H2 Subheading                       │  Akrapovic Exhaust              │
│  Detailed text, technical specs      │  ₹34,999 [Shop Now ↗]           │
│  Callout Box: "Torque Specs: 22Nm"   │                                 │
│  Image Comparison                    │                                 │
│  Embedded Product Card               │                                 │
├──────────────────────────────────────┴─────────────────────────────────┤
│ [Author Bio Card]                                                      │
├────────────────────────────────────────────────────────────────────────┤
│ [Interactive Comments Section (Threaded 2-Level)]                      │
├────────────────────────────────────────────────────────────────────────┤
│ [Related Articles Grid (3 Cards)]                                      │
└────────────────────────────────────────────────────────────────────────┘
```

### 6.3 Like Button Interaction Design
- **Idle State:** Heart icon (outline `#525866`) with count number.
- **Click Action:**
  - Micro-animation: Heart scales to `1.35x` with spring bounce, then settles to `1.0x`.
  - Fill color transitions to vibrant crimson/amber (`#E05A2B`).
  - Count text increments by `+1` with a subtle vertical slide-in motion.
  - Toast message: *"Thanks for your feedback!"*.

### 6.4 Threaded Comment UI
- **List Structure:** Root comments have standard left alignment. Replies are indented `32px` on desktop and `16px` on mobile, with a subtle vertical connecting guide line.
- **Comment Card:**
  - Author initial avatar with auto-generated distinct background color.
  - Author name + submission timestamp ("2 hours ago").
  - Content formatted with readable paragraph spacing.
  - "Reply" button that toggles an inline reply form directly beneath the comment.
- **Form:**
  - Name and Email in a 2-column grid on desktop, single-column on mobile.
  - Multi-line textarea with character counter.
  - Clear submit button with loading spinner state.
  - Notice text: *"Your email will never be published. Comments are held for moderation."*

### 6.5 Admin CMS Interface Design
- **Theme:** Clean, high-focus productivity interface with dark sidebar (`#1E2024`) and light content canvas (`#F8F9FA`).
- **Sidebar:** Collapsible, containing brand emblem, navigation items (Dashboard, Articles, Categories, Tags, Media, Comments, Settings), and user profile popover.
- **Post Editor:**
  - Title input: Borderless, large display font (`32px`) at the top of the canvas.
  - Split Editor: Side-by-side or tabbed view (Edit Markdown / Rendered Preview).
  - Floating/Sticky Right Rail: Status pill, publish/schedule button, slug editor, category dropdown, tag pills, featured image upload dropzone, and SEO score card with Google SERP preview.

---

## 7. Responsive Breakpoint Behavior

- **Mobile (< 768px):**
  - Navigation collapses into an off-canvas drawer with smooth slide-in from right.
  - Hero layout stacks vertically: Image on top, title and excerpt beneath.
  - Article reading width expands to `100%` with `16px` horizontal padding.
  - Sticky sidebar disappears; Table of Contents becomes an accordion at the top of the article.
  - Social share bar pins to the bottom of the screen as a compact pill floating over content.
- **Tablet (768px – 1023px):**
  - 2-column article grid.
  - Search command accessible via icon trigger.
- **Desktop (1024px+):**
  - Full 3-column article grid on archives.
  - Sticky sidebars enabled for article reading (TOC on right, Share bar on left).

---

## 8. Feedback & State Systems

1. **Loading Skeletons:** Animated shimmering skeletons mimicking exact article card and text typography line heights to eliminate layout shifts (zero CLS).
2. **Empty States:** Clean illustration or minimalist icon (e.g. search magnifying glass with motorcycle tire tread) with helpful copy: *"No articles found for 'xyz'. Try searching for 'Himalayan', 'Exhaust', or 'LED'."*
3. **Error States:** Informative banners with retry buttons for failed network requests.
4. **Toast Notifications:** Fixed bottom-right notification stack powered by Sonner or custom toast primitive (Success, Error, Info, Warning) with progress countdown bar.
