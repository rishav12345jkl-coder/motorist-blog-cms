'use client';

import * as React from 'react';
import Link from 'next/link';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  if (!isOpen) return null;

  const links = [
    { label: 'All Stories', href: '/' },
    { label: 'Performance Mods', href: '/category/performance-mods' },
    { label: 'Himalayan 450 Guides', href: '/category/himalayan-450' },
    { label: 'Duke 390 Modifications', href: '/category/duke-390' },
    { label: 'Maintenance & Garage Tips', href: '/category/maintenance' },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-5/6 max-w-sm bg-white p-6 shadow-modal flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-surface-border">
            <span className="font-heading text-xl font-black tracking-tight text-brand-charcoal">
              MOTORIST JOURNAL
            </span>
          </div>

          <nav className="mt-6 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="flex items-center justify-between py-3.5 px-3 rounded-btn text-sm font-semibold text-brand-charcoal hover:bg-surface-subtle hover:text-brand-amber transition-colors"
              >
                <span>{link.label}</span>
                <ChevronRight className="h-4 w-4 text-neutral-400" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-surface-border space-y-3">
          <a
            href="https://motoriststore.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <Button variant="accent" className="w-full gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span>Shop Motorist Store ↗</span>
            </Button>
          </a>
          <p className="text-center text-[11px] text-neutral-500 uppercase tracking-wider">
            Performance • Reliability • Culture
          </p>
        </div>
      </div>
    </div>
  );
}
