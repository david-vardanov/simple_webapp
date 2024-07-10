const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");
const { runMigrations } = require("./utils/migrator");
const userRoutes = require("./controllers/userController");
const requestLogger = require("./middlewares/requestLogger");

const app = express();
app.use(bodyParser.json());

app.use(requestLogger);

app.use("/users", userRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");
    await runMigrations("up");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
