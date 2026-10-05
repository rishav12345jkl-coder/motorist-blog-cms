import { z } from 'zod';

export const toggleLikeSchema = z.object({
  blogId: z.string().min(1, 'Blog ID is required'),
});

export type ToggleLikeInput = z.infer<typeof toggleLikeSchema>;
