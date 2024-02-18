const validateName = async (req, res, next) => {
  const product = req.body;
  const expectedKeys = ['name'];
  const check = Object.keys(product).some((key) => key.includes(expectedKeys));
  if (check) {
    next();
  } else {
    return res.status(400).json({ message: '"name" is required' });
  }
};

module.exports = {
  validateName,
};