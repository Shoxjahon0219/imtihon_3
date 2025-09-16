const { Router } = require("express");
const {
  GetOneCourse,
  CreateCourse,
  GetAllCourse,
  UpdateCourse,
  DeleteCourse,
} = require("../controllers/course.controller");
const { CheckValid } = require("../middlewares/check.valid");
const { courseValidator } = require("../validators/course");
const roleGuard = require("../middlewares/guards/role.guard");

const router = Router();

router.post(
  "/",
  roleGuard(["Superadmin"]),
  CheckValid(courseValidator),
  CreateCourse
);
router.get("/", roleGuard(["Superadmin", "Admin", "Teacher", "Student"]), GetAllCourse);
router.get("/:id", roleGuard(["Superadmin"]), GetOneCourse);
router.patch(
  "/:id",
  roleGuard(["Superadmin"]),
  CheckValid(courseValidator),
  UpdateCourse
);
router.delete("/:id", roleGuard(["Superadmin"]), DeleteCourse);

module.exports = router;
