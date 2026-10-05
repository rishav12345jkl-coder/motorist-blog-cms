'use server';

import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';
import { createBlogSchema, updateBlogSchema } from '@/lib/validations/blog';
import { createSuccessResponse, createErrorResponse, type ApiResponse } from '@/types/api';
import { calculateReadingTime, slugify } from '@/lib/utils';
import { getCurrentUserSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const deleteBlogSchema = z.object({
  id: z.string().min(1, 'Blog ID is required'),
});

/**
 * Server Action: Create a new blog post
 * Strictly enforces Zod validation, slug conflict resolution, tag association, and revalidation
 */
export async function createBlogAction(rawInput: unknown): Promise<ApiResponse<{ id: string; slug: string }>> {
  try {
    const parseResult = createBlogSchema.safeParse(rawInput);
    if (!parseResult.success) {
      return createErrorResponse(
        'VALIDATION_ERROR',
        'Invalid blog post creation details',
        parseResult.error.flatten().fieldErrors
      );
    }

    const data = parseResult.data;

    // Check slug uniqueness
    const existingSlug = await prisma.blog.findUnique({
      where: { slug: data.slug },
      select: { id: true },
    });

    let targetSlug = data.slug;
    if (existingSlug) {
      targetSlug = `${data.slug}-${Date.now().toString(36)}`;
    }

    // Determine author ID: from authenticated session, or fallback to first super admin / editor
    let authorId: string | null = null;
    const session = await getCurrentUserSession();
    if (session?.userId) {
      authorId = session.userId;
    } else {
      const fallbackUser = await prisma.user.findFirst({
        orderBy: { createdAt: 'asc' },
        select: { id: true },
      });
      if (fallbackUser) {
        authorId = fallbackUser.id;
      }
    }

    if (!authorId) {
      return createErrorResponse('UNAUTHORIZED', 'No author account available to assign article.');
    }

    // Verify category exists
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
      select: { id: true, slug: true },
    });

    if (!category) {
      return createErrorResponse('NOT_FOUND', 'Selected category does not exist.');
    }

    // Auto-calculate reading time if default
    const calculatedReadingTime =
      data.readingTimeMin && data.readingTimeMin > 1
        ? data.readingTimeMin
        : calculateReadingTime(data.content);

    // Create blog in transaction with tags
    const newBlog = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const blog = await tx.blog.create({
        data: {
          title: data.title,
          slug: targetSlug,
          excerpt: data.excerpt,
          content: data.content,
          featuredImage: data.featuredImage,
          featuredImageAlt: data.featuredImageAlt || null,
          readingTimeMin: calculatedReadingTime,
          isFeatured: data.isFeatured ?? false,
          status: data.status,
          publishedAt: data.status === 'PUBLISHED' ? (data.publishedAt ? new Date(data.publishedAt) : new Date()) : null,
          metaTitle: data.metaTitle || null,
          metaDescription: data.metaDescription || null,
          canonicalUrl: data.canonicalUrl || null,
          ogImageUrl: data.ogImageUrl || null,
          noIndex: data.noIndex ?? false,
          authorId: authorId as string,
          categoryId: data.categoryId,
        },
      });

      if (data.tagIds && data.tagIds.length > 0) {
        await tx.blogTag.createMany({
          data: data.tagIds.map((tagId) => ({
            blogId: blog.id,
            tagId,
          })),
          skipDuplicates: true,
        });
      }

      return blog;
    });

    // Revalidate affected pages
    revalidatePath('/');
    revalidatePath('/admin/blogs');
    revalidatePath(`/category/${category.slug}`);

    return createSuccessResponse({ id: newBlog.id, slug: newBlog.slug });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return createErrorResponse('INTERNAL_SERVER_ERROR', 'Failed to create blog post. Please try again.');
  }
}

/**
 * Server Action: Update an existing blog post
 */
