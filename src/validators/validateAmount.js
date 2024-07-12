// src/validators/validateAmount.js

const validateAmount = (req, res, next) => {
  const { amount } = req.query;
  if (typeof parseInt(amount) !== "number" || isNaN(amount)) {
    return res.status(400).json({ error: "Invalid amount" });
  }
  next();
};

const validateUserId = (req, res, next) => {
  const userId = req.query.userId || req.params.userId;
  if (!userId || isNaN(userId)) {
    return res.status(400).json({ error: "Invalid userId" });
  }
  next();
};

module.exports = { validateAmount, validateUserId };
