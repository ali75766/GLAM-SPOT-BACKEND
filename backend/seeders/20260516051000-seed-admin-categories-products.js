"use strict";

const bcrypt = require("bcryptjs");
const { QueryTypes } = require("sequelize");

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const password = await bcrypt.hash("Admin@123", 10);

    await queryInterface.bulkInsert("Users", [
      {
        name: "Glam Nail Studio Admin",
        email: "admin@glamspot.pk",
        password,
        role: "admin",
        createdAt: now,
        updatedAt: now,
      },
    ]);

    const categories = [
      {
        name: "Eyes",
        slug: "eyes",
        description:
          "Palettes, liners, mascaras and brow staples for statement eyes.",
        imageUrl:
          "https://images.pexels.com/photos/7290089/pexels-photo-7290089.jpeg?auto=compress&cs=tinysrgb&w=1200",
        featured: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Lips",
        slug: "lips",
        description:
          "Hydrating tints, satin lipsticks and long-wear glosses in modern shades.",
        imageUrl:
          "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=1200",
        featured: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Makeup",
        slug: "makeup",
        description:
          "Complexion heroes and everyday essentials curated for effortless glam.",
        imageUrl:
          "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=1200",
        featured: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Skincare",
        slug: "skincare",
        description:
          "Glow-first skincare with hydration, barrier support and spa-like textures.",
        imageUrl:
          "https://images.pexels.com/photos/6621463/pexels-photo-6621463.jpeg?auto=compress&cs=tinysrgb&w=1200",
        featured: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Fragrance",
        slug: "fragrance",
        description:
          "Signature scents from floral daytime notes to warm evening blends.",
        imageUrl:
          "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=1200",
        featured: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Haircare",
        slug: "haircare",
        description:
          "Repair, polish and styling must-haves for healthy, camera-ready hair.",
        imageUrl:
          "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1200",
        featured: true,
        createdAt: now,
        updatedAt: now,
      },
    ];

    await queryInterface.bulkInsert("Categories", categories);

    const insertedCategories = await queryInterface.sequelize.query(
      'SELECT id, slug FROM "Categories";',
      { type: QueryTypes.SELECT },
    );

    const categoryMap = insertedCategories.reduce((acc, category) => {
      acc[category.slug] = category.id;
      return acc;
    }, {});

    await queryInterface.bulkInsert("Products", [
      {
        categoryId: categoryMap.makeup,
        name: "Velvet Skin Foundation",
        slug: "velvet-skin-foundation",
        shortDescription:
          "Soft-focus medium coverage with a breathable satin finish.",
        description:
          "A skin-loving liquid foundation designed for long wear, smooth blending and a naturally perfected glow that photographs beautifully.",
        price: 4200,
        basePrice: 5000,
        compareAtPrice: 5000,
        discountPercentage: 16,
        stock: 24,
        imageUrl:
          "https://images.pexels.com/photos/3373746/pexels-photo-3373746.jpeg?auto=compress&cs=tinysrgb&w=1200",
        gallery: [
          "https://images.pexels.com/photos/3373746/pexels-photo-3373746.jpeg?auto=compress&cs=tinysrgb&w=1200",
          "https://images.pexels.com/photos/2693644/pexels-photo-2693644.jpeg?auto=compress&cs=tinysrgb&w=1200",
        ],
        badge: "Best Seller",
        featured: true,
        active: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        categoryId: categoryMap.lips,
        name: "Rose Cloud Lip Mousse",
        slug: "rose-cloud-lip-mousse",
        shortDescription:
          "Weightless whipped pigment with a comfortable blurred finish.",
        description:
          "This modern lip mousse melts onto lips with a cushiony texture and a romantic rose tone that suits day and night looks.",
        price: 2650,
        basePrice: 3200,
        compareAtPrice: 3200,
        discountPercentage: 17,
        stock: 40,
        imageUrl:
          "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=1200",
        gallery: [
          "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=1200",
          "https://images.pexels.com/photos/3373726/pexels-photo-3373726.jpeg?auto=compress&cs=tinysrgb&w=1200",
        ],
        badge: "New",
        featured: true,
        active: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        categoryId: categoryMap.eyes,
        name: "Midnight Lash Mascara",
        slug: "midnight-lash-mascara",
        shortDescription:
          "Lengthening mascara with flexible hold and clean separation.",
        description:
          "Build rich, lifted lashes with a transfer-resistant formula that creates elegant volume without clumping or flaking.",
        price: 2450,
        basePrice: 2900,
        compareAtPrice: 2900,
        discountPercentage: 16,
        stock: 55,
        imageUrl:
          "https://images.pexels.com/photos/7290089/pexels-photo-7290089.jpeg?auto=compress&cs=tinysrgb&w=1200",
        gallery: [
          "https://images.pexels.com/photos/7290089/pexels-photo-7290089.jpeg?auto=compress&cs=tinysrgb&w=1200",
          "https://images.pexels.com/photos/3373738/pexels-photo-3373738.jpeg?auto=compress&cs=tinysrgb&w=1200",
        ],
        badge: "Trending",
        featured: true,
        active: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        categoryId: categoryMap.skincare,
        name: "Dew Therapy Essence",
        slug: "dew-therapy-essence",
        shortDescription:
          "Plumping hydration for calm, radiant skin every day.",
        description:
          "Packed with humectants and soothing botanicals, this essence layers effortlessly into your routine for a bouncy, luminous finish.",
        price: 3600,
        basePrice: 4200,
        compareAtPrice: 4200,
        discountPercentage: 14,
        stock: 31,
        imageUrl:
          "https://images.pexels.com/photos/6621463/pexels-photo-6621463.jpeg?auto=compress&cs=tinysrgb&w=1200",
        gallery: [
          "https://images.pexels.com/photos/6621463/pexels-photo-6621463.jpeg?auto=compress&cs=tinysrgb&w=1200",
          "https://images.pexels.com/photos/5069606/pexels-photo-5069606.jpeg?auto=compress&cs=tinysrgb&w=1200",
        ],
        badge: "Hydration",
        featured: true,
        active: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        categoryId: categoryMap.fragrance,
        name: "Amber Bloom Eau De Parfum",
        slug: "amber-bloom-eau-de-parfum",
        shortDescription:
          "A warm floral scent with citrus sparkle and creamy woods.",
        description:
          "Amber Bloom opens with bright mandarin, softens into petal notes and settles into a polished skin scent made for daily luxury.",
        price: 6900,
        basePrice: 7600,
        compareAtPrice: 7600,
        discountPercentage: 9,
        stock: 18,
        imageUrl:
          "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=1200",
        gallery: [
          "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=1200",
          "https://images.pexels.com/photos/3059624/pexels-photo-3059624.jpeg?auto=compress&cs=tinysrgb&w=1200",
        ],
        badge: "Signature",
        featured: false,
        active: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        categoryId: categoryMap.haircare,
        name: "Silk Repair Hair Oil",
        slug: "silk-repair-hair-oil",
        shortDescription:
          "Lightweight shine serum that smooths and softens instantly.",
        description:
          "A nourishing finishing oil that tamps down frizz, protects lengths and leaves hair glossy without weighing it down.",
        price: 2950,
        basePrice: 3500,
        compareAtPrice: 3500,
        discountPercentage: 16,
        stock: 27,
        imageUrl:
          "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1200",
        gallery: [
          "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1200",
          "https://images.pexels.com/photos/7262991/pexels-photo-7262991.jpeg?auto=compress&cs=tinysrgb&w=1200",
        ],
        badge: "Editor Pick",
        featured: false,
        active: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        categoryId: categoryMap.makeup,
        name: "Glow Frame Highlighter Duo",
        slug: "glow-frame-highlighter-duo",
        shortDescription:
          "Champagne and rose gold powders for lit-from-within radiance.",
        description:
          "A soft shimmer duo that melts into skin and adds dimension to cheeks, eyes and collarbones without a chunky glitter finish.",
        price: 3100,
        basePrice: 3800,
        compareAtPrice: 3800,
        discountPercentage: 18,
        stock: 36,
        imageUrl:
          "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=1200",
        gallery: [
          "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=1200",
          "https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg?auto=compress&cs=tinysrgb&w=1200",
        ],
        badge: "Glow",
        featured: true,
        active: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        categoryId: categoryMap.skincare,
        name: "Overnight Barrier Cream",
        slug: "overnight-barrier-cream",
        shortDescription:
          "Rich recovery cream that seals in moisture all night.",
        description:
          "Designed for tired, dehydrated skin, this nourishing cream helps support the skin barrier and wake up your complexion by morning.",
        price: 3400,
        basePrice: 3900,
        compareAtPrice: 3900,
        discountPercentage: 13,
        stock: 22,
        imageUrl:
          "https://images.pexels.com/photos/5069606/pexels-photo-5069606.jpeg?auto=compress&cs=tinysrgb&w=1200",
        gallery: [
          "https://images.pexels.com/photos/5069606/pexels-photo-5069606.jpeg?auto=compress&cs=tinysrgb&w=1200",
          "https://images.pexels.com/photos/6621463/pexels-photo-6621463.jpeg?auto=compress&cs=tinysrgb&w=1200",
        ],
        badge: "Night Care",
        featured: false,
        active: true,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Products", null, {});
    await queryInterface.bulkDelete("Categories", null, {});
    await queryInterface.bulkDelete(
      "Users",
      { email: "admin@glamspot.pk" },
      {},
    );
  },
};
