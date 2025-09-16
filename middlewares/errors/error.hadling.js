const ApiError = require("../../helpers/class");
const logger = require("../../services/logger.service");

module.exports = function (err, req, res, next) {
  logger.error(err);

  if (err.name == "SyntaxError") {
    return res.status(400).send({
      message: "Noto'g'ri JSON format",
    });
  }

  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).json({ message: "Nazarda tutilmagan xatolik" });
};