export async function updateBlogAction(rawInput: unknown): Promise<ApiResponse<{ id: string; slug: string }>> {
  try {
    const parseResult = updateBlogSchema.safeParse(rawInput);
    if (!parseResult.success) {
      return createErrorResponse(
        'VALIDATION_ERROR',
        'Invalid blog post update details',
        parseResult.error.flatten().fieldErrors
      );
    }

    const { id, ...data } = parseResult.data;

    // Check blog exists
    const existing = await prisma.blog.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!existing) {
      return createErrorResponse('NOT_FOUND', 'Target blog post does not exist.');
    }

    // Slug conflict check if slug updated
    let targetSlug = existing.slug;
    if (data.slug && data.slug !== existing.slug) {
      const conflict = await prisma.blog.findUnique({
        where: { slug: data.slug },
        select: { id: true },
      });
      if (conflict && conflict.id !== id) {
        return createErrorResponse('CONFLICT', 'A post with this slug already exists.');
      }
      targetSlug = data.slug;
    }

    const calculatedReadingTime = data.content
      ? calculateReadingTime(data.content)
      : existing.readingTimeMin;

    const updatedBlog = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Update tags if provided
      if (data.tagIds !== undefined) {
        await tx.blogTag.deleteMany({
          where: { blogId: id },
        });

        if (data.tagIds.length > 0) {
          await tx.blogTag.createMany({
            data: data.tagIds.map((tagId) => ({
              blogId: id,
              tagId,
            })),
            skipDuplicates: true,
          });
        }
      }

      // Determine publishedAt transition
      let publishedAt = existing.publishedAt;
      if (data.status === 'PUBLISHED' && !existing.publishedAt) {
        publishedAt = data.publishedAt ? new Date(data.publishedAt) : new Date();
      } else if (data.publishedAt !== undefined) {
        publishedAt = data.publishedAt ? new Date(data.publishedAt) : null;
      }

      return tx.blog.update({
        where: { id },
        data: {
          ...(data.title ? { title: data.title } : {}),
          slug: targetSlug,
          ...(data.excerpt ? { excerpt: data.excerpt } : {}),
          ...(data.content ? { content: data.content, readingTimeMin: calculatedReadingTime } : {}),
          ...(data.featuredImage ? { featuredImage: data.featuredImage } : {}),
          ...(data.featuredImageAlt !== undefined ? { featuredImageAlt: data.featuredImageAlt } : {}),
          ...(data.categoryId ? { categoryId: data.categoryId } : {}),
          ...(data.isFeatured !== undefined ? { isFeatured: data.isFeatured } : {}),
          ...(data.status ? { status: data.status } : {}),
          publishedAt,
          ...(data.metaTitle !== undefined ? { metaTitle: data.metaTitle } : {}),
          ...(data.metaDescription !== undefined ? { metaDescription: data.metaDescription } : {}),
          ...(data.canonicalUrl !== undefined ? { canonicalUrl: data.canonicalUrl } : {}),
          ...(data.ogImageUrl !== undefined ? { ogImageUrl: data.ogImageUrl } : {}),
          ...(data.noIndex !== undefined ? { noIndex: data.noIndex } : {}),
        },
      });
    });

    revalidatePath('/');
    revalidatePath('/admin/blogs');
    revalidatePath(`/blog/${existing.slug}`);
    if (targetSlug !== existing.slug) {
      revalidatePath(`/blog/${targetSlug}`);
    }

    return createSuccessResponse({ id: updatedBlog.id, slug: updatedBlog.slug });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return createErrorResponse('INTERNAL_SERVER_ERROR', 'Failed to update blog post.');
  }
}

/**
 * Server Action: Delete a blog post
 */
export async function deleteBlogAction(rawInput: unknown): Promise<ApiResponse<{ id: string; success: boolean }>> {
  try {
    const parseResult = deleteBlogSchema.safeParse(rawInput);
    if (!parseResult.success) {
      return createErrorResponse('VALIDATION_ERROR', 'Invalid blog ID');
    }

    const { id } = parseResult.data;

    const existing = await prisma.blog.findUnique({
      where: { id },
      select: { id: true, slug: true },
    });

    if (!existing) {
      return createErrorResponse('NOT_FOUND', 'Blog post not found.');
    }

    await prisma.blog.delete({
      where: { id },
    });

    revalidatePath('/');
    revalidatePath('/admin/blogs');
    revalidatePath(`/blog/${existing.slug}`);

    return createSuccessResponse({ id, success: true });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return createErrorResponse('INTERNAL_SERVER_ERROR', 'Failed to delete blog post.');
  }
}
