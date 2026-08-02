const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Booking extends Model {}

Booking.init(
  {
    customerName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customerEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    preferredDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    serviceCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Categories",
        key: "id"
      }
    },
    serviceName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "cancelled", "completed"),
      allowNull: false,
      defaultValue: "pending"
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: "Booking",
    tableName: "Bookings"
  }
);

module.exports = Booking;
