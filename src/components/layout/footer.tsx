import * as React from 'react';
import Link from 'next/link';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="bg-brand-black text-white border-t border-brand-contrast pt-16 pb-12">
      <div className="max-w-page mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-surface-border-medium">
          {/* Brand Col */}
          <div className="space-y-4">
            <span className="font-heading text-2xl font-black tracking-tight text-white">
              MOTORIST
            </span>
            <p className="text-sm text-neutral-400 leading-relaxed">
              The official technical journal of MOTORIST. Dedicated to motorcycle performance, bespoke fabrication, DIY maintenance guides, and cross-country touring builds.
            </p>
            <div className="pt-2">
              <a
                href="https://motoriststore.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-amber hover:text-white transition-colors"
              >
                <span>Visit motoriststore.com</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Editorial Categories */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-brand-taupe">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li>
                <Link href="/category/performance-mods" className="hover:text-brand-amber transition-colors">
                  Performance Exhausts & Tuning
                </Link>
              </li>
              <li>
                <Link href="/category/himalayan-450" className="hover:text-brand-amber transition-colors">
                  Himalayan 450 Touring Setups
                </Link>
              </li>
              <li>
                <Link href="/category/duke-390" className="hover:text-brand-amber transition-colors">
                  Duke 390 Gen-3 Track & Street
                </Link>
              </li>
              <li>
                <Link href="/category/maintenance" className="hover:text-brand-amber transition-colors">
                  DIY Garage Maintenance
                </Link>
              </li>
            </ul>
          </div>

          {/* Store Catalog Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-brand-taupe">
              Featured Parts
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li>
                <a
                  href="https://motoriststore.com/collections/exhaust"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-amber transition-colors flex items-center justify-between group"
                >
                  <span>Slip-On Exhausts</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://motoriststore.com/collections/himalayan-450-accessories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-amber transition-colors flex items-center justify-between group"
                >
                  <span>Himalayan Crash Protection</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://motoriststore.com/collections/headlight"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-amber transition-colors flex items-center justify-between group"
                >
                  <span>LED Projector Headlights</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://motoriststore.com/collections/xpulse-210-accessories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-amber transition-colors flex items-center justify-between group"
                >
                  <span>XPulse 210 Off-Road Gear</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-brand-taupe">
              Garage Dispatch
            </h4>
            <p className="text-sm text-neutral-400">
              Get technical install guides, Dyno charts, and parts drop alerts delivered weekly.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter rider email..."
                  className="h-10 w-full rounded-btn bg-brand-charcoal border border-surface-border-strong px-3 text-sm text-white placeholder:text-neutral-500 focus:border-brand-amber focus:outline-none"
                  aria-label="Email address"
                />
                <Button variant="accent" size="icon" className="shrink-0" aria-label="Subscribe">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} MOTORIST. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="https://motoriststore.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="https://motoriststore.com/policies/terms-of-service" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="https://motoriststore.com/pages/contact" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Contact Store
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
