// src/middlewares/balanceHandler.js

const handleBalanceChange = (action) => {
  return async (req, res) => {
    const { userId, amount } = req.query;
    if (!userId || !amount) {
      return res.status(400).json({ error: "Missing userId or amount" });
    }

    try {
      const user = await action(userId, parseInt(amount));
      res.json(user);
    } catch (error) {
      const errorMessage =
        error.message === "Insufficient funds"
          ? "Insufficient funds"
          : error.message;
      res.status(400).json({ error: errorMessage });
    }
  };
};

module.exports = handleBalanceChange;
