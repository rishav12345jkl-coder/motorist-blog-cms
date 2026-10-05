import { z } from 'zod';

export const createBlogSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, 'Title must be at least 5 characters')
    .max(255, 'Title cannot exceed 255 characters'),
  slug: z
    .string()
    .trim()
    .min(3, 'Slug must be at least 3 characters')
    .max(280, 'Slug cannot exceed 280 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens'),
  excerpt: z
    .string()
    .trim()
    .min(10, 'Excerpt must be at least 10 characters')
    .max(500, 'Excerpt cannot exceed 500 characters'),
  content: z
    .string()
    .trim()
    .min(20, 'Article content must be at least 20 characters'),
  featuredImage: z
    .string()
    .url('Featured image must be a valid URL'),
  featuredImageAlt: z
    .string()
    .trim()
    .max(255)
    .optional(),
  categoryId: z.string().min(1, 'Category is required'),
  tagIds: z.array(z.string()).default([]),
  status: z.enum(['DRAFT', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  publishedAt: z.string().datetime().optional().nullable(),
  isFeatured: z.boolean().default(false),
  readingTimeMin: z.number().int().min(1).default(3),
  // SEO fields
  metaTitle: z.string().trim().max(160).optional().nullable(),
  metaDescription: z.string().trim().max(320).optional().nullable(),
  canonicalUrl: z.string().url().optional().nullable().or(z.literal('')),
  ogImageUrl: z.string().url().optional().nullable().or(z.literal('')),
  noIndex: z.boolean().default(false),
});

export const updateBlogSchema = createBlogSchema.partial().extend({
  id: z.string().min(1, 'Blog ID is required'),
});

export type CreateBlogInput = z.infer<typeof createBlogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
