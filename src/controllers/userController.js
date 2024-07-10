const express = require("express");
const router = express.Router();
const {
  increaseUserBalance,
  decreaseUserBalance,
} = require("../services/userService");
const User = require("../models/user");
const handleBalanceChange = require("../middlewares/balanceHandler");

// Увеличение баланса пользователя
router.put("/balanceIncrease", handleBalanceChange(increaseUserBalance));

// Уменьшение баланса пользователя
router.put("/balanceDecrease", handleBalanceChange(decreaseUserBalance));

// Получение информации о пользователе
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
