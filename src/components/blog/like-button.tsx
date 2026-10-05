'use client';

import * as React from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LikeButtonProps {
  initialCount?: number;
  initialLiked?: boolean;
  onToggle?: (liked: boolean) => void;
  className?: string;
}

export function LikeButton({
  initialCount = 42,
  initialLiked = false,
  onToggle,
  className,
}: LikeButtonProps) {
  const [liked, setLiked] = React.useState(initialLiked);
  const [count, setCount] = React.useState(initialCount);
  const [isBouncing, setIsBouncing] = React.useState(false);

  const handleToggle = () => {
    const nextState = !liked;
    setLiked(nextState);
    setCount((prev) => (nextState ? prev + 1 : Math.max(0, prev - 1)));
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 300);
    onToggle?.(nextState);
  };

  return (
    <button
      onClick={handleToggle}
      className={cn(
        'group inline-flex items-center gap-2 rounded-pill border px-4 py-2 text-sm font-semibold transition-all duration-200 active:scale-95',
        liked
          ? 'border-brand-amber bg-brand-amber/10 text-brand-amber'
          : 'border-surface-border bg-white text-neutral-600 hover:border-surface-border-strong hover:text-brand-charcoal',
        className
      )}
      aria-label={liked ? 'Unlike this article' : 'Like this article'}
    >
      <Heart
        className={cn(
          'h-4 w-4 transition-transform duration-200',
          liked ? 'fill-brand-amber text-brand-amber' : 'text-neutral-500 group-hover:text-brand-charcoal',
          isBouncing && 'scale-135'
        )}
      />
      <span className="font-mono text-xs">{count}</span>
    </button>
  );
}
