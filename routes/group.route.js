const { Router } = require("express");
const {
  GetOneGroup,
  CreateGroup,
  GetAllGroup,
  UpdateGroup,
  DeleteGroup,
} = require("../controllers/group.controller");
const { CheckValid } = require("../middlewares/check.valid");
const { groupValidator } = require("../validators/group");
const roleGuard = require("../middlewares/guards/role.guard");

const router = Router();

router.post(
  "/",
  roleGuard(["Superadmin", "Admin"]),
  CheckValid(groupValidator),
  CreateGroup
);
router.get("/", roleGuard(["Superadmin", "Admin", "Teacher"]), GetAllGroup);
router.get("/:id", roleGuard(["Superadmin", "Admin"]), GetOneGroup);
router.patch(
  "/:id",
  roleGuard(["Superadmin", "Admin"]),
  CheckValid(groupValidator),
  UpdateGroup
);
router.delete("/:id", roleGuard(["Superadmin", "Admin"]), DeleteGroup);

module.exports = router;
