"use strict";

const { QueryTypes } = require("sequelize");

const nailImages = {
  acrylic: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=85",
  gel: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1200&q=85",
  french: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=1200&q=85",
  bridal: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=1200&q=85"
};

const categories = [
  {
    oldSlug: "eyes",
    name: "Acrylic Nails",
    slug: "acrylic-nails",
    description: "Durable length, sculpted shape and a polished salon finish.",
    imageUrl: nailImages.acrylic
  },
  {
    oldSlug: "lips",
    name: "Gel Nails",
    slug: "gel-nails",
    description: "Glossy color, smooth wear and flexible chip-resistant shine.",
    imageUrl: nailImages.gel
  },
  {
    oldSlug: "makeup",
    name: "French Tips",
    slug: "french-tips",
    description: "Clean, timeless tips from classic white to soft modern color.",
    imageUrl: nailImages.french
  },
  {
    oldSlug: "skincare",
    name: "Bridal Nails",
    slug: "bridal-nails",
    description: "Elegant pearl, nude and shimmer sets for wedding moments.",
    imageUrl: nailImages.bridal
  },
  {
    oldSlug: "fragrance",
    name: "Chrome Nails",
    slug: "chrome-nails",
    description: "Mirror, pearl and glazed chrome finishes with soft dimension.",
    imageUrl: nailImages.gel
  },
  {
    oldSlug: "haircare",
    name: "Nail Care",
    slug: "nail-care",
    description: "Strengtheners, oils and top coats that keep every set healthy.",
    imageUrl: nailImages.acrylic
  }
];

