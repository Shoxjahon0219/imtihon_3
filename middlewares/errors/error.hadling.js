const ApiError = require("../../helpers/class");
const logger = require("../../services/logger.service");

module.exports = function (err, req, res) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }

  if (err.status == 400) {
    return res.status(400).json({ message: "Noto'g'ri so'rov" });
  }

  return res.status(500).json({ message: "Nazarda tutilmagan xatolik" });
};
