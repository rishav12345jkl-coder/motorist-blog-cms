'use server';

import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';
import { toggleLikeSchema } from '@/lib/validations/like';
import { createSuccessResponse, createErrorResponse, type ApiResponse } from '@/types/api';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import crypto from 'crypto';

export interface ToggleLikeResult {
  liked: boolean;
  likeCount: number;
}

/**
 * Server Action to toggle an article like
 * Enforces database-level uniqueness via @@unique([blogId, identifierHash])
 */
export async function toggleLikeAction(rawInput: unknown): Promise<ApiResponse<ToggleLikeResult>> {
  try {
    const parseResult = toggleLikeSchema.safeParse(rawInput);
    if (!parseResult.success) {
      return createErrorResponse('VALIDATION_ERROR', 'Invalid like payload');
    }

    const { blogId } = parseResult.data;

    // Retrieve headers for composite IP + User-Agent fingerprint
    const reqHeaders = await headers();
    const forwardedFor = reqHeaders.get('x-forwarded-for') || '127.0.0.1';
    const clientIp = forwardedFor.split(',')[0].trim();
    const userAgent = reqHeaders.get('user-agent') || 'unknown_agent';
    const serverSalt = process.env.AUTH_SECRET || 'motorist_like_salt_2026';

    const identifierHash = crypto
      .createHash('sha256')
      .update(`${clientIp}_${userAgent}_${serverSalt}`)
      .digest('hex');

    // Run within a transaction to maintain atomic count accuracy
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Check if this anonymous user has already liked
      const existingLike = await tx.blogLike.findUnique({
        where: {
          blogId_identifierHash: {
            blogId,
            identifierHash,
          },
        },
      });

      if (existingLike) {
        // Unlike: delete record & decrement count
        await tx.blogLike.delete({
          where: { id: existingLike.id },
        });

        const updatedBlog = await tx.blog.update({
          where: { id: blogId },
          data: { likeCount: { decrement: 1 } },
          select: { likeCount: true, slug: true },
        });

        return { liked: false, likeCount: Math.max(0, updatedBlog.likeCount), slug: updatedBlog.slug };
      } else {
        // Like: create record & increment count
        await tx.blogLike.create({
          data: {
            blogId,
            identifierHash,
          },
        });

        const updatedBlog = await tx.blog.update({
          where: { id: blogId },
          data: { likeCount: { increment: 1 } },
          select: { likeCount: true, slug: true },
        });

        return { liked: true, likeCount: updatedBlog.likeCount, slug: updatedBlog.slug };
      }
    });

    revalidatePath(`/blog/${result.slug}`);
    revalidatePath('/');

    return createSuccessResponse({ liked: result.liked, likeCount: result.likeCount });
  } catch (error) {
    console.error('Error toggling like:', error);
    return createErrorResponse('INTERNAL_SERVER_ERROR', 'Failed to update like status.');
  }
}
