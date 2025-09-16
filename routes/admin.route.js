const { Router } = require("express");
const {
  GetOneAdmin,
  CreateAdmin,
  GetAllAdmin,
  UpdateAdmin,
  DeleteAdmin,
} = require("../controllers/admin.controller");
const { CheckValid } = require("../middlewares/check.valid");
const { adminValidator } = require("../validators/admin");
const {
  sendOtpAdmin,
  verifyOtpAdmin,
} = require("../controllers/otp.controller");
const {
  login,
  logout,
  refreshToken,
  signup,
} = require("../controllers/authAdmin.controller");
const authGuard = require("../middlewares/guards/auth.guard");
const roleGuard = require("../middlewares/guards/role.guard");
const selfGuard = require("../middlewares/guards/self.guard");

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refreshToken);

router.use(authGuard)

router.post("/", roleGuard(["Superadmin"]), CheckValid(adminValidator), CreateAdmin);
router.get("/", roleGuard(["Superadmin"]), GetAllAdmin);
router.get("/:id", roleGuard(["Superadmin"]), selfGuard, GetOneAdmin);
router.patch("/:id", roleGuard(["Superadmin"]), selfGuard, CheckValid(adminValidator), UpdateAdmin);
router.delete("/:id",roleGuard(["Superadmin"]), DeleteAdmin);

router.post("/send-otp", sendOtpAdmin);
router.post("/verify-otp", verifyOtpAdmin);
 

module.exports = router;
