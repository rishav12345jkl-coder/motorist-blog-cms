import { BlogPostPreview, ProductEmbed, CommentPreview } from '@/types/blog';

export const mockAuthor = {
  id: 'usr_1',
  name: 'Arjun Mehta',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'Chief Technical Editor & Track Rider',
  bio: 'Former motorcycle mechanic and national supersport racer. Obsessed with slip-on exhaust acoustics, ECU flash mapping, and Himalayan expedition setups.',
};

export const mockCategories = [
  { id: 'cat_all', name: 'All Stories', slug: 'all' },
  { id: 'cat_1', name: 'Performance Mods', slug: 'performance-mods' },
  { id: 'cat_2', name: 'Himalayan 450', slug: 'himalayan-450' },
  { id: 'cat_3', name: 'Duke 390', slug: 'duke-390' },
  { id: 'cat_4', name: 'Maintenance', slug: 'maintenance' },
  { id: 'cat_5', name: 'Touring & Gear', slug: 'touring-gear' },
];

export const mockFeaturedPost: BlogPostPreview = {
  id: 'post_feat_1',
  title: 'The Ultimate Himalayan 450 Touring Setup: Racks, LED Lighting & Crash Protection',
  slug: 'ultimate-himalayan-450-touring-setup',
  excerpt:
    'From high-altitude Spiti passes to technical highway sections, we test the definitive bolt-on modifications for Royal Enfield’s Sherpa 450 platform. Here is the full parts breakdown.',
  featuredImage:
    'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200&auto=format&fit=crop&q=80',
  featuredImageAlt: 'Himalayan 450 on mountain pass',
  readingTimeMin: 8,
  publishedAt: '2026-10-04T10:00:00Z',
  author: mockAuthor,
  category: { id: 'cat_2', name: 'Himalayan 450', slug: 'himalayan-450' },
  likeCount: 142,
  commentCount: 18,
  isFeatured: true,
};

export const mockPosts: BlogPostPreview[] = [
  {
    id: 'post_1',
    title: 'Akrapovic Slip-On Exhaust Install & Sound Test on KTM Duke 390 Gen-3',
    slug: 'akrapovic-exhaust-install-ktm-duke-390-gen-3',
    excerpt:
      'We install the carbon-capped Akrapovic slip-on with DB killer on the 399cc LC4c motor. Includes step-by-step bracket torque specs and decibel meter readings.',
    featuredImage:
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format&fit=crop&q=80',
    readingTimeMin: 6,
    publishedAt: '2026-10-02T14:30:00Z',
    author: mockAuthor,
    category: { id: 'cat_1', name: 'Performance Mods', slug: 'performance-mods' },
    likeCount: 89,
    commentCount: 12,
  },
  {
    id: 'post_2',
    title: 'HJG LED Projector Headlight Wiring Guide for Classic Royal Enfield Bullets',
    slug: 'hjg-led-headlight-wiring-royal-enfield',
    excerpt:
      'Eliminate dim halogen illumination. A comprehensive guide to relay wiring, fuse protection, and clean beam cutoff alignment for nighttime touring.',
    featuredImage:
      'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&auto=format&fit=crop&q=80',
    readingTimeMin: 5,
    publishedAt: '2026-09-28T09:15:00Z',
    author: mockAuthor,
    category: { id: 'cat_4', name: 'Maintenance', slug: 'maintenance' },
    likeCount: 64,
    commentCount: 9,
  },
  {
    id: 'post_3',
    title: 'Hero XPulse 210 Essential Trail Armor: Bash Plates & Handlebar Risers',
    slug: 'hero-xpulse-210-trail-armor-bash-plates',
    excerpt:
      'Protecting your crankcase and improving standing ergonomics on the new XPulse 210 platform before hitting the dirt trails.',
    featuredImage:
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=800&auto=format&fit=crop&q=80',
    readingTimeMin: 7,
    publishedAt: '2026-09-24T11:00:00Z',
    author: mockAuthor,
    category: { id: 'cat_5', name: 'Touring & Gear', slug: 'touring-gear' },
    likeCount: 51,
    commentCount: 6,
  },
];

export const mockProductEmbed: ProductEmbed = {
  id: 'prod_1',
  title: 'AKRAPOVIC SLIP-ON CARBON EXHAUST — KTM DUKE 390 GEN-3',
  priceFormatted: '₹34,999',
  imageUrl:
    'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=400&auto=format&fit=crop&q=80',
  fitmentBadge: 'Guaranteed Fit: Gen-3 LC4c',
  storeUrl: 'https://motoriststore.com/collections/exhaust',
};

export const mockComments: CommentPreview[] = [
  {
    id: 'comm_1',
    authorName: 'Vikram Sethi',
    content:
      'Does the Akrapovic slip-on require an ECU remap or FuelX module on the Gen-3 Duke 390, or does the stock closed-loop oxygen sensor adjust adequately?',
    createdAt: '2026-10-03T16:20:00Z',
    replies: [
      {
        id: 'comm_2',
        authorName: 'Arjun Mehta (Author)',
        content:
          'Great question Vikram! With the DB killer installed, the stock ECU adapts smoothly within 15–20 kms of riding. If you run it decat without the baffle, a FuelX Pro is recommended to prevent running lean at wide-open throttle.',
        createdAt: '2026-10-03T17:05:00Z',
        parentId: 'comm_1',
      },
    ],
  },
  {
    id: 'comm_3',
    authorName: 'Kabir Das',
    content:
      'Installed the Himalayan 450 crash guards based on this guide last weekend. Solid build quality and zero vibrations on highway cruising!',
    createdAt: '2026-10-04T12:45:00Z',
  },
];
