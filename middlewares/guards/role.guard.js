const { sendErrorResponse } = require("../../helpers/send.error.response");

const roleGuard = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      console.log(req.user);
      
      return sendErrorResponse({ message: "Sizga ruxsat yo'q" }, res, 403);
    }
    next();
  };
};

module.exports = roleGuard;
