'use client';

import * as React from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface HeaderProps {
  onOpenSearch?: () => void;
  onToggleMobileNav?: () => void;
  isMobileNavOpen?: boolean;
}

export function Header({ onOpenSearch, onToggleMobileNav, isMobileNavOpen }: HeaderProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'All Stories', href: '/' },
    { label: 'Performance Mods', href: '/category/performance-mods' },
    { label: 'Himalayan 450', href: '/category/himalayan-450' },
    { label: 'Duke 390', href: '/category/duke-390' },
    { label: 'Maintenance', href: '/category/maintenance' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md transition-shadow duration-200 border-b border-surface-border ${
        isScrolled ? 'shadow-subtle' : ''
      }`}
    >
      <div className="max-w-page mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-heading text-2xl font-extrabold tracking-tighter text-brand-charcoal group-hover:text-brand-amber transition-colors">
            MOTORIST
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest bg-brand-charcoal text-white px-1.5 py-0.5 rounded-sm">
            JOURNAL
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs uppercase font-semibold tracking-wider text-neutral-700 hover:text-brand-amber transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Action Icons & CTA */}
        <div className="flex items-center gap-3">
          {/* Instant Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 h-9 px-3 rounded-btn border border-surface-border bg-surface-subtle text-neutral-500 hover:text-brand-charcoal hover:border-surface-border-medium transition-colors text-xs font-medium"
            aria-label="Search stories"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden sm:inline-block ml-1 text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-neutral-300">
              ⌘K
            </kbd>
          </button>

          {/* Direct Store Link Button */}
          <a
            href="https://motoriststore.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex"
          >
            <Button variant="accent" size="sm" className="gap-1.5">
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>Shop Store ↗</span>
            </Button>
          </a>

          {/* Mobile Navigation Trigger */}
          <button
            onClick={onToggleMobileNav}
            className="lg:hidden p-2 rounded-btn text-brand-charcoal hover:bg-surface-subtle transition-colors"
            aria-label={isMobileNavOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </header>
  );
}
