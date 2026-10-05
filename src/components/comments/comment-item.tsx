'use client';

import * as React from 'react';
import { Reply } from 'lucide-react';
import { CommentPreview } from '@/types/blog';
import { CommentForm } from './comment-form';
import { formatDate } from '@/lib/utils';

export interface CommentItemProps {
  comment: CommentPreview;
  isNested?: boolean;
}

export function CommentItem({ comment, isNested = false }: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = React.useState(false);

  // Generate consistent initial letter
  const initial = comment.authorName.charAt(0).toUpperCase();

  return (
    <div className={`space-y-3 ${isNested ? 'ml-4 sm:ml-8 pl-4 border-l-2 border-surface-border' : ''}`}>
      <div className="rounded-card border border-surface-border bg-white p-4 sm:p-5 shadow-subtle space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-brand-charcoal text-white font-bold text-xs flex items-center justify-center font-mono">
              {initial}
            </div>
            <div>
              <p className="text-xs font-bold text-brand-charcoal">{comment.authorName}</p>
              <p className="text-[11px] text-neutral-400">{formatDate(comment.createdAt)}</p>
            </div>
          </div>

          {!isNested && (
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-brand-amber transition-colors px-2.5 py-1 rounded-btn hover:bg-surface-subtle"
            >
              <Reply className="h-3 w-3" />
              <span>Reply</span>
            </button>
          )}
        </div>

        <p className="text-sm text-neutral-700 leading-relaxed">
          {comment.content}
        </p>
      </div>

      {/* Inline Reply Form */}
      {showReplyForm && (
        <div className="mt-3 ml-4 sm:ml-8">
          <CommentForm
            parentId={comment.id}
            onCancel={() => setShowReplyForm(false)}
            onSubmitSuccess={() => setShowReplyForm(false)}
          />
        </div>
      )}

      {/* Nested Replies (1 Level Only) */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-3 pt-2">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} isNested={true} />
          ))}
        </div>
      )}
    </div>
  );
}
