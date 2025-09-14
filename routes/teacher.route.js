const { Router } = require("express");
const {
  GetOneTeacher,
  CreateTeacher,
  GetAllTeacher,
  UpdateTeacher,
  DeleteTeacher,
} = require("../controllers/teacher.controller");

const router = Router();

router.post("/", CreateTeacher);
router.get("/", GetAllTeacher);
router.get("/:id", GetOneTeacher);
router.patch("/:id", UpdateTeacher);
router.delete("/:id", DeleteTeacher);

module.exports = router;
