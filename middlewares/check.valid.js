const CheckValid = (validator) => {
  return (req, res, next) => {
    const { error } = validator.validate(req.body);
    if (error) {
      return res.status(400).send({
        message: error.details[0].message,
      });
    }
    next();
  };
};

module.exports = { CheckValid };
