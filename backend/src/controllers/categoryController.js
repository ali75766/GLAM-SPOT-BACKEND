const { Category, Product } = require("../models");

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Product,
          as: "products",
          attributes: ["id"]
        }
      ],
      order: [["name", "ASC"]]
    });

    res.json(
      categories.map((category) => ({
        ...category.toJSON(),
        productCount: category.products.length
      }))
    );
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          as: "products",
          where: { active: true },
          required: false
        }
      ]
    });

    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }

    res.json(category);
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }

    await category.update(req.body);
    res.json(category);
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      res.status(404);
      throw new Error("Category not found");
    }

    await category.destroy();
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
