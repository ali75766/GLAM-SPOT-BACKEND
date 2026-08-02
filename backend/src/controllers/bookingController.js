const { Booking, Category } = require("../models");

const includeServiceCategory = {
  model: Category,
  as: "serviceCategory",
  attributes: ["id", "name", "slug", "imageUrl"]
};

const createBooking = async (req, res, next) => {
  try {
    const {
      customerName,
      customerEmail,
      phone,
      preferredDate,
      serviceCategoryId,
      notes
    } = req.body;

    if (!customerName || !customerEmail || !phone || !preferredDate || !serviceCategoryId) {
      res.status(400);
      throw new Error("Name, email, phone, preferred date and service are required");
    }

    const category = await Category.findByPk(serviceCategoryId);

    if (!category) {
      res.status(400);
      throw new Error("Selected nail service category is invalid");
    }

    const booking = await Booking.create({
      customerName,
      customerEmail,
      phone,
      preferredDate,
      serviceCategoryId: category.id,
      serviceName: category.name,
      notes: notes || null
    });

    const createdBooking = await Booking.findByPk(booking.id, {
      include: [includeServiceCategory]
    });

    res.status(201).json(createdBooking);
  } catch (error) {
    next(error);
  }
};

const getBookings = async (req, res, next) => {
  try {
    const where = {};

    if (req.query.status) {
      where.status = req.query.status;
    }

    const bookings = await Booking.findAll({
      where,
      include: [includeServiceCategory],
      order: [["createdAt", "DESC"]]
    });

    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findByPk(req.params.id, {
      include: [includeServiceCategory]
    });

    if (!booking) {
      res.status(404);
      throw new Error("Booking not found");
    }

    res.json(booking);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getBookingById,
  getBookings
};
