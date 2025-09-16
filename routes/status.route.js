const { Router } = require("express");
const {
  GetOneStatus,
  CreateStatus,
  GetAllStatus,
  UpdateStatus,
  DeleteStatus,
} = require("../controllers/status.controller");
const { CheckValid } = require("../middlewares/check.valid");
const { statusValidator } = require("../validators/status");
const roleGuard = require("../middlewares/guards/role.guard");

const router = Router();

router.post(
  "/",
  roleGuard(["Superadmin"]),
  CheckValid(statusValidator),
  CreateStatus
);
router.get(
  "/",
  roleGuard(["Superadmin", "Admin", "Teacher", "Student"]),
  GetAllStatus
);
router.get("/:id", roleGuard(["Superadmin"]), GetOneStatus);
router.patch(
  "/:id",
  roleGuard(["Superadmin"]),
  CheckValid(statusValidator),
  UpdateStatus
);
router.delete("/:id", roleGuard(["Superadmin"]), DeleteStatus);

module.exports = router;
