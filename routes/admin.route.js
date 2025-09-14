const { Router } = require("express");
const {
  GetOneAdmin,
  CreateAdmin,
  GetAllAdmin,
  UpdateAdmin,
  DeleteAdmin,
} = require("../controllers/admin.controller");

const router = Router();

router.post("/", CreateAdmin);
router.get("/", GetAllAdmin);
router.get("/:id", GetOneAdmin);
router.patch("/:id", UpdateAdmin);
router.delete("/:id", DeleteAdmin);

module.exports = router;
