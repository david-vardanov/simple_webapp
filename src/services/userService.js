const User = require("../models/user");
const sequelize = require("../config/database");

// Увеличение баланса пользователя в транзакции
const increaseUserBalance = async (userId, amount) => {
  return sequelize.transaction(async (t) => {
    const user = await User.findByPk(userId, {
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (!user) throw new Error("User not found");

    user.balance += amount;
    await user.save({ transaction: t });

    return user;
  });
};

// Уменьшение баланса пользователя в транзакции
const decreaseUserBalance = async (userId, amount) => {
  return sequelize.transaction(async (t) => {
    const user = await User.findByPk(userId, {
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (!user) throw new Error("User not found");

    const newBalance = user.balance - amount;
    if (newBalance < 0) throw new Error("Insufficient funds");

    user.balance = newBalance;
    await user.save({ transaction: t });

    return user;
  });
};

module.exports = { increaseUserBalance, decreaseUserBalance };
