'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ShieldCheck, MessageSquare } from 'lucide-react';

export interface CommentFormProps {
  parentId?: string | null;
  onCancel?: () => void;
  onSubmitSuccess?: () => void;
}

export function CommentForm({ parentId, onCancel, onSubmitSuccess }: CommentFormProps) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [content, setContent] = React.useState('');
  const [honeypot, setHoneypot] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submittedMessage, setSubmittedMessage] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !content.trim()) return;

    // Honeypot check
    if (honeypot) {
      console.warn('Bot submission blocked');
      return;
    }

    setIsSubmitting(true);
    // Simulate UI submission for Phase 2 UI foundations
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedMessage('Thank you! Your comment has been submitted and is awaiting editorial moderation.');
      setName('');
      setEmail('');
      setContent('');
      onSubmitSuccess?.();
    }, 600);
  };

  if (submittedMessage) {
    return (
      <div className="rounded-card border border-emerald-200 bg-emerald-50/80 p-4 text-sm text-emerald-900 flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">{submittedMessage}</p>
          <button
            onClick={() => setSubmittedMessage(null)}
            className="mt-2 text-xs font-bold uppercase tracking-wider text-emerald-700 hover:underline"
          >
            Submit Another Comment
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-card border border-surface-border bg-white p-5 sm:p-6 shadow-subtle">
      <div className="flex items-center gap-2 pb-2 border-b border-surface-border">
        <MessageSquare className="h-4 w-4 text-brand-amber" />
        <h4 className="text-sm font-bold text-brand-charcoal">
          {parentId ? 'Leave a Reply' : 'Leave a Comment'}
        </h4>
      </div>

      {/* Invisible Honeypot */}
      <input
        type="text"
        name="hp_website_check"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Your Name *"
          placeholder="e.g. Rahul Sharma"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label="Email Address (Private) *"
          type="email"
          placeholder="e.g. rahul@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          helperText="Will not be published"
        />
      </div>

      <Textarea
        label="Your Message *"
        rows={4}
        placeholder="Share your thoughts, fitment questions, or garage experience..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <p className="text-xs text-neutral-500">
          Protected by Cloudflare Turnstile • All comments moderated
        </p>

        <div className="flex items-center gap-2">
          {onCancel && (
            <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" variant="accent" size="sm" isLoading={isSubmitting}>
            Submit Comment
          </Button>
        </div>
      </div>
    </form>
  );
}
