'use client';

import * as React from 'react';
import { BrandBar } from '@/components/layout/brand-bar';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { MobileNav } from '@/components/layout/mobile-nav';
import { FeaturedHero } from '@/components/blog/featured-hero';
import { BlogCard } from '@/components/blog/blog-card';
import { ProductEmbedCard } from '@/components/blog/product-embed-card';
import { LikeButton } from '@/components/blog/like-button';
import { ShareBar } from '@/components/blog/share-bar';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { CommentSection } from '@/components/comments/comment-section';
import { SearchModal } from '@/components/search/search-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { BlogCardSkeleton } from '@/components/ui/skeleton';
import {
  mockAuthor,
  mockFeaturedPost,
  mockPosts,
  mockProductEmbed,
  mockComments,
  mockCategories,
} from '@/lib/mock-data';
import {
  Layers,
  Palette,
  Type,
  Layout,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Search,
  Wrench,
  Shield,
  Eye,
} from 'lucide-react';

export default function DesignSystemAndBlogShowcase() {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [activeTab, setActiveTab] = React.useState<'live-preview' | 'design-foundations'>('live-preview');

  // Keyboard shortcut for Cmd+K / Ctrl+K
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const sampleToc = [
    { id: 'sec-1', title: '1. Why the Himalayan 450 Needs Upgraded Armor', level: 2 as const },
    { id: 'sec-2', title: '2. Crash Guard Fitment & Torque Specs', level: 2 as const },
    { id: 'sec-3', title: '2.1 Bracket Clearance Check', level: 3 as const },
    { id: 'sec-4', title: '3. Auxiliary LED Headlight Wiring Relay', level: 2 as const },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface-base">
      {/* 1. Global Announcement / Continuity Bar */}
      <BrandBar />

      {/* 2. Global Sticky Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleMobileNav={() => setIsMobileNavOpen(!isMobileNavOpen)}
        isMobileNavOpen={isMobileNavOpen}
      />

      {/* 3. Mobile Navigation Drawer */}
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />

      {/* 4. Instant Search Dialog */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        samplePosts={[mockFeaturedPost, ...mockPosts]}
      />

      {/* Phase 2 Showcase Controller Banner */}
      <div className="bg-brand-charcoal text-white py-4 px-4 border-b border-brand-contrast">
        <div className="max-w-page mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold font-mono uppercase tracking-wider text-brand-taupe">
              Phase 2 Active:
            </span>
            <span className="text-neutral-300">
              Visual Design System & UI Foundations Verified (No Backend / Zero DB)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('live-preview')}
              className={`h-7 px-3 rounded-pill font-semibold transition-colors ${
                activeTab === 'live-preview'
                  ? 'bg-brand-amber text-white'
                  : 'bg-brand-black text-neutral-400 hover:text-white'
              }`}
            >
              Public Blog Layouts
            </button>
            <button
              onClick={() => setActiveTab('design-foundations')}
              className={`h-7 px-3 rounded-pill font-semibold transition-colors ${
                activeTab === 'design-foundations'
                  ? 'bg-brand-amber text-white'
                  : 'bg-brand-black text-neutral-400 hover:text-white'
              }`}
            >
              29 UI Tokens & Primitives Inspector
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-page w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
        {activeTab === 'live-preview' ? (
          <>
            {/* Featured Blog Layout */}
            <section className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-surface-border">
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-brand-amber" />
                  <span className="text-xs font-mono uppercase tracking-widest font-bold text-brand-charcoal">
                    Featured Lead Story
                  </span>
                </div>
                <span className="text-xs text-neutral-500 font-mono">
                  Optimized 16:9 Hero Canvas
                </span>
              </div>
              <FeaturedHero post={mockFeaturedPost} />
            </section>

            {/* Category Filter Tabs */}
            <section className="space-y-6 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-surface-border">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-brand-charcoal">
                    Latest Garage Dispatches
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Real-world motorcycle tuning, dyno breakdowns, and install tutorials.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {mockCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`h-8 px-3.5 rounded-pill text-xs font-bold uppercase tracking-wider transition-all duration-150 ${
                        selectedCategory === cat.slug
                          ? 'bg-brand-charcoal text-white shadow-sm'
                          : 'bg-surface-subtle text-neutral-600 hover:bg-brand-taupe hover:text-brand-black'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3-Column Responsive Blog Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {mockPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </section>

            {/* Editorial Reading Layout Demonstration (Article Body + Sticky TOC + Product Embed) */}
            <section className="pt-10 border-t-2 border-surface-border space-y-8">
              <div className="rounded-btn bg-brand-taupe-light/50 border border-brand-taupe p-4 text-xs text-brand-charcoal flex items-center justify-between">
                <span className="font-bold font-mono uppercase">
                  Article Reading Page Experience Blueprint
                </span>
                <span className="text-neutral-600">
                  Optimal 740px Reading Width • 1.75 Line Height • Sticky TOC
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Main Article Reading Column */}
                <div className="lg:col-span-8 max-w-reading space-y-6">
                  <div className="space-y-3">
                    <Badge variant="accent">Performance Mods</Badge>
                    <h1 className="font-heading text-3xl sm:text-4xl font-extrabold leading-tight text-brand-charcoal">
                      Akrapovic Slip-On Exhaust Install & Sound Test on KTM Duke 390 Gen-3
                    </h1>
                    <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-surface-border">
                      <div className="flex items-center gap-3">
                        <img
                          src={mockAuthor.avatarUrl}
                          alt={mockAuthor.name}
                          className="h-9 w-9 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-xs font-bold text-brand-charcoal">{mockAuthor.name}</p>
                          <p className="text-[11px] text-neutral-500">Oct 2, 2026 • 6 min read</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <LikeButton initialCount={89} />
                        <ShareBar title="Akrapovic Exhaust Install Guide" />
                      </div>
                    </div>
                  </div>

                  {/* Prose Body */}
                  <div className="space-y-5 text-neutral-700 leading-relaxed text-base">
                    <p className="text-lg text-brand-charcoal font-medium leading-relaxed">
                      The redesigned 399cc LC4c single in the 2024–2026 KTM Duke 390 produces a formidable 45 bhp, but the factory underbelly chamber significantly mutes the motor’s raw bark. Here is how bolt-on performance changes the dynamic.
                    </p>

                    <h2 id="sec-1" className="font-heading text-2xl font-bold text-brand-charcoal pt-4">
                      1. Why the Himalayan 450 Needs Upgraded Armor
                    </h2>
                    <p>
                      When descending rocky terrain, the front tire kicks up heavy gravel directly into the oil filter housing and header pipe. Installing high-grade aluminum protection is essential before tackling any rugged trails.
                    </p>

                    {/* Spec Check Callout */}
                    <div className="my-6 rounded-card border-l-4 border-brand-amber bg-white p-4 sm:p-5 shadow-subtle space-y-1">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-brand-amber">
                        <Wrench className="h-4 w-4" />
                        <span>Torque Spec Checklist</span>
                      </div>
                      <p className="text-sm font-mono text-brand-charcoal">
                        Header Flange Bolts: <strong>14 Nm</strong> | Mid-Pipe Clamp: <strong>22 Nm</strong> | Carbon Hanger Bracket: <strong>19 Nm</strong>
                      </p>
                    </div>

                    {/* Signature MOTORIST Product Embed Card */}
                    <ProductEmbedCard product={mockProductEmbed} />

                    <h2 id="sec-2" className="font-heading text-2xl font-bold text-brand-charcoal pt-4">
                      2. Crash Guard Fitment & Torque Specs
                    </h2>
                    <p>
                      Ensure all mounting spacers are lubricated with anti-seize compound. Fasten bolts hand-tight before applying the final torque wrench passes in a criss-cross pattern.
                    </p>
                  </div>

                  {/* Comments Section */}
                  <CommentSection comments={mockComments} />
                </div>

                {/* Sticky Sidebar (Table of Contents + Author Card) */}
                <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                  <TableOfContents items={sampleToc} activeId="sec-1" />

                  {/* Author Box Card */}
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-3">
                      <img
                        src={mockAuthor.avatarUrl}
                        alt={mockAuthor.name}
                        className="h-12 w-12 rounded-full object-cover border border-surface-border"
                      />
                      <div>
                        <CardTitle className="text-base">{mockAuthor.name}</CardTitle>
                        <CardDescription className="text-xs text-brand-amber font-mono font-semibold">
                          {mockAuthor.role}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        {mockAuthor.bio}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
          </>
        ) : (
          /* ===============================================================
             29 UI Foundations & Design Tokens Inspector
             =============================================================== */
          <div className="space-y-12">
            <div className="pb-4 border-b border-surface-border">
              <h2 className="font-heading text-2xl font-bold text-brand-charcoal flex items-center gap-2">
                <Palette className="h-6 w-6 text-brand-amber" />
                <span>Phase 2 Design System Tokens & Foundations</span>
              </h2>
              <p className="text-sm text-neutral-600 mt-1">
                Visual analysis, token mapping, component states, and accessibility standards derived from motoriststore.com.
              </p>
            </div>

            {/* 1. Color System */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-brand-amber" />
                  <span>1. Color Palette Tokens</span>
                </CardTitle>
                <CardDescription>
                  Exact HEX values matching the MOTORIST brand palette documented in docs/DESIGN.md.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                  <div className="space-y-1.5 p-3 rounded-btn bg-white border border-surface-border">
                    <div className="h-10 w-full rounded bg-brand-charcoal" />
                    <p className="text-xs font-bold text-brand-charcoal">Charcoal</p>
                    <p className="text-[11px] font-mono text-neutral-500">#1E2024</p>
                    <span className="text-[10px] text-neutral-400">Primary Dark</span>
                  </div>
                  <div className="space-y-1.5 p-3 rounded-btn bg-white border border-surface-border">
                    <div className="h-10 w-full rounded bg-brand-contrast" />
                    <p className="text-xs font-bold text-brand-charcoal">Contrast</p>
                    <p className="text-[11px] font-mono text-neutral-500">#2B2C2D</p>
                    <span className="text-[10px] text-neutral-400">Dark Border</span>
                  </div>
                  <div className="space-y-1.5 p-3 rounded-btn bg-white border border-surface-border">
                    <div className="h-10 w-full rounded bg-brand-taupe" />
                    <p className="text-xs font-bold text-brand-charcoal">Taupe</p>
                    <p className="text-[11px] font-mono text-neutral-500">#C2B7AC</p>
                    <span className="text-[10px] text-neutral-400">Warm Titanium</span>
                  </div>
                  <div className="space-y-1.5 p-3 rounded-btn bg-white border border-surface-border">
                    <div className="h-10 w-full rounded bg-brand-amber" />
                    <p className="text-xs font-bold text-brand-charcoal">Amber</p>
                    <p className="text-[11px] font-mono text-neutral-500">#E05A2B</p>
                    <span className="text-[10px] text-neutral-400">Racing Accent</span>
                  </div>
                  <div className="space-y-1.5 p-3 rounded-btn bg-white border border-surface-border">
                    <div className="h-10 w-full rounded bg-brand-slate" />
                    <p className="text-xs font-bold text-brand-charcoal">Slate</p>
                    <p className="text-[11px] font-mono text-neutral-500">#323841</p>
                    <span className="text-[10px] text-neutral-400">Gunmetal</span>
                  </div>
                  <div className="space-y-1.5 p-3 rounded-btn bg-white border border-surface-border">
                    <div className="h-10 w-full rounded bg-surface-base border border-neutral-300" />
                    <p className="text-xs font-bold text-brand-charcoal">Base Surface</p>
                    <p className="text-[11px] font-mono text-neutral-500">#F8F9FA</p>
                    <span className="text-[10px] text-neutral-400">Page Background</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2 & 3. Typography & Hierarchy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="h-5 w-5 text-brand-amber" />
                  <span>2 & 3. Typography Scale & Font Hierarchy</span>
                </CardTitle>
                <CardDescription>
                  Jost for body prose • Open Sans for technical headings • JetBrains Mono for specs.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1 pb-3 border-b border-surface-border">
                  <span className="text-[11px] font-mono text-neutral-400">Display H1 (2.5rem / 40px)</span>
                  <h1 className="text-4xl font-extrabold text-brand-charcoal">MOTORIST PERFORMANCE JOURNAL</h1>
                </div>
                <div className="space-y-1 pb-3 border-b border-surface-border">
                  <span className="text-[11px] font-mono text-neutral-400">Section H2 (1.75rem / 28px)</span>
                  <h2 className="text-2xl font-bold text-brand-charcoal">Himalayan 450 Expedition Build Guide</h2>
                </div>
                <div className="space-y-1 pb-3 border-b border-surface-border">
                  <span className="text-[11px] font-mono text-neutral-400">Subsection H3 (1.25rem / 20px)</span>
                  <h3 className="text-xl font-semibold text-brand-charcoal">Torque Specifications & Mounting Clearance</h3>
                </div>
                <div className="space-y-1 pb-3 border-b border-surface-border">
                  <span className="text-[11px] font-mono text-neutral-400">Body Text (1.0rem / 16px / line-height 1.75)</span>
                  <p className="text-base text-neutral-700 leading-relaxed">
                    Designed to withstand extreme vibration on washboard trails, precision-engineered brackets eliminate fatigue cracking over thousands of kilometers.
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-neutral-400">Technical Monospace Spec (13px JetBrains Mono)</span>
                  <p className="font-mono text-xs text-neutral-800 bg-surface-subtle p-2 rounded border border-surface-border">
                    SPEC: DIN 912 M8x45 A2-70 STAINLESS | TORQUE: 22.5 Nm ± 1.0 Nm
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 4, 5, 6, 7. Spacing, Grids, Radius, Shadows */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">6. Border Radius System</CardTitle>
                  <CardDescription>Aligned with motoriststore.com CSS variables</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-btn bg-surface-subtle border border-surface-border">
                    <span className="text-xs font-bold">Buttons & Inputs</span>
                    <span className="text-xs font-mono bg-white px-2 py-0.5 rounded border">6px (rounded-btn)</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-card bg-surface-subtle border border-surface-border">
                    <span className="text-xs font-bold">Cards & Media Containers</span>
                    <span className="text-xs font-mono bg-white px-2 py-0.5 rounded border">8px (rounded-card)</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-pill bg-surface-subtle border border-surface-border">
                    <span className="text-xs font-bold">Badges & Filter Pills</span>
                    <span className="text-xs font-mono bg-white px-2 py-0.5 rounded border">40px (rounded-pill)</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">7. Shadow & Elevation Tokens</CardTitle>
                  <CardDescription>Subtle, low-opacity industrial elevations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-white rounded-card shadow-subtle border border-surface-border text-xs flex justify-between">
                    <span className="font-semibold">Subtle Card Shadow</span>
                    <span className="font-mono text-neutral-500">shadow-subtle</span>
                  </div>
                  <div className="p-3 bg-white rounded-card shadow-hover border border-surface-border text-xs flex justify-between">
                    <span className="font-semibold">Hover Elevation Shadow</span>
                    <span className="font-mono text-neutral-500">shadow-hover</span>
                  </div>
                  <div className="p-3 bg-white rounded-card shadow-modal border border-surface-border text-xs flex justify-between">
                    <span className="font-semibold">Modal / Dialog Shadow</span>
                    <span className="font-mono text-neutral-500">shadow-modal</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 8 & 9. Buttons & Inputs Showcase */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sliders className="h-5 w-5 text-brand-amber" />
                  <span>8 & 9. Buttons & Form Input Foundations</span>
                </CardTitle>
                <CardDescription>
                  Interactive states: Default, Hover, Focus Ring, Error, Disabled, and Loading spinners.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Buttons Row */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase text-neutral-400">Button Variants</span>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary">Primary Button</Button>
                    <Button variant="accent">Accent Action</Button>
                    <Button variant="secondary">Secondary Outline</Button>
                    <Button variant="ghost">Ghost Button</Button>
                    <Button variant="danger">Danger</Button>
                    <Button variant="accent" isLoading>Processing</Button>
                    <Button variant="primary" disabled>Disabled</Button>
                  </div>
                </div>

                {/* Form Controls Grid */}
                <div className="space-y-2 pt-2 border-t border-surface-border">
                  <span className="text-xs font-mono uppercase text-neutral-400">Input & Validation States</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input label="Normal Input" placeholder="Type here..." helperText="Focus to inspect Racing Amber ring" />
                    <Input label="Validation Error" value="invalid-email" error="Please enter a valid email address" readOnly />
                    <Input label="Disabled State" value="System Lock" disabled />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 26, 27, 28, 29. Loading, Empty, Error & Accessibility States */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-brand-amber" />
                  <span>26–29. State Systems (Loading, Empty, Error, a11y)</span>
                </CardTitle>
                <CardDescription>
                  High-reliability states guaranteeing zero layout shift (CLS &lt; 0.05) and WCAG AA contrast.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  {/* Loading Skeleton */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase text-neutral-400">
                      26. Shimmer Loading Skeleton State
                    </span>
                    <BlogCardSkeleton />
                  </div>

                  {/* Empty & Error States */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <span className="text-xs font-mono uppercase text-neutral-400">
                        27. Empty Search / Collection State
                      </span>
                      <div className="rounded-card border border-dashed border-surface-border p-6 text-center space-y-2 bg-white">
                        <Search className="h-8 w-8 text-neutral-400 mx-auto" />
                        <h4 className="text-sm font-bold text-brand-charcoal">No Articles Found</h4>
                        <p className="text-xs text-neutral-500">
                          Try searching for "Duke 390", "Himalayan", or "Exhaust"
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-mono uppercase text-neutral-400">
                        28. Network / Validation Error Alert State
                      </span>
                      <div className="rounded-card border border-feedback-error/30 bg-red-50 p-4 text-xs text-feedback-error flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 shrink-0" />
                        <div>
                          <p className="font-bold">Connection Timed Out</p>
                          <p className="text-red-700">Unable to reach the store catalog. Retrying in 5 seconds...</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-mono uppercase text-neutral-400">
                        29. Accessibility Standard (WCAG 2.1 AA)
                      </span>
                      <div className="rounded-card bg-surface-subtle p-3 text-xs text-neutral-700 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>All text passes 4.5:1 contrast ratio. Visible focus outlines on all interactive elements.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 22. Admin CMS UI Foundations Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layout className="h-5 w-5 text-brand-amber" />
                  <span>22. Admin CMS UI Foundations</span>
                </CardTitle>
                <CardDescription>
                  Preview of metrics tiles, post status badges, and management data surfaces.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="rounded-card bg-surface-subtle p-4 border border-surface-border">
                    <p className="text-xs text-neutral-500 font-mono">PUBLISHED ARTICLES</p>
                    <p className="text-2xl font-black text-brand-charcoal mt-1">24</p>
                  </div>
                  <div className="rounded-card bg-surface-subtle p-4 border border-surface-border">
                    <p className="text-xs text-neutral-500 font-mono">PENDING MODERATION</p>
                    <p className="text-2xl font-black text-brand-amber mt-1">7</p>
                  </div>
                  <div className="rounded-card bg-surface-subtle p-4 border border-surface-border">
                    <p className="text-xs text-neutral-500 font-mono">TOTAL BLOG LIKES</p>
                    <p className="text-2xl font-black text-brand-charcoal mt-1">1,480</p>
                  </div>
                  <div className="rounded-card bg-surface-subtle p-4 border border-surface-border">
                    <p className="text-xs text-neutral-500 font-mono">TOTAL SUBSCRIBERS</p>
                    <p className="text-2xl font-black text-brand-charcoal mt-1">542</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-surface-border flex flex-wrap gap-2 items-center">
                  <span className="text-xs font-mono uppercase text-neutral-500 mr-2">Post Status Badges:</span>
                  <Badge variant="accent">PUBLISHED</Badge>
                  <Badge variant="taupe">DRAFT</Badge>
                  <Badge variant="slate">SCHEDULED</Badge>
                  <Badge variant="outline">ARCHIVED</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* 5. Global 4-Column Footer */}
      <Footer />
    </div>
  );
}
