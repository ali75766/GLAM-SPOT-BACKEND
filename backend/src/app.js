const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const routes = require("./routes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
const configuredOrigins = [
  process.env.CLIENT_URL,
  ...(process.env.CLIENT_URLS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
];

const isAllowedLocalOrigin = (origin) =>
  /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (configuredOrigins.includes(origin) || isAllowedLocalOrigin(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true
  })
);
app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));
app.use("/uploads", express.static(path.resolve(__dirname, "./uploads")));

app.get("/", (req, res) => {
  res.json({
    app: "Glam Nail Studio API",
    docs: {
      health: "/api/health",
      categories: "/api/categories",
      products: "/api/products",
      adminLogin: "/api/auth/login"
    }
  });
});

app.use("/api", routes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
