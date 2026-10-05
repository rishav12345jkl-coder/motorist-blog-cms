import * as React from 'react';
import { cn } from '@/lib/utils';

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-card bg-surface-subtle', className)}
      {...props}
    />
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-card border border-surface-border bg-white shadow-subtle">
      <Skeleton className="aspect-video w-full rounded-none" />
      <div className="space-y-3 p-5">
        <div className="flex gap-2">
          <Skeleton className="h-4 w-20 rounded-pill" />
          <Skeleton className="h-4 w-16 rounded-pill" />
        </div>
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/6" />
        <div className="flex items-center gap-3 pt-3">
          <Skeleton className="h-7 w-7 rounded-full" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="ml-auto h-3 w-16" />
        </div>
      </div>
    </div>
  );
}
