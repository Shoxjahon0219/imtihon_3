const { Router } = require("express");
const {
  GetOneStatus,
  CreateStatus,
  GetAllStatus,
  UpdateStatus,
  DeleteStatus,
} = require("../controllers/status.controller");

const router = Router();

router.post("/", CreateStatus);
router.get("/", GetAllStatus);
router.get("/:id", GetOneStatus);
router.patch("/:id", UpdateStatus);
router.delete("/:id", DeleteStatus);

module.exports = router;
