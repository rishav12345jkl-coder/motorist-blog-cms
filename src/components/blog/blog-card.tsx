import * as React from 'react';
import Link from 'next/link';
import { Clock, Heart, MessageSquare } from 'lucide-react';
import { BlogPostPreview } from '@/types/blog';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

export interface BlogCardProps {
  post: BlogPostPreview;
  className?: string;
}

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-card border border-surface-border bg-white shadow-subtle hover:border-surface-border-strong hover:shadow-hover transition-all duration-300 ${
        className || ''
      }`}
    >
      {/* Thumbnail Container */}
      <Link href={`/blog/${post.slug}`} className="relative aspect-video w-full overflow-hidden bg-brand-charcoal block">
        <img
          src={post.featuredImage}
          alt={post.featuredImageAlt || post.title}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 z-10">
          <Badge variant="accent" size="sm">
            {post.category.name}
          </Badge>
        </div>
      </Link>

      {/* Card Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
            <span>{formatDate(post.publishedAt)}</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readingTimeMin} min read
            </span>
          </div>

          <Link href={`/blog/${post.slug}`} className="block group-hover:text-brand-amber transition-colors">
            <h3 className="font-heading text-lg font-bold leading-snug text-brand-charcoal line-clamp-2">
              {post.title}
            </h3>
          </Link>

          <p className="text-sm text-neutral-600 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Footer Meta Row */}
        <div className="mt-5 pt-4 border-t border-surface-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={post.author.avatarUrl}
              alt={post.author.name}
              className="h-7 w-7 rounded-full object-cover border border-surface-border"
            />
            <span className="text-xs font-semibold text-brand-charcoal">
              {post.author.name}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-neutral-500 font-medium">
            <span className="flex items-center gap-1 hover:text-brand-amber transition-colors">
              <Heart className="h-3.5 w-3.5 text-neutral-400" />
              {post.likeCount}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3.5 w-3.5 text-neutral-400" />
              {post.commentCount}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
