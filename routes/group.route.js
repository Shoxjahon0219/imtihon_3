const { Router } = require("express");
const {
  GetOneGroup,
  CreateGroup,
  GetAllGroup,
  UpdateGroup,
  DeleteGroup,
} = require("../controllers/group.controller");

const router = Router();

router.post("/", CreateGroup);
router.get("/", GetAllGroup);
router.get("/:id", GetOneGroup);
router.patch("/:id", UpdateGroup);
router.delete("/:id", DeleteGroup);

module.exports = router;
