const express = require("express");
const router = express.Router();
const {
  increaseUserBalance,
  decreaseUserBalance,
} = require("../services/userService");
const User = require("../models/user");
const handleBalanceChange = require("../middlewares/balanceHandler");
const {
  validateAmount,
  validateUserId,
} = require("../validators/validateAmount");

// Увеличение баланса пользователя
router.put(
  "/balanceIncrease",
  validateUserId,
  validateAmount,
  handleBalanceChange(increaseUserBalance)
);

// Уменьшение баланса пользователя
router.put(
  "/balanceDecrease",
  validateUserId,
  validateAmount,
  handleBalanceChange(decreaseUserBalance)
);

// Получение информации о пользователе
router.get("/:userId", validateUserId, async (req, res) => {
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
