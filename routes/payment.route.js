const { Router } = require("express");
const {
  GetOnePayment,
  CreatePayment,
  GetAllPayment,
  UpdatePayment,
  DeletePayment,
} = require("../controllers/payment.controller");

const router = Router();

router.post("/", CreatePayment);
router.get("/", GetAllPayment);
router.get("/:id", GetOnePayment);
router.patch("/:id", UpdatePayment);
router.delete("/:id", DeletePayment);

module.exports = router;
