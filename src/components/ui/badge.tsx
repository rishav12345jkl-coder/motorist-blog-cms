import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'taupe' | 'outline' | 'slate';
  size?: 'sm' | 'md';
}

export function Badge({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold uppercase tracking-wider transition-colors rounded-pill';

  const variants = {
    default: 'bg-surface-subtle text-brand-charcoal border border-surface-border',
    accent: 'bg-brand-amber text-white shadow-sm',
    taupe: 'bg-brand-taupe text-brand-black',
    slate: 'bg-brand-slate text-white',
    outline: 'border border-surface-border-strong text-neutral-700 bg-transparent',
  };

  const sizes = {
    sm: 'text-[10px] px-2.5 py-0.5',
    md: 'text-xs px-3 py-1',
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
}
