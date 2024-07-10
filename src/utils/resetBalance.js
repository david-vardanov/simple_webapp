const sequelize = require("../config/database");
const User = require("../models/user");

const resetBalance = async () => {
  await sequelize.sync();
  const user = await User.findByPk(1);
  if (user) {
    user.balance = 10000;
    await user.save();
    console.log("Balance reset to 10000!");
  } else {
    console.log("User not found!");
  }
};

resetBalance().catch((err) => {
  console.error("Error resetting balance:", err);
});
