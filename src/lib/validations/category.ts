import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().trim().min(2).max(100),
  slug: z.string().trim().min(2).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be kebab-case'),
  description: z.string().trim().max(500).optional().nullable(),
  imageUrl: z.string().url().optional().nullable().or(z.literal('')),
  order: z.number().int().default(0),
});

export const tagSchema = z.object({
  name: z.string().trim().min(2).max(50),
  slug: z.string().trim().min(2).max(60).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be kebab-case'),
});

export type CategoryInput = z.infer<typeof categorySchema>;
export type TagInput = z.infer<typeof tagSchema>;
