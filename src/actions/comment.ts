'use server';

import { prisma } from '@/lib/prisma';
import { submitCommentSchema, moderateCommentSchema } from '@/lib/validations/comment';
import { createSuccessResponse, createErrorResponse, type ApiResponse } from '@/types/api';
import { revalidatePath } from 'next/cache';
import crypto from 'crypto';

/**
 * Server Action to submit a guest comment for editorial pre-moderation
 * Strictly enforcing honeypot checks, Zod validation, and default PENDING status
 */
export async function submitCommentAction(rawInput: unknown): Promise<ApiResponse<{ id: string; status: string }>> {
  try {
    const parseResult = submitCommentSchema.safeParse(rawInput);
    if (!parseResult.success) {
      return createErrorResponse(
        'VALIDATION_ERROR',
        'Invalid comment submission details',
        parseResult.error.flatten().fieldErrors
      );
    }

    const { blogId, parentId, authorName, authorEmail, authorWebsite, content, hp_website_check } = parseResult.data;

    // Honeypot validation
    if (hp_website_check && hp_website_check.length > 0) {
      // Silent rejection for spam bots
      return createSuccessResponse({ id: 'rejected_bot', status: 'PENDING' });
    }

    // Verify blog existence
    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
      select: { id: true, slug: true },
    });

    if (!blog) {
      return createErrorResponse('NOT_FOUND', 'Target blog post does not exist');
    }

    // If parentId provided, verify parent exists on same blog
    if (parentId) {
      const parentComment = await prisma.comment.findFirst({
        where: { id: parentId, blogId },
      });
      if (!parentComment) {
        return createErrorResponse('NOT_FOUND', 'Parent comment not found on this article');
      }
    }

    // Generate anonymous IP hash
    const ipHash = crypto
      .createHash('sha256')
      .update(`${authorEmail}_salt_${process.env.AUTH_SECRET || 'dev_salt'}`)
      .digest('hex');

    const comment = await prisma.comment.create({
      data: {
        blogId,
        parentId: parentId || null,
        authorName,
        authorEmail,
        authorWebsite: authorWebsite || null,
        content,
        status: 'PENDING',
        ipHash,
      },
      select: {
        id: true,
        status: true,
      },
    });

    revalidatePath(`/blog/${blog.slug}`);
    return createSuccessResponse(comment);
  } catch (error) {
    console.error('Error submitting comment:', error);
    return createErrorResponse('INTERNAL_SERVER_ERROR', 'Failed to submit comment. Please try again later.');
  }
}

/**
 * Server Action for Admins to moderate comments (APPROVE, SPAM, REJECT)
 */
export async function moderateCommentAction(rawInput: unknown): Promise<ApiResponse<{ id: string; status: string }>> {
  try {
    const parseResult = moderateCommentSchema.safeParse(rawInput);
    if (!parseResult.success) {
      return createErrorResponse(
        'VALIDATION_ERROR',
        'Invalid moderation payload',
        parseResult.error.flatten().fieldErrors
      );
    }

    const { commentId, status } = parseResult.data;

    const updated = await prisma.comment.update({
      where: { id: commentId },
      data: { status },
      select: {
        id: true,
        status: true,
        blog: { select: { slug: true } },
      },
    });

    if (updated.blog?.slug) {
      revalidatePath(`/blog/${updated.blog.slug}`);
    }
    revalidatePath('/admin/comments');

    return createSuccessResponse({ id: updated.id, status: updated.status });
  } catch (error) {
    console.error('Error moderating comment:', error);
    return createErrorResponse('INTERNAL_SERVER_ERROR', 'Failed to update comment moderation status.');
  }
}
