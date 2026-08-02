const { Order, Product } = require("../models");

const normalizeOrder = (order) => {
  const payload = order.toJSON ? order.toJSON() : order;

  if (typeof payload.items === "string") {
    try {
      payload.items = JSON.parse(payload.items);
    } catch (error) {
      payload.items = [];
    }
  }

  return payload;
};

const createOrderNumber = () => `GLM-${Date.now().toString().slice(-6)}`;

const createOrder = async (req, res, next) => {
  try {
    const { items, phone, address, city, paymentMethod, notes } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      res.status(400);
      throw new Error("Order items are required");
    }

    if (!phone || !address || !city || !paymentMethod) {
      res.status(400);
      throw new Error("Phone, address, city and payment method are required");
    }

    const productIds = items.map((item) => Number(item.productId)).filter(Boolean);
    const products = await Product.findAll({
      where: {
        id: productIds,
        active: true
      }
    });

    if (products.length !== productIds.length) {
      res.status(400);
      throw new Error("One or more products are invalid or unavailable");
    }

    const productMap = products.reduce((acc, product) => {
      acc[product.id] = product;
      return acc;
    }, {});

    const orderItems = items.map((item) => {
      const product = productMap[Number(item.productId)];
      const quantity = Math.max(1, Number(item.quantity || 1));

      if (quantity > Number(product.stock)) {
        const error = new Error(`Only ${product.stock} units available for ${product.name}`);
        error.statusCode = 400;
        throw error;
      }

      return {
        productId: product.id,
        name: product.name,
        quantity,
        unitPrice: Number(product.price),
        imageUrl: product.imageUrl
      };
    });

    const subtotal = orderItems.reduce(
      (total, item) => total + Number(item.unitPrice) * Number(item.quantity),
      0
    );

    const discountAmount = orderItems.reduce((total, item) => {
      const product = productMap[item.productId];
      const basePrice = Number(product.basePrice || product.price);
      const currentPrice = Number(product.price);
      return total + (basePrice - currentPrice) * Number(item.quantity);
    }, 0);

    const order = await Order.create({
      userId: req.user.id,
      orderNumber: createOrderNumber(),
      customerName: req.user.name,
      customerEmail: req.user.email,
      phone,
      address,
      city,
      status: "pending",
      paymentMethod,
      subtotal,
      discountAmount,
      total: subtotal,
      items: orderItems,
      notes: notes || null
    });

    res.status(201).json(normalizeOrder(order));
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode);
    }
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const where = {};

    if (req.query.status) {
      where.status = req.query.status;
    }

    const orders = await Order.findAll({
      where,
      order: [["createdAt", "DESC"]]
    });

    res.json(orders.map(normalizeOrder));
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    res.json(normalizeOrder(order));
  } catch (error) {
    next(error);
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const where = {
      userId: req.user.id
    };

    if (req.query.status) {
      where.status = req.query.status;
    }

    const orders = await Order.findAll({
      where,
      order: [["createdAt", "DESC"]]
    });

    res.json(orders.map(normalizeOrder));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrders,
  getOrderById
};
