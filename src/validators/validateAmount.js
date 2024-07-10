// src/validators/validateAmount.js

const validateAmount = (req, res, next) => {
  const { amount } = req.body;
  if (typeof amount !== "number") {
    return res.status(400).json({ error: "Invalid amount" });
  }
  next();
};

module.exports = validateAmount;
