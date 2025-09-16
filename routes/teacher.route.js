const { Router } = require("express");
const {
  GetOneTeacher,
  CreateTeacher,
  GetAllTeacher,
  UpdateTeacher,
  DeleteTeacher,
} = require("../controllers/teacher.controller");
const { CheckValid } = require("../middlewares/check.valid");
const { teacherValidator } = require("../validators/teacher");
const {
  login,
  logout,
  refreshToken,
} = require("../controllers/authTeacher.controller");
const roleGuard = require("../middlewares/guards/role.guard");
const selfGuard = require("../middlewares/guards/self.guard");
const authGuard = require("../middlewares/guards/auth.guard");

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refreshToken);

router.use(authGuard);

router.post(
  "/",
  roleGuard(["Superadmin", "Admin"]),
  CheckValid(teacherValidator),
  CreateTeacher
);
router.get("/", roleGuard(["Superadmin", "Admin"]), GetAllTeacher);
router.get(
  "/:id",
  roleGuard(["Superadmin", "Admin", "Teacher"]),
  selfGuard,
  GetOneTeacher
);
router.patch(
  "/:id",
  roleGuard(["Superadmin", "Admin", "Teacher"]),
  selfGuard,
  CheckValid(teacherValidator),
  UpdateTeacher
);
router.delete(
  "/:id",
  roleGuard(["Superadmin", "Admin", "Teacher"]),
  selfGuard,
  DeleteTeacher
);

module.exports = router;
