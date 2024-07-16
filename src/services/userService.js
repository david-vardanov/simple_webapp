const User = require("../models/user");
const sequelize = require("../config/database");

// Логирование
const log = (message) => {
  console.log(`[${new Date().toISOString()}] ${message}`);
};

// Увеличение баланса пользователя
const increaseUserBalance = async (userId, amount) => {
  const result = await sequelize.query(
    `WITH updated AS (
       UPDATE "Users"
       SET balance = balance + :amount
       WHERE id = :userId
       RETURNING id, balance
     )
     SELECT * FROM updated;`,
    {
      replacements: { userId, amount },
      type: sequelize.QueryTypes.SELECT,
    }
  );

  if (result.length === 0) {
    throw new Error("User not found or balance update failed");
  }

  log(`Balance successfully increased for user ${userId}`);
  return result[0];
};

// Уменьшение баланса пользователя
const decreaseUserBalance = async (userId, amount) => {
  const result = await sequelize.query(
    `WITH updated AS (
       UPDATE "Users"
       SET balance = balance - :amount
       WHERE id = :userId AND balance >= :amount
       RETURNING id, balance
     )
     SELECT * FROM updated;`,
    {
      replacements: { userId, amount },
      type: sequelize.QueryTypes.SELECT,
    }
  );

  if (result.length === 0) {
    log(`Insufficient funds for user ${userId}`);
    throw new Error("Insufficient funds");
  }

  log(`Balance successfully decreased for user ${userId}`);
  return result[0];
};

module.exports = { increaseUserBalance, decreaseUserBalance };
