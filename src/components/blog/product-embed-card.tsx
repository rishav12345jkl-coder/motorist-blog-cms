import * as React from 'react';
import { ShoppingBag, CheckCircle, ExternalLink } from 'lucide-react';
import { ProductEmbed } from '@/types/blog';
import { Button } from '@/components/ui/button';

export interface ProductEmbedCardProps {
  product: ProductEmbed;
}

export function ProductEmbedCard({ product }: ProductEmbedCardProps) {
  return (
    <aside className="my-8 overflow-hidden rounded-card border-2 border-brand-contrast bg-brand-charcoal text-white p-5 sm:p-6 shadow-hover">
      <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
        {/* Product Thumbnail */}
        <div className="relative h-32 w-32 sm:h-36 sm:w-36 shrink-0 overflow-hidden rounded-btn bg-brand-black border border-brand-contrast">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-full w-full object-cover object-center"
            loading="lazy"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-brand-taupe bg-brand-black px-2.5 py-1 rounded-btn border border-brand-contrast">
            <CheckCircle className="h-3 w-3 text-brand-amber" />
            <span>{product.fitmentBadge}</span>
          </div>

          <h4 className="font-heading text-lg sm:text-xl font-extrabold text-white">
            {product.title}
          </h4>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
            <span className="text-xl sm:text-2xl font-black text-brand-amber font-mono">
              {product.priceFormatted}
            </span>
            <span className="text-xs text-neutral-400">
              Direct from Motorist Store
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="shrink-0 w-full sm:w-auto pt-2 sm:pt-0">
          <a
            href={product.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full sm:w-auto"
          >
            <Button variant="accent" className="w-full gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span>Shop Part ↗</span>
            </Button>
          </a>
        </div>
      </div>
    </aside>
  );
}
