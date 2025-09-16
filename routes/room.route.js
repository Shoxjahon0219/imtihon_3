const { Router } = require("express");
const {
  GetOneRoom,
  CreateRoom,
  GetAllRoom,
  UpdateRoom,
  DeleteRoom,
} = require("../controllers/room.controller");
const { CheckValid } = require("../middlewares/check.valid");
const { roomValidator } = require("../validators/room");
const roleGuard = require("../middlewares/guards/role.guard");

const router = Router();

router.post(
  "/",
  roleGuard(["Superadmin"]),
  CheckValid(roomValidator),
  CreateRoom
);
router.get(
  "/",
  roleGuard(["Superadmin", "Admin", "Teacher", "Student"]),
  GetAllRoom
);
router.get("/:id", roleGuard(["Superadmin"]), GetOneRoom);
router.patch(
  "/:id",
  roleGuard(["Superadmin"]),
  CheckValid(roomValidator),
  UpdateRoom
);
router.delete("/:id", roleGuard(["Superadmin"]), DeleteRoom);

module.exports = router;
