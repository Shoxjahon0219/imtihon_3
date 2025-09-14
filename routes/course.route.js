const { Router } = require("express");
const {
  GetOneCourse,
  CreateCourse,
  GetAllCourse,
  UpdateCourse,
  DeleteCourse,
} = require("../controllers/course.controller");

const router = Router();

router.post("/", CreateCourse);
router.get("/", GetAllCourse);
router.get("/:id", GetOneCourse);
router.patch("/:id", UpdateCourse);
router.delete("/:id", DeleteCourse);

module.exports = router;
