"use strict";

const { QueryTypes } = require("sequelize");

module.exports = {
  async up(queryInterface) {
    const products = await queryInterface.sequelize.query(
      'SELECT id, name, "price", "compareAtPrice", "imageUrl" FROM "Products" ORDER BY id ASC LIMIT 6;',
      { type: QueryTypes.SELECT }
    );

    if (!products.length) {
      return;
    }

    const now = new Date();
    const [foundation, lip, mascara, essence, fragrance, haircare] = products;

    await queryInterface.bulkInsert("Orders", [
      {
        orderNumber: "GLM-1001",
        customerName: "Ayesha Khan",
        customerEmail: "ayesha@example.com",
        phone: "+92 300 1112233",
        address: "House 18, Block C, DHA",
        city: "Lahore",
        status: "confirmed",
        paymentMethod: "Cash on Delivery",
        subtotal: 6850,
        discountAmount: 450,
        total: 6400,
        items: JSON.stringify([
          {
            productId: foundation?.id,
            name: foundation?.name,
            quantity: 1,
            unitPrice: foundation?.price,
            imageUrl: foundation?.imageUrl
          },
          {
            productId: lip?.id,
            name: lip?.name,
            quantity: 1,
            unitPrice: lip?.price,
            imageUrl: lip?.imageUrl
          }
        ]),
        notes: "Customer requested evening delivery.",
        createdAt: now,
        updatedAt: now
      },
      {
        orderNumber: "GLM-1002",
        customerName: "Sara Ahmed",
        customerEmail: "sara@example.com",
        phone: "+92 321 4447788",
        address: "Apartment 9B, Clifton",
        city: "Karachi",
        status: "pending",
        paymentMethod: "JazzCash",
        subtotal: 6050,
        discountAmount: 0,
        total: 6050,
        items: JSON.stringify([
          {
            productId: mascara?.id,
            name: mascara?.name,
            quantity: 1,
            unitPrice: mascara?.price,
            imageUrl: mascara?.imageUrl
          },
          {
            productId: essence?.id,
            name: essence?.name,
            quantity: 1,
            unitPrice: essence?.price,
            imageUrl: essence?.imageUrl
          }
        ]),
        notes: "Awaiting payment confirmation.",
        createdAt: new Date(now.getTime() - 86400000),
        updatedAt: new Date(now.getTime() - 86400000)
      },
      {
        orderNumber: "GLM-1003",
        customerName: "Fatima Malik",
        customerEmail: "fatima@example.com",
        phone: "+92 333 2229988",
        address: "Street 12, F-7",
        city: "Islamabad",
        status: "shipped",
        paymentMethod: "Bank Transfer",
        subtotal: 9850,
        discountAmount: 650,
        total: 9200,
        items: JSON.stringify([
          {
            productId: fragrance?.id,
            name: fragrance?.name,
            quantity: 1,
            unitPrice: fragrance?.price,
            imageUrl: fragrance?.imageUrl
          },
          {
            productId: haircare?.id,
            name: haircare?.name,
            quantity: 1,
            unitPrice: haircare?.price,
            imageUrl: haircare?.imageUrl
          }
        ]),
        notes: "Tracking shared over SMS.",
        createdAt: new Date(now.getTime() - 172800000),
        updatedAt: new Date(now.getTime() - 172800000)
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Orders", null, {});
  }
};
