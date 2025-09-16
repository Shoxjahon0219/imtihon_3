const { Router } = require("express");
const {
  GetOneStudent,
  CreateStudent,
  GetAllStudent,
  UpdateStudent,
  DeleteStudent,
} = require("../controllers/student.controller");
const { CheckValid } = require("../middlewares/check.valid");
const { studentValidator } = require("../validators/student");
const {
  sendOtpStudent,
  verifyOtpStudent,
} = require("../controllers/otp.controller");

const {
  login,
  logout,
  refreshToken,
} = require("../controllers/authStudent.controller");
const { signup } = require("../controllers/authStudent.controller");
const authGuard = require("../middlewares/guards/auth.guard");
const roleGuard = require("../middlewares/guards/role.guard");
const selfGuard = require("../middlewares/guards/self.guard");

const router = Router();

router.post("/signup", CheckValid(studentValidator), signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refreshToken);

router.use(authGuard);

router.post(
  "/",
  roleGuard(["SuperAdmin", "Admin"]),
  CheckValid(studentValidator),
  CreateStudent
);
router.get("/", roleGuard(["SuperAdmin", "Admin", "Teacher"]), GetAllStudent);
router.get(
  "/:id",
  roleGuard(["SuperAdmin", "Admin", "Teacher", "Student"]),
  selfGuard,
  GetOneStudent
);
router.patch(
  "/:id",
  roleGuard(["SuperAdmin", "Admin", "Student"]),
  selfGuard,
  CheckValid(studentValidator),
  UpdateStudent
);
router.delete(
  "/:id",
  roleGuard(["SuperAdmin", "Admin", "Student"]),
  selfGuard,
  DeleteStudent
);

router.post("/send-otp", roleGuard(["Student"]), sendOtpStudent);
router.post("/verify-otp", roleGuard(["Student"]), verifyOtpStudent);

module.exports = router;