const productRows = [
  {
    oldSlug: "velvet-skin-foundation",
    categorySlug: "french-tips",
    name: "Soft French Tip Kit",
    slug: "soft-french-tip-kit",
    shortDescription: "Guide stickers, sheer polish and a clean studio-white finish.",
    description: "A beginner-friendly French tip kit designed for neat curves, creamy color and a clean salon-inspired finish at home.",
    price: 4200,
    basePrice: 5000,
    compareAtPrice: 5000,
    discountPercentage: 16,
    stock: 24,
    imageUrl: nailImages.french,
    gallery: [nailImages.french, nailImages.acrylic],
    badge: "Best Seller"
  },
  {
    oldSlug: "rose-cloud-lip-mousse",
    categorySlug: "gel-nails",
    name: "Gloss Lock Gel Polish",
    slug: "gloss-lock-gel-polish",
    shortDescription: "High-shine gel color with a flexible, chip-resistant finish.",
    description: "A studio-grade gel polish made for smooth application, rich color payoff and long-lasting shine between appointments.",
    price: 2650,
    basePrice: 3200,
    compareAtPrice: 3200,
    discountPercentage: 17,
    stock: 40,
    imageUrl: nailImages.gel,
    gallery: [nailImages.gel, nailImages.bridal],
    badge: "New"
  },
  {
    oldSlug: "midnight-lash-mascara",
    categorySlug: "acrylic-nails",
    name: "Acrylic Sculpting Starter Set",
    slug: "acrylic-sculpting-starter-set",
    shortDescription: "Powder, liquid and shaping essentials for durable nail length.",
    description: "A balanced acrylic set for clean structure, controlled application and strong salon-style extensions.",
    price: 2450,
    basePrice: 2900,
    compareAtPrice: 2900,
    discountPercentage: 16,
    stock: 55,
    imageUrl: nailImages.acrylic,
    gallery: [nailImages.acrylic, nailImages.french],
    badge: "Trending"
  },
  {
    oldSlug: "dew-therapy-essence",
    categorySlug: "bridal-nails",
    name: "Pearl Bridal Press-On Set",
    slug: "pearl-bridal-press-on-set",
    shortDescription: "Soft nude press-ons with pearl detail and elegant shine.",
    description: "A romantic bridal nail set with pearl accents, refined length and a photo-ready finish for special events.",
    price: 3600,
    basePrice: 4200,
    compareAtPrice: 4200,
    discountPercentage: 14,
    stock: 31,
    imageUrl: nailImages.bridal,
    gallery: [nailImages.bridal, nailImages.gel],
    badge: "Bridal"
  },
  {
    oldSlug: "amber-bloom-eau-de-parfum",
    categorySlug: "chrome-nails",
    name: "Glazed Chrome Powder",
    slug: "glazed-chrome-powder",
    shortDescription: "Pearl chrome powder for glazed, mirror-soft nail finishes.",
    description: "A silky chrome powder that buffs over gel color for glazed donut shine, pearl dimension and high-impact nail art.",
    price: 6900,
    basePrice: 7600,
    compareAtPrice: 7600,
    discountPercentage: 9,
    stock: 18,
    imageUrl: nailImages.gel,
    gallery: [nailImages.gel, nailImages.french],
    badge: "Chrome"
  },
  {
    oldSlug: "silk-repair-hair-oil",
    categorySlug: "nail-care",
    name: "Cuticle Glow Oil",
    slug: "cuticle-glow-oil",
    shortDescription: "Nourishing oil for healthy cuticles and glossy nail beds.",
    description: "A lightweight cuticle oil that softens dry skin, supports nail health and keeps every manicure looking fresh.",
    price: 2950,
    basePrice: 3500,
    compareAtPrice: 3500,
    discountPercentage: 16,
    stock: 27,
    imageUrl: nailImages.acrylic,
    gallery: [nailImages.acrylic, nailImages.bridal],
    badge: "Care"
  },
  {
    oldSlug: "glow-frame-highlighter-duo",
    categorySlug: "french-tips",
    name: "Lavender Cat Eye Polish",
    slug: "lavender-cat-eye-polish",
    shortDescription: "Magnetic shimmer polish with soft lavender dimension.",
    description: "A magnetic cat-eye polish that shifts under light for a dimensional lavender nail look with studio-level shine.",
    price: 3100,
    basePrice: 3800,
    compareAtPrice: 3800,
    discountPercentage: 18,
    stock: 36,
    imageUrl: nailImages.french,
    gallery: [nailImages.french, nailImages.gel],
    badge: "Cat Eye"
  },
  {
    oldSlug: "overnight-barrier-cream",
    categorySlug: "bridal-nails",
    name: "Strengthening Base Coat",
    slug: "strengthening-base-coat",
    shortDescription: "Protective base coat for smooth polish and stronger nails.",
    description: "A smoothing base coat that helps polish grip evenly while supporting nails through regular manicures.",
    price: 3400,
    basePrice: 3900,
    compareAtPrice: 3900,
    discountPercentage: 13,
    stock: 22,
    imageUrl: nailImages.bridal,
    gallery: [nailImages.bridal, nailImages.acrylic],
    badge: "Strength"
  }
];

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.sequelize.query(
      'UPDATE "Users" SET name = :name, "updatedAt" = :updatedAt WHERE email = :email;',
      {
        replacements: {
          name: "Glam Nail Studio Admin",
          email: "admin@glamspot.pk",
          updatedAt: now
        }
      }
    );

    for (const category of categories) {
      await queryInterface.sequelize.query(
        `UPDATE "Categories"
         SET name = :name,
             slug = :slug,
             description = :description,
             "imageUrl" = :imageUrl,
             featured = true,
             "updatedAt" = :updatedAt
         WHERE slug = :oldSlug OR slug = :slug;`,
        {
          replacements: {
            ...category,
            updatedAt: now
          }
        }
      );

      await queryInterface.sequelize.query(
        `INSERT INTO "Categories" (name, slug, description, "imageUrl", featured, "createdAt", "updatedAt")
         VALUES (:name, :slug, :description, :imageUrl, true, :createdAt, :updatedAt)
         ON CONFLICT (slug) DO UPDATE
         SET name = EXCLUDED.name,
             description = EXCLUDED.description,
             "imageUrl" = EXCLUDED."imageUrl",
             featured = EXCLUDED.featured,
             "updatedAt" = EXCLUDED."updatedAt";`,
        {
          replacements: {
            ...category,
            createdAt: now,
            updatedAt: now
          }
        }
      );
    }

    const insertedCategories = await queryInterface.sequelize.query(
      'SELECT id, slug FROM "Categories";',
      { type: QueryTypes.SELECT }
    );

    const categoryMap = insertedCategories.reduce((acc, category) => {
      acc[category.slug] = category.id;
      return acc;
    }, {});

    for (const product of productRows) {
      await queryInterface.sequelize.query(
        `UPDATE "Products"
         SET "categoryId" = :categoryId,
             name = :name,
             slug = :slug,
             "shortDescription" = :shortDescription,
             description = :description,
             "imageUrl" = :imageUrl,
             gallery = ARRAY[:gallery0, :gallery1]::varchar[],
             badge = :badge,
             "updatedAt" = :updatedAt
         WHERE slug = :oldSlug OR slug = :slug;`,
        {
          replacements: {
            ...product,
            categoryId: categoryMap[product.categorySlug],
            gallery0: product.gallery[0],
            gallery1: product.gallery[1],
            updatedAt: now
          }
        }
      );

      await queryInterface.sequelize.query(
        `INSERT INTO "Products" (
           "categoryId",
           name,
           slug,
           "shortDescription",
           description,
           price,
           "basePrice",
           "compareAtPrice",
           "discountPercentage",
           stock,
           "imageUrl",
           gallery,
           badge,
           featured,
           active,
           "createdAt",
           "updatedAt"
         )
         VALUES (
           :categoryId,
           :name,
           :slug,
           :shortDescription,
           :description,
           :price,
           :basePrice,
           :compareAtPrice,
           :discountPercentage,
           :stock,
           :imageUrl,
           ARRAY[:gallery0, :gallery1]::varchar[],
           :badge,
           true,
           true,
           :createdAt,
           :updatedAt
         )
         ON CONFLICT (slug) DO UPDATE
         SET "categoryId" = EXCLUDED."categoryId",
             name = EXCLUDED.name,
             "shortDescription" = EXCLUDED."shortDescription",
             description = EXCLUDED.description,
             price = EXCLUDED.price,
             "basePrice" = EXCLUDED."basePrice",
             "compareAtPrice" = EXCLUDED."compareAtPrice",
             "discountPercentage" = EXCLUDED."discountPercentage",
             stock = EXCLUDED.stock,
             "imageUrl" = EXCLUDED."imageUrl",
             gallery = EXCLUDED.gallery,
             badge = EXCLUDED.badge,
             featured = EXCLUDED.featured,
             active = EXCLUDED.active,
             "updatedAt" = EXCLUDED."updatedAt";`,
        {
          replacements: {
            ...product,
            categoryId: categoryMap[product.categorySlug],
            gallery0: product.gallery[0],
            gallery1: product.gallery[1],
            createdAt: now,
            updatedAt: now
          }
        }
      );
    }

    const products = await queryInterface.sequelize.query(
      'SELECT id, name, price, "imageUrl" FROM "Products" ORDER BY id ASC LIMIT 6;',
      { type: QueryTypes.SELECT }
    );

    const [frenchKit, gelPolish, acrylicSet, bridalSet, chromePowder, cuticleOil] = products;

    const orderUpdates = [
      {
        orderNumber: "GLM-1001",
        items: [
          { productId: frenchKit?.id, name: frenchKit?.name, quantity: 1, unitPrice: frenchKit?.price, imageUrl: frenchKit?.imageUrl },
          { productId: gelPolish?.id, name: gelPolish?.name, quantity: 1, unitPrice: gelPolish?.price, imageUrl: gelPolish?.imageUrl }
        ]
      },
      {
        orderNumber: "GLM-1002",
        items: [
          { productId: acrylicSet?.id, name: acrylicSet?.name, quantity: 1, unitPrice: acrylicSet?.price, imageUrl: acrylicSet?.imageUrl },
          { productId: bridalSet?.id, name: bridalSet?.name, quantity: 1, unitPrice: bridalSet?.price, imageUrl: bridalSet?.imageUrl }
        ]
      },
      {
        orderNumber: "GLM-1003",
        items: [
          { productId: chromePowder?.id, name: chromePowder?.name, quantity: 1, unitPrice: chromePowder?.price, imageUrl: chromePowder?.imageUrl },
          { productId: cuticleOil?.id, name: cuticleOil?.name, quantity: 1, unitPrice: cuticleOil?.price, imageUrl: cuticleOil?.imageUrl }
        ]
      }
    ];

    for (const order of orderUpdates) {
      await queryInterface.sequelize.query(
        'UPDATE "Orders" SET items = :items, "updatedAt" = :updatedAt WHERE "orderNumber" = :orderNumber;',
        {
          replacements: {
            orderNumber: order.orderNumber,
            items: JSON.stringify(order.items),
            updatedAt: now
          }
        }
      );
    }
  },

  async down() {
    // This rebrand seed is intentionally one-way so it does not overwrite newer admin edits.
  }
};
