const { Umzug, SequelizeStorage } = require("umzug");
const sequelize = require("../config/database");

const umzug = new Umzug({
  migrations: { glob: "src/migrations/*.js" },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

// Выполнение миграций в зависимости от переданной команды
const runMigrations = async (command) => {
  try {
    if (command === "up") {
      await umzug.up();
      console.log("Migrations executed successfully");
    } else if (command === "down") {
      await umzug.down();
      console.log("Migrations rolled back successfully");
    } else {
      console.log("Invalid command. Use 'up' or 'down'.");
    }
  } catch (error) {
    console.error("Error executing migrations", error);
  }
};

module.exports = { runMigrations };
