const { Router } = require("express");
const {
  GetOneStudent,
  CreateStudent,
  GetAllStudent,
  UpdateStudent,
  DeleteStudent,
} = require("../controllers/student.controller");

const router = Router();

router.post("/", CreateStudent);
router.get("/", GetAllStudent);
router.get("/:id", GetOneStudent);
router.patch("/:id", UpdateStudent);
router.delete("/:id", DeleteStudent);

module.exports = router;
