import * as React from 'react';
import { CommentPreview } from '@/types/blog';
import { CommentItem } from './comment-item';
import { CommentForm } from './comment-form';
import { MessageSquare } from 'lucide-react';

export interface CommentSectionProps {
  comments: CommentPreview[];
  postTitle?: string;
}

export function CommentSection({ comments, postTitle }: CommentSectionProps) {
  return (
    <section className="mt-16 pt-10 border-t-2 border-surface-border space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-brand-amber" />
          <h3 className="font-heading text-xl font-bold text-brand-charcoal">
            Reader Discussion ({comments.length})
          </h3>
        </div>
        <span className="text-xs text-neutral-500 font-mono">
          Pre-moderated Community
        </span>
      </div>

      {/* Main Comment Submission Form */}
      <CommentForm />

      {/* Existing Comments List */}
      <div className="space-y-6 pt-4">
        {comments.length === 0 ? (
          <div className="rounded-card border border-dashed border-surface-border p-8 text-center text-sm text-neutral-500">
            No comments yet. Be the first to start the garage discussion!
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </section>
  );
}
