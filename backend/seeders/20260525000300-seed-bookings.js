"use strict";

const { QueryTypes } = require("sequelize");

module.exports = {
  async up(queryInterface) {
    const existingBookings = await queryInterface.sequelize.query(
      'SELECT id FROM "Bookings" LIMIT 1;',
      { type: QueryTypes.SELECT }
    );

    if (existingBookings.length) {
      return;
    }

    const categories = await queryInterface.sequelize.query(
      'SELECT id, name, slug FROM "Categories" ORDER BY id ASC;',
      { type: QueryTypes.SELECT }
    );

    if (!categories.length) {
      return;
    }

    const findCategory = (slug, fallbackIndex = 0) =>
      categories.find((category) => category.slug === slug) || categories[fallbackIndex] || categories[0];

    const gel = findCategory("gel-nails", 0);
    const bridal = findCategory("bridal-nails", 1);
    const chrome = findCategory("chrome-nails", 2);
    const now = new Date();

    await queryInterface.bulkInsert("Bookings", [
      {
        customerName: "Ayesha Khan",
        customerEmail: "ayesha@example.com",
        phone: "+92 300 1112233",
        preferredDate: "2026-05-28",
        serviceCategoryId: gel.id,
        serviceName: gel.name,
        status: "pending",
        notes: "Prefers a soft nude gel set.",
        createdAt: now,
        updatedAt: now
      },
      {
        customerName: "Sara Ahmed",
        customerEmail: "sara@example.com",
        phone: "+92 321 4447788",
        preferredDate: "2026-05-30",
        serviceCategoryId: bridal.id,
        serviceName: bridal.name,
        status: "confirmed",
        notes: "Needs a bridal pearl set for an evening event.",
        createdAt: new Date(now.getTime() - 86400000),
        updatedAt: new Date(now.getTime() - 86400000)
      },
      {
        customerName: "Fatima Malik",
        customerEmail: "fatima@example.com",
        phone: "+92 333 2229988",
        preferredDate: "2026-06-02",
        serviceCategoryId: chrome.id,
        serviceName: chrome.name,
        status: "pending",
        notes: "Asked about glazed chrome options.",
        createdAt: new Date(now.getTime() - 172800000),
        updatedAt: new Date(now.getTime() - 172800000)
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Bookings", null, {});
  }
};
