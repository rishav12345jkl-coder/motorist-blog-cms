import { PrismaClient, Role, PostStatus, CommentStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('--- MOTORIST BLOG IDEMPOTENT SEEDING STARTED ---');

  // 1. Seed Default Admin User (Safe Dev Credentials)
  const defaultPasswordHash = await bcrypt.hash('MotoristAdmin2026!', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@motoriststore.com' },
    update: {
      name: 'Editorial Lead',
      role: Role.SUPER_ADMIN,
    },
    create: {
      email: 'admin@motoriststore.com',
      passwordHash: defaultPasswordHash,
      name: 'Editorial Lead',
      role: Role.SUPER_ADMIN,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      bio: 'Chief Technical Editor at MOTORIST. Specialist in performance exhausts, ECU maps, and overland Himalayan expeditions.',
      socialLinks: {
        twitter: 'https://twitter.com/motoriststore',
        instagram: 'https://instagram.com/motoriststore',
      },
    },
  });
  console.log(`✓ Admin User Seeded: ${adminUser.email}`);

  // 2. Seed Approved Categories (Strictly the 5 Approved Categories)
  const approvedCategories = [
    {
      name: 'Performance Mods',
      slug: 'performance-mods',
      description: 'Exhaust installations, ECU tuning, dyno testing, and power upgrades.',
      order: 1,
    },
    {
      name: 'Himalayan 450',
      slug: 'himalayan-450',
      description: 'Dedicated build guides, luggage setups, and crash armor for the Royal Enfield Himalayan 450.',
      order: 2,
    },
    {
      name: 'Duke 390',
      slug: 'duke-390',
      description: 'Track day mods, ergonomics, weight saving, and tail tidies for the KTM Duke 390 Gen-3.',
      order: 3,
    },
    {
      name: 'Maintenance',
      slug: 'maintenance',
      description: 'Step-by-step DIY garage maintenance, oil changes, chain adjustments, and brake servicing.',
      order: 4,
    },
    {
      name: 'Touring & Gear',
      slug: 'touring-gear',
      description: 'Luggage systems, auxiliary lighting, waterproof luggage, and cross-country tour planning.',
      order: 5,
    },
  ];

  const categoryMap: Record<string, string> = {};
  for (const cat of approvedCategories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description, order: cat.order },
      create: cat,
    });
    categoryMap[cat.slug] = created.id;
    console.log(`✓ Category Seeded: ${created.name}`);
  }

  // 3. Seed Realistic 10 Tags
  const approvedTags = [
    { name: 'Akrapovic', slug: 'akrapovic' },
    { name: 'Exhaust', slug: 'exhaust' },
    { name: 'Crash Guard', slug: 'crash-guard' },
    { name: 'LED Headlight', slug: 'led-headlight' },
    { name: 'Royal Enfield', slug: 'royal-enfield' },
    { name: 'KTM', slug: 'ktm' },
    { name: 'Torque Specs', slug: 'torque-specs' },
    { name: 'XPulse 210', slug: 'xpulse-210' },
    { name: 'Luggage', slug: 'luggage' },
    { name: 'Brake Servicing', slug: 'brake-servicing' },
  ];

  const tagMap: Record<string, string> = {};
  for (const tag of approvedTags) {
    const created = await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: { name: tag.name },
      create: tag,
    });
    tagMap[tag.slug] = created.id;
  }
  console.log(`✓ Seeded ${approvedTags.length} Tags`);

  // 4. Seed 8 Rich Articles
  const articlesData = [
    {
      slug: 'ultimate-himalayan-450-touring-setup',
      title: 'The Ultimate Himalayan 450 Touring Setup: Racks, LED Lighting & Crash Protection',
      excerpt:
        'From high-altitude Spiti passes to technical highway sections, we test the definitive bolt-on modifications for Royal Enfield’s Sherpa 450 platform. Full parts breakdown and torque specs.',
      content: `## Why the Himalayan 450 Needs Upgraded Armor

When descending rocky terrain, the front tire kicks up heavy gravel directly into the oil filter housing and header pipe. Installing high-grade aluminum protection is essential before tackling any rugged trails.

### Torque Specs Checklist
- Header Flange Bolts: 14 Nm
- Mid-Pipe Clamp: 22 Nm
- Carbon Hanger Bracket: 19 Nm

### Electrical Auxiliary Lighting
Always wire high-draw LED projectors through an inline 30A relay triggered by the high-beam circuit rather than splicing directly into factory harnesses. Check out our store selection at motoriststore.com for plug-and-play wiring looms.`,
      featuredImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200&auto=format&fit=crop&q=80',
      featuredImageAlt: 'Royal Enfield Himalayan 450 on mountain road',
      readingTimeMin: 8,
      isFeatured: true,
      categorySlug: 'himalayan-450',
      tags: ['royal-enfield', 'crash-guard', 'led-headlight', 'torque-specs'],
      likeCount: 142,
      publishedAt: new Date('2026-10-04T10:00:00Z'),
    },
    {
      slug: 'akrapovic-exhaust-install-ktm-duke-390-gen-3',
      title: 'Akrapovic Slip-On Exhaust Install & Sound Test on KTM Duke 390 Gen-3',
      excerpt:
        'We install the carbon-capped Akrapovic slip-on with DB killer on the 399cc LC4c motor. Includes step-by-step bracket torque specs and decibel meter readings.',
      content: `## LC4c Engine Acoustics & Backpressure

The 399cc single cylinder in the Gen-3 Duke 390 is punchy and rev-happy. Installing a titanium/carbon slip-on drops approximately 1.8 kg compared to the factory underbelly chamber while improving mid-range throttle response.

### Installation Steps
1. Loosen mid-pipe clamp.
2. Detach hanger bolt from rear subframe bracket.
3. Fit carbon heat shield.
4. Torque clamp to 22 Nm.`,
      featuredImage: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format&fit=crop&q=80',
      featuredImageAlt: 'KTM Duke 390 with slip-on exhaust',
      readingTimeMin: 6,
      isFeatured: false,
      categorySlug: 'duke-390',
      tags: ['akrapovic', 'exhaust', 'ktm', 'torque-specs'],
      likeCount: 89,
      publishedAt: new Date('2026-10-02T14:30:00Z'),
    },
    {
      slug: 'motorcycle-chain-maintenance-guide',
      title: 'Motorcycle Chain Maintenance: Cleaning, Slack Adjustment & Lube Intervals',
      excerpt:
        'A sloppy chain ruins throttle response and wears sprockets prematurely. Here is the definitive garage checklist for measuring chain slack and applying high-adhesion lubricant.',
      content: `## The 500-Kilometer Service Ritual

Sealed O-ring and X-ring chains require regular degreasing with kerosene-safe cleaners followed by synthetic tacky lube. Never use gasoline or high-pressure power washers directly against the seals.

### Measuring Chain Free-Play
- Place the motorcycle on its side-stand or paddock stand.
- Find the midway point along the bottom chain run.
- Use a steel ruler: slack must sit between 25mm to 30mm.`,
      featuredImage: 'https://images.unsplash.com/photo-1558981420-87aa9210d90e?w=800&auto=format&fit=crop&q=80',
      featuredImageAlt: 'Motorcycle drive chain and rear sprocket',
      readingTimeMin: 5,
      isFeatured: false,
      categorySlug: 'maintenance',
      tags: ['torque-specs', 'brake-servicing'],
      likeCount: 64,
      publishedAt: new Date('2026-09-28T09:15:00Z'),
    },
    {
      slug: 'hard-panniers-vs-soft-luggage-touring',
      title: 'Hard Panniers vs Soft Luggage: The Overland Touring Comparison',
      excerpt:
        'Choosing between aluminum lockable boxes and ballistic nylon soft bags for multi-day expeditions. Weight, crash durability, waterproofing, and center of gravity evaluated.',
      content: `## Aluminum Rigidity vs Soft Bag Resilience

When tackling tough off-camber trails, rigid metal panniers can trap a rider's leg during a tip-over. Soft luggage systems absorb kinetic impacts and keep overall weight closer to the motorcycle centerline.

### Pros & Cons Summary
- **Hard Cases:** Keyed security, weather sealing, flat mounting tabletop.
- **Soft Bags:** Lighter by 6–10 kg, zero denting risks, forgiving in drops.`,
      featuredImage: 'https://images.unsplash.com/photo-1558980664-3a031cf67ea8?w=800&auto=format&fit=crop&q=80',
      featuredImageAlt: 'Adventure touring motorcycle loaded with luggage',
      readingTimeMin: 7,
      isFeatured: false,
      categorySlug: 'touring-gear',
      tags: ['luggage', 'royal-enfield'],
      likeCount: 110,
      publishedAt: new Date('2026-09-24T11:00:00Z'),
    },
    {
      slug: 'brembo-sintered-brake-pads-upgrade',
      title: 'Brembo Sintered Brake Pads: Bed-In Procedure & Stopping Power Test',
      excerpt:
        'Upgrading from organic OEM pads to sintered copper Brembo compounds delivers immediate initial bite and zero fade during aggressive canyon carving.',
      content: `## Sintered Metal Heat Dissipation

Sintered pads fuse metallic particles under high pressure and temperature. They handle rotor temperatures exceeding 600°C without glazing.

### Bed-In Procedure
1. Make 10 moderate stops from 60 km/h down to 10 km/h without locking up.
2. Allow discs to cool for 5 minutes.
3. Perform 5 firm stops from 90 km/h. Do not bring the bike to a complete stop with the lever clamped.`,
      featuredImage: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format&fit=crop&q=80',
      featuredImageAlt: 'Motorcycle front disc brake and Brembo caliper',
      readingTimeMin: 6,
      isFeatured: false,
      categorySlug: 'performance-mods',
      tags: ['brake-servicing', 'torque-specs', 'ktm'],
      likeCount: 77,
      publishedAt: new Date('2026-09-20T16:45:00Z'),
    },
    {
      slug: 'duke-390-gen-3-track-day-setup',
      title: 'KTM Duke 390 Gen-3: Track Day Ergonomics & Tail Tidy Mod',
      excerpt:
        'Transforming the everyday streetfighter into an agile corner weapon. Rear-set positioning, bar clamp inversion, and tail tidy weight reductions.',
      content: `## Chassis Geometry & Rider Triangle

Dropping unsprung weight from the rear tail assembly sharpens turn-in response on the Gen-3 Duke. Pairing an aluminum tail tidy with sticky rubber transforms track confidence.

### Suspension Baseline
- Front Compression: 8 clicks from stiff
- Rebound: 10 clicks
- Rear Preload: Position 4 (with rider sag set at 32mm)`,
      featuredImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80',
      featuredImageAlt: 'KTM Duke 390 aggressive angle',
      readingTimeMin: 7,
      isFeatured: false,
      categorySlug: 'duke-390',
      tags: ['ktm', 'torque-specs'],
      likeCount: 95,
      publishedAt: new Date('2026-09-15T12:00:00Z'),
    },
    {
      slug: 'sherpa-450-oil-change-diy-guide',
      title: 'Royal Enfield Sherpa 450: Complete Engine Oil & Filter Service',
      excerpt:
        'Detailed step-by-step DIY garage tutorial for draining both crankcase plugs, cleaning strainer screens, and refilling with 10W-50 fully synthetic oil.',
      content: `## Liquid-Cooled Sherpa 450 Lubrication System

Unlike the older air-cooled LS410 engine, the modern Sherpa 450 utilizes dual drain plugs and a precision paper cartridge filter element.

### Required Materials
- 2.1 Liters 10W-50 API SN / JASO MA2 fully synthetic oil
- OEM cartridge filter with replacement nitrile O-ring
- 8mm T-handle and 14mm socket`,
      featuredImage: 'https://images.unsplash.com/photo-1558981420-87aa9210d90e?w=800&auto=format&fit=crop&q=80',
      featuredImageAlt: 'Mechanic servicing motorcycle engine with oil filter',
      readingTimeMin: 8,
      isFeatured: false,
      categorySlug: 'maintenance',
      tags: ['royal-enfield', 'torque-specs'],
      likeCount: 88,
      publishedAt: new Date('2026-09-10T14:00:00Z'),
    },
    {
      slug: 'auxiliary-led-projector-relay-wiring',
      title: 'High-Power Aux Lights Wiring Guide: 60W Projectors with Relay Harness',
      excerpt:
        'Illuminate pitch-black highway stretches safely without melting your factory stator or switchgear. Complete wiring diagram with waterproof 4-pin relays.',
      content: `## Stator Load & Safe Relay Isolation

Modern single-cylinder motorcycles produce between 250W and 350W stator capacity. Drawing an extra 60W directly through the handlebar switch will cause premature switch contact pitting.

### Step-by-Step Circuit
- Pin 30: Direct to 12V Battery Positive via 15A inline fuse
- Pin 85: Clean chassis ground
- Pin 86: Switched trigger wire (park light or high beam tap)
- Pin 87: Output to dual LED light pods`,
      featuredImage: 'https://images.unsplash.com/photo-1558980664-3a031cf67ea8?w=800&auto=format&fit=crop&q=80',
      featuredImageAlt: 'Bright auxiliary LED motorcycle lights',
      readingTimeMin: 6,
      isFeatured: false,
      categorySlug: 'touring-gear',
      tags: ['led-headlight', 'luggage'],
      likeCount: 120,
      publishedAt: new Date('2026-09-05T08:30:00Z'),
    },
  ];

  for (const article of articlesData) {
    const blog = await prisma.blog.upsert({
      where: { slug: article.slug },
      update: {
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        featuredImage: article.featuredImage,
        featuredImageAlt: article.featuredImageAlt,
        readingTimeMin: article.readingTimeMin,
        isFeatured: article.isFeatured,
        status: PostStatus.PUBLISHED,
        publishedAt: article.publishedAt,
        likeCount: article.likeCount,
        categoryId: categoryMap[article.categorySlug],
      },
      create: {
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        featuredImage: article.featuredImage,
        featuredImageAlt: article.featuredImageAlt,
        readingTimeMin: article.readingTimeMin,
        isFeatured: article.isFeatured,
        status: PostStatus.PUBLISHED,
        publishedAt: article.publishedAt,
        likeCount: article.likeCount,
        authorId: adminUser.id,
        categoryId: categoryMap[article.categorySlug],
        metaTitle: `${article.title} | MOTORIST`,
        metaDescription: article.excerpt,
      },
    });

    // Associate Tags
    for (const tagSlug of article.tags) {
      if (tagMap[tagSlug]) {
        await prisma.blogTag.upsert({
          where: { blogId_tagId: { blogId: blog.id, tagId: tagMap[tagSlug] } },
          update: {},
          create: { blogId: blog.id, tagId: tagMap[tagSlug] },
        });
      }
    }

    console.log(`✓ Article & Tags Seeded: ${article.title}`);
  }

  // 5. Seed 2-Tier Discussion Thread
  const firstArticle = await prisma.blog.findUnique({
    where: { slug: 'akrapovic-exhaust-install-ktm-duke-390-gen-3' },
  });

  if (firstArticle) {
    const rootComment = await prisma.comment.create({
      data: {
        blogId: firstArticle.id,
        authorName: 'Vikram Sethi',
        authorEmail: 'vikram.sethi@example.com',
        content:
          'Does the Akrapovic slip-on require an ECU remap on the Gen-3 Duke 390, or does the stock oxygen sensor adapt adequately?',
        status: CommentStatus.APPROVED,
        ipHash: 'demo_ip_hash_vikram_01',
      },
    });

    await prisma.comment.create({
      data: {
        blogId: firstArticle.id,
        parentId: rootComment.id,
        authorName: 'Arjun Mehta (Editor)',
        authorEmail: 'admin@motoriststore.com',
        content:
          'With the DB killer installed, the closed-loop stock ECU adapts smoothly within 15–20 kms of riding. If you run without the baffle, a fuel tuner is recommended to prevent running lean.',
        status: CommentStatus.APPROVED,
        ipHash: 'demo_ip_hash_editor_02',
      },
    });

    // Seed a Pending Comment to test moderation queue
    await prisma.comment.create({
      data: {
        blogId: firstArticle.id,
        authorName: 'Karan Joshi',
        authorEmail: 'karan@example.com',
        content: 'Where can I order the specific crash guard spacers mentioned in section 2?',
        status: CommentStatus.PENDING,
        ipHash: 'demo_ip_hash_karan_03',
      },
    });
    console.log('✓ Threaded Comments Seeded (Approved & Pending)');
  }

  console.log('--- MOTORIST BLOG SEEDING COMPLETED SUCCESSFULLY ---');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
