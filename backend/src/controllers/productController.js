const { Op } = require("sequelize");
const { Product, Category } = require("../models");
const { buildPricingFields, clampDiscount } = require("../utils/productPricing");

const getProducts = async (req, res, next) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 8);
    const offset = (page - 1) * limit;
    const {
      category,
      search,
      featured,
      includeInactive,
      minPrice,
      maxPrice,
      sort = "latest"
    } = req.query;

    const where = includeInactive === "true" ? {} : { active: true };

    if (category) {
      where.categoryId = Number(category);
    }

    if (featured === "true") {
      where.featured = true;
    }

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (minPrice || maxPrice) {
      where.price = {};

      if (minPrice) {
        where.price[Op.gte] = Number(minPrice);
      }

      if (maxPrice) {
        where.price[Op.lte] = Number(maxPrice);
      }
    }

    const orderMap = {
      latest: [["createdAt", "DESC"]],
      priceAsc: [["price", "ASC"]],
      priceDesc: [["price", "DESC"]],
      nameAsc: [["name", "ASC"]]
    };

    const { rows, count } = await Product.findAndCountAll({
      where,
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name", "slug"]
        }
      ],
      order: orderMap[sort] || orderMap.latest,
      limit,
      offset
    });

    res.json({
      items: rows,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const where = Number.isNaN(Number(req.params.id))
      ? { slug: req.params.id }
      : { id: Number(req.params.id) };

    const product = await Product.findOne({
      where,
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name", "slug"]
        }
      ]
    });

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const pricingFields = buildPricingFields(req.body);
    const product = await Product.create({
      ...req.body,
      ...pricingFields
    });
    const created = await Product.findByPk(product.id, {
      include: [{ model: Category, as: "category", attributes: ["id", "name", "slug"] }]
    });
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    const pricingFields = buildPricingFields(req.body, product);

    await product.update({
      ...req.body,
      ...pricingFields
    });
    const updated = await Product.findByPk(product.id, {
      include: [{ model: Category, as: "category", attributes: ["id", "name", "slug"] }]
    });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    await product.destroy();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const applyProductDiscount = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category, as: "category", attributes: ["id", "name", "slug"] }]
    });

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    const discountPercentage = clampDiscount(req.body.discountPercentage);
    const pricingFields = buildPricingFields(
      {
        basePrice: product.basePrice,
        discountPercentage
      },
      product
    );

    await product.update(pricingFields);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const applyDiscountToAllProducts = async (req, res, next) => {
  try {
    const discountPercentage = clampDiscount(req.body.discountPercentage);
    const products = await Product.findAll();

    await Promise.all(
      products.map((product) => {
        const pricingFields = buildPricingFields(
          {
            basePrice: product.basePrice,
            discountPercentage
          },
          product
        );

        return product.update(pricingFields);
      })
    );

    res.json({
      message: `Discount applied to ${products.length} products`,
      discountPercentage
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  applyProductDiscount,
  applyDiscountToAllProducts
};
