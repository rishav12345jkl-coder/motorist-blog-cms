'use client';

import * as React from 'react';
import { Share2, Link as LinkIcon, Check } from 'lucide-react';

export interface ShareBarProps {
  title: string;
  url?: string;
}

export function ShareBar({ title, url }: ShareBarProps) {
  const [copied, setCopied] = React.useState(false);

  const shareUrl = typeof window !== 'undefined' ? url || window.location.href : '';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          url: shareUrl,
        });
      } catch {
        // User dismissed
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs uppercase font-mono font-bold tracking-wider text-neutral-500 mr-1">
        Share:
      </span>

      {/* Copy Link Button */}
      <button
        onClick={handleCopyLink}
        className="flex items-center gap-1.5 h-8 px-3 rounded-pill border border-surface-border bg-white text-xs font-semibold text-neutral-700 hover:border-surface-border-strong hover:text-brand-charcoal transition-colors"
        title="Copy article link"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-feedback-success" />
            <span className="text-feedback-success">Copied!</span>
          </>
        ) : (
          <>
            <LinkIcon className="h-3.5 w-3.5 text-neutral-500" />
            <span>Copy</span>
          </>
        )}
      </button>

      {/* WhatsApp Share */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${shareUrl}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center h-8 px-3 rounded-pill border border-surface-border bg-white text-xs font-semibold text-neutral-700 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
      >
        WhatsApp
      </a>

      {/* X / Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center h-8 px-3 rounded-pill border border-surface-border bg-white text-xs font-semibold text-neutral-700 hover:border-brand-black hover:text-brand-black transition-colors"
      >
        X / Post
      </a>

      {/* Native Web Share */}
      <button
        onClick={handleNativeShare}
        className="sm:hidden flex items-center justify-center h-8 w-8 rounded-pill border border-surface-border bg-white text-neutral-600 hover:text-brand-charcoal transition-colors"
        aria-label="Share options"
      >
        <Share2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
