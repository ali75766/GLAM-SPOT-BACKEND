const { User } = require("../models");
const { signToken } = require("../utils/token");

const buildAuthPayload = (user) => ({
  token: signToken({
    id: user.id,
    role: user.role,
    email: user.email
  }),
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  }
});

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Name, email and password are required");
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      res.status(409);
      throw new Error("An account with this email already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "customer"
    });

    res.status(201).json(buildAuthPayload(user));
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password are required");
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.comparePassword(password))) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    res.json(buildAuthPayload(user));
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res) => {
  res.json({
    user: req.user
  });
};

module.exports = {
  register,
  login,
  getMe
};
