const { Router } = require("express");
const {
  GetOneContract,
  CreateContract,
  GetAllContract,
  UpdateContract,
  DeleteContract,
} = require("../controllers/contract.controller");
const { CheckValid } = require("../middlewares/check.valid");
const { contractValidator } = require("../validators/contract");
const roleGuard = require("../middlewares/guards/role.guard");

const router = Router();

router.post(
  "/",
  roleGuard(["Superadmin", "Admin"]),
  CheckValid(contractValidator),
  CreateContract
);
router.get("/", roleGuard(["Superadmin", "Admin"]), GetAllContract);
router.get("/:id", roleGuard(["Superadmin", "Admin"]), GetOneContract);
router.patch(
  "/:id",
  roleGuard(["Superadmin", "Admin"]),
  CheckValid(contractValidator),
  UpdateContract
);
router.delete("/:id", roleGuard(["Superadmin", "Admin"]), DeleteContract);

module.exports = router;
