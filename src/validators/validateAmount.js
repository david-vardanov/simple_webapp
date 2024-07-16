const validateAmount = (req, res, next) => {
  const amount = parseInt(req.query.amount, 10);
  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }
  next();
};

const validateUserId = (req, res, next) => {
  const userId = parseInt(req.query.userId || req.params.userId, 10);
  if (isNaN(userId) || userId <= 0) {
    return res.status(400).json({ error: "Invalid userId" });
  }
  next();
};

module.exports = { validateAmount, validateUserId };
