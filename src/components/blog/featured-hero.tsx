import * as React from 'react';
import Link from 'next/link';
import { Clock, ArrowRight, Heart } from 'lucide-react';
import { BlogPostPreview } from '@/types/blog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

export interface FeaturedHeroProps {
  post: BlogPostPreview;
}

export function FeaturedHero({ post }: FeaturedHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-card border border-surface-border bg-brand-charcoal text-white shadow-modal">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[440px]">
        {/* Left Prose Canvas */}
        <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="accent">
                {post.category.name}
              </Badge>
              <span className="text-xs uppercase font-mono tracking-widest text-brand-taupe">
                ★ Editor's Choice
              </span>
            </div>

            <Link href={`/blog/${post.slug}`} className="block group">
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-white group-hover:text-brand-amber transition-colors">
                {post.title}
              </h2>
            </Link>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-brand-contrast flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatarUrl}
                alt={post.author.name}
                className="h-9 w-9 rounded-full object-cover border border-brand-contrast"
              />
              <div>
                <p className="text-xs font-bold text-white">{post.author.name}</p>
                <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                  <span>{formatDate(post.publishedAt)}</span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readingTimeMin} min read
                  </span>
                </div>
              </div>
            </div>

            <Link href={`/blog/${post.slug}`}>
              <Button variant="accent" size="sm" className="gap-2">
                <span>Read Story</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Right High-Impact Media Canvas */}
        <div className="lg:col-span-6 relative min-h-[260px] lg:min-h-full overflow-hidden bg-brand-black">
          <img
            src={post.featuredImage}
            alt={post.featuredImageAlt || post.title}
            className="absolute inset-0 h-full w-full object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-transparent lg:bg-gradient-to-r lg:from-brand-charcoal lg:via-transparent lg:to-transparent opacity-80" />
        </div>
      </div>
    </section>
  );
}
