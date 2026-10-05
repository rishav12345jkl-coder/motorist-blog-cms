'use server';

import { prisma } from '@/lib/prisma';
import { categorySchema, tagSchema } from '@/lib/validations/category';
import { createSuccessResponse, createErrorResponse, type ApiResponse } from '@/types/api';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const updateCategorySchema = categorySchema.partial().extend({
  id: z.string().min(1, 'Category ID is required'),
});

const deleteSchema = z.object({
  id: z.string().min(1, 'ID is required'),
});

/**
 * Server Action: Create a category
 */
export async function createCategoryAction(rawInput: unknown): Promise<ApiResponse<{ id: string; slug: string }>> {
  try {
    const parseResult = categorySchema.safeParse(rawInput);
    if (!parseResult.success) {
      return createErrorResponse(
        'VALIDATION_ERROR',
        'Invalid category input',
        parseResult.error.flatten().fieldErrors
      );
    }

    const { name, slug, description, imageUrl, order } = parseResult.data;

    // Check slug or name conflict
    const existing = await prisma.category.findFirst({
      where: { OR: [{ slug }, { name }] },
    });

    if (existing) {
      return createErrorResponse('CONFLICT', 'Category name or slug already exists.');
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description: description || null,
        imageUrl: imageUrl || null,
        order: order ?? 0,
      },
      select: { id: true, slug: true },
    });

    revalidatePath('/');
    revalidatePath('/admin/categories');

    return createSuccessResponse(category);
  } catch (error) {
    console.error('Error creating category:', error);
    return createErrorResponse('INTERNAL_SERVER_ERROR', 'Failed to create category.');
  }
}

/**
 * Server Action: Update a category
 */
export async function updateCategoryAction(rawInput: unknown): Promise<ApiResponse<{ id: string; slug: string }>> {
  try {
    const parseResult = updateCategorySchema.safeParse(rawInput);
    if (!parseResult.success) {
      return createErrorResponse(
        'VALIDATION_ERROR',
        'Invalid category update payload',
        parseResult.error.flatten().fieldErrors
      );
    }

    const { id, name, slug, description, imageUrl, order } = parseResult.data;

    const existing = await prisma.category.findUnique({
      where: { id },
    });

    if (!existing) {
      return createErrorResponse('NOT_FOUND', 'Category not found.');
    }

    // Check conflict if name or slug changes
    if (slug && slug !== existing.slug) {
      const slugConflict = await prisma.category.findUnique({ where: { slug } });
      if (slugConflict && slugConflict.id !== id) {
        return createErrorResponse('CONFLICT', 'Category with this slug already exists.');
      }
    }

    const updated = await prisma.category.update({
      where: { id },
      data: {
        ...(name ? { name } : {}),
        ...(slug ? { slug } : {}),
        ...(description !== undefined ? { description: description || null } : {}),
        ...(imageUrl !== undefined ? { imageUrl: imageUrl || null } : {}),
        ...(order !== undefined ? { order } : {}),
      },
      select: { id: true, slug: true },
    });

    revalidatePath('/');
    revalidatePath('/admin/categories');
    revalidatePath(`/category/${existing.slug}`);
    if (slug && slug !== existing.slug) {
      revalidatePath(`/category/${slug}`);
    }

    return createSuccessResponse(updated);
  } catch (error) {
    console.error('Error updating category:', error);
    return createErrorResponse('INTERNAL_SERVER_ERROR', 'Failed to update category.');
  }
}

/**
 * Server Action: Protected Category Deletion
 * Enforces strict rule: Never delete categories containing active articles
 */
export async function deleteCategoryAction(rawInput: unknown): Promise<ApiResponse<{ id: string; success: boolean }>> {
  try {
    const parseResult = deleteSchema.safeParse(rawInput);
    if (!parseResult.success) {
      return createErrorResponse('VALIDATION_ERROR', 'Category ID is required.');
    }

    const { id } = parseResult.data;

    // Check if category has any associated articles
    const articleCount = await prisma.blog.count({
      where: { categoryId: id },
    });

    if (articleCount > 0) {
      return createErrorResponse(
        'PROTECTED_RESOURCE',
        `Cannot delete category because it contains ${articleCount} active articles. Please reassign them first.`
      );
    }

    await prisma.category.delete({
      where: { id },
    });

    revalidatePath('/');
    revalidatePath('/admin/categories');

    return createSuccessResponse({ id, success: true });
  } catch (error) {
    console.error('Error deleting category:', error);
    return createErrorResponse('INTERNAL_SERVER_ERROR', 'Failed to delete category.');
  }
}

/**
 * Server Action: Create Tag
 */
export async function createTagAction(rawInput: unknown): Promise<ApiResponse<{ id: string; slug: string }>> {
  try {
    const parseResult = tagSchema.safeParse(rawInput);
    if (!parseResult.success) {
      return createErrorResponse('VALIDATION_ERROR', 'Invalid tag payload', parseResult.error.flatten().fieldErrors);
    }

    const { name, slug } = parseResult.data;

    const existing = await prisma.tag.findFirst({
      where: { OR: [{ slug }, { name }] },
    });

    if (existing) {
      return createErrorResponse('CONFLICT', 'Tag already exists.');
    }

    const tag = await prisma.tag.create({
      data: { name, slug },
      select: { id: true, slug: true },
    });

    revalidatePath('/admin/tags');

    return createSuccessResponse(tag);
  } catch (error) {
    console.error('Error creating tag:', error);
    return createErrorResponse('INTERNAL_SERVER_ERROR', 'Failed to create tag.');
  }
}

/**
 * Server Action: Delete Tag
 */
export async function deleteTagAction(rawInput: unknown): Promise<ApiResponse<{ id: string; success: boolean }>> {
  try {
    const parseResult = deleteSchema.safeParse(rawInput);
    if (!parseResult.success) {
      return createErrorResponse('VALIDATION_ERROR', 'Tag ID is required.');
    }

    const { id } = parseResult.data;

    await prisma.tag.delete({
      where: { id },
    });

    revalidatePath('/admin/tags');

    return createSuccessResponse({ id, success: true });
  } catch (error) {
    console.error('Error deleting tag:', error);
    return createErrorResponse('INTERNAL_SERVER_ERROR', 'Failed to delete tag.');
  }
}
