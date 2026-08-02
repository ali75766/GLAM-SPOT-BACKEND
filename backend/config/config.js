require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

const shared = {
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  seederStorage: "sequelize",
  migrationStorage: "sequelize"
};

module.exports = {
  development: {
    ...shared
  },
  test: {
    ...shared
  },
  production: {
    ...shared
  }
};
