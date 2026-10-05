import { z } from 'zod';

export const submitCommentSchema = z.object({
  blogId: z.string().min(1, 'Blog ID is required'),
  parentId: z.string().optional().nullable(),
  authorName: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
  authorEmail: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .max(255, 'Email cannot exceed 255 characters'),
  authorWebsite: z
    .string()
    .trim()
    .url('Website must be a valid URL')
    .max(255)
    .optional()
    .or(z.literal('')),
  content: z
    .string()
    .trim()
    .min(5, 'Comment must be at least 5 characters')
    .max(1000, 'Comment cannot exceed 1000 characters'),
  // Honeypot field - must remain empty
  hp_website_check: z.string().max(0, 'Spam detected').optional().or(z.literal('')),
});

export const moderateCommentSchema = z.object({
  commentId: z.string().min(1, 'Comment ID is required'),
  status: z.enum(['APPROVED', 'SPAM', 'REJECTED', 'PENDING']),
});

export type SubmitCommentInput = z.infer<typeof submitCommentSchema>;
export type ModerateCommentInput = z.infer<typeof moderateCommentSchema>;
