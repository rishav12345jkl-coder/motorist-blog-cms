'use client';

import * as React from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight, Clock } from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import { BlogPostPreview } from '@/types/blog';

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  samplePosts?: BlogPostPreview[];
}

export function SearchModal({ isOpen, onClose, samplePosts = [] }: SearchModalProps) {
  const [query, setQuery] = React.useState('');

  const filteredPosts = React.useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return samplePosts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.name.toLowerCase().includes(q)
    );
  }, [query, samplePosts]);

  const quickSearches = ['Himalayan 450', 'Duke 390', 'Akrapovic Exhaust', 'LED Headlight', 'Oil Change'];

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl p-0 overflow-hidden">
      {/* Search Input Bar */}
      <div className="flex items-center gap-3 px-4 py-3.5 border-b border-surface-border bg-surface-subtle">
        <Search className="h-5 w-5 text-neutral-400 shrink-0" />
        <input
          type="text"
          placeholder="Search performance mods, bike builds, install guides..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent text-sm text-brand-charcoal placeholder:text-neutral-400 focus:outline-none"
          autoFocus
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="p-1 text-neutral-400 hover:text-brand-charcoal"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Results / Suggestions Container */}
      <div className="max-h-[380px] overflow-y-auto p-4 space-y-4">
        {query.trim().length === 0 ? (
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2.5">
              Popular Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {quickSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="h-7 px-3 rounded-pill bg-white border border-surface-border text-xs font-medium text-neutral-700 hover:border-brand-amber hover:text-brand-charcoal transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-8 text-center text-sm text-neutral-500 space-y-1">
            <p className="font-semibold text-brand-charcoal">No articles found for "{query}"</p>
            <p className="text-xs text-neutral-400">
              Try searching for "Exhaust", "Himalayan", or "Maintenance"
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Matching Articles ({filteredPosts.length})
            </p>
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-card hover:bg-surface-subtle transition-colors group"
              >
                <div className="space-y-1 pr-4">
                  <span className="text-[10px] font-mono uppercase font-bold text-brand-amber">
                    {post.category.name}
                  </span>
                  <h4 className="text-sm font-bold text-brand-charcoal group-hover:text-brand-amber transition-colors line-clamp-1">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                    <Clock className="h-3 w-3" />
                    <span>{post.readingTimeMin} min read</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-brand-amber group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
