export interface Author {
  id: string;
  name: string;
  avatarUrl: string;
  role: string;
  bio?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  articleCount?: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPostPreview {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  featuredImageAlt?: string;
  readingTimeMin: number;
  publishedAt: string;
  author: Author;
  category: Category;
  tags?: Tag[];
  likeCount: number;
  commentCount: number;
  isFeatured?: boolean;
}

export interface ProductEmbed {
  id: string;
  title: string;
  priceFormatted: string;
  imageUrl: string;
  fitmentBadge: string;
  storeUrl: string;
}

export interface CommentPreview {
  id: string;
  authorName: string;
  content: string;
  createdAt: string;
  parentId?: string | null;
  replies?: CommentPreview[];
}
