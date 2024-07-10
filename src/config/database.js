const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("simple-webapp", "admin", "admin", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
