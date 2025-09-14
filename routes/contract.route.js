const { Router } = require("express");
const {
  GetOneContract,
  CreateContract,
  GetAllContract,
  UpdateContract,
  DeleteContract,
} = require("../controllers/contract.controller");

const router = Router();

router.post("/", CreateContract);
router.get("/", GetAllContract);
router.get("/:id", GetOneContract);
router.patch("/:id", UpdateContract);
router.delete("/:id", DeleteContract);

module.exports = router;
