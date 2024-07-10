// src/controllers/userController.js

const express = require("express");
const router = express.Router();
const {
  increaseUserBalance,
  decreaseUserBalance,
} = require("../services/userService");
const User = require("../models/user");

router.put("/balanceIncrease", async (req, res) => {
  const { userId, amount } = req.query;

  if (!userId || !amount) {
    return res.status(400).json({ error: "Missing userId or amount" });
  }

  try {
    const user = await increaseUserBalance(userId, parseInt(amount));
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/balanceDecrease", async (req, res) => {
  const { userId, amount } = req.query;

  if (!userId || !amount) {
    return res.status(400).json({ error: "Missing userId or amount" });
  }

  try {
    const user = await decreaseUserBalance(userId, parseInt(amount));
    res.json(user);
  } catch (error) {
    if (error.message === "Insufficient funds") {
      res.status(400).json({ error: "Insufficient funds" });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

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
