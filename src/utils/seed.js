const sequelize = require("../config/database");
const User = require("../models/user");

const seedDatabase = async () => {
  await sequelize.sync({ force: true }); // Это удалит все данные и пересоздаст таблицы
  await User.create({ balance: 10000 });
  console.log("Database seeded!");
};

seedDatabase().catch((err) => {
  console.error("Error seeding database:", err);
});
