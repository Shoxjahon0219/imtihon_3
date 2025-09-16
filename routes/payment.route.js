const { Router } = require("express");
const {
  GetOnePayment,
  CreatePayment,
  GetAllPayment,
  UpdatePayment,
  DeletePayment,
} = require("../controllers/payment.controller");
const { CheckValid } = require("../middlewares/check.valid");
const { paymentValidator } = require("../validators/payment");
const roleGuard = require("../middlewares/guards/role.guard");

const router = Router();

router.post(
  "/",
  roleGuard(["Superadmin", "Admin"]),
  CheckValid(paymentValidator),
  CreatePayment
);
router.get("/", roleGuard(["Superadmin", "Admin"]), GetAllPayment);
router.get("/:id", roleGuard(["Superadmin", "Admin", "Student"]), GetOnePayment);
router.patch(
  "/:id",
  roleGuard(["Superadmin", "Admin"]),
  CheckValid(paymentValidator),
  UpdatePayment
);
router.delete("/:id", roleGuard(["Superadmin", "Admin"]), DeletePayment);

module.exports = router;
