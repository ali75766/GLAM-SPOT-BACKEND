const sequelize = require("../config/database");
const User = require("./user");
const Category = require("./category");
const Product = require("./product");
const Order = require("./order");
const Booking = require("./booking");

Category.hasMany(Product, {
  foreignKey: "categoryId",
  as: "products",
  onDelete: "CASCADE"
});

Product.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category"
});

User.hasMany(Order, {
  foreignKey: "userId",
  as: "orders"
});

Order.belongsTo(User, {
  foreignKey: "userId",
  as: "user"
});

Category.hasMany(Booking, {
  foreignKey: "serviceCategoryId",
  as: "bookings",
  onDelete: "SET NULL"
});

Booking.belongsTo(Category, {
  foreignKey: "serviceCategoryId",
  as: "serviceCategory"
});

module.exports = {
  sequelize,
  User,
  Category,
  Product,
  Order,
  Booking
};
