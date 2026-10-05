'use client';

import * as React from 'react';
import { List } from 'lucide-react';

export interface TocItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface TableOfContentsProps {
  items: TocItem[];
  activeId?: string;
}

export function TableOfContents({ items, activeId }: TableOfContentsProps) {
  if (!items || items.length === 0) return null;

  return (
    <aside className="space-y-4 rounded-card border border-surface-border bg-white p-5 shadow-subtle">
      <div className="flex items-center gap-2 pb-3 border-b border-surface-border">
        <List className="h-4 w-4 text-brand-amber" />
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-charcoal">
          Table of Contents
        </h4>
      </div>

      <nav>
        <ul className="space-y-2 text-xs">
          {items.map((item) => (
            <li
              key={item.id}
              className={item.level === 3 ? 'pl-3' : ''}
            >
              <a
                href={`#${item.id}`}
                className={`block py-1 transition-colors leading-relaxed ${
                  activeId === item.id
                    ? 'font-bold text-brand-amber'
                    : 'text-neutral-600 hover:text-brand-charcoal'
                }`}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
