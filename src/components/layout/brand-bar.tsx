import * as React from 'react';
import { ExternalLink } from 'lucide-react';

export function BrandBar() {
  return (
    <div className="bg-brand-black text-white text-xs font-semibold py-2 px-4 border-b border-brand-contrast">
      <div className="max-w-page mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-brand-amber animate-pulse" />
          <span className="tracking-wider uppercase text-[11px] font-mono text-brand-taupe">
            Official Motorist Journal
          </span>
        </div>
        <a
          href="https://motoriststore.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-neutral-300 hover:text-white transition-colors group"
        >
          <span>Explore Parts & Exhausts at MotoristStore.com</span>
          <ExternalLink className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </div>
  );
}
