const { Router } = require("express");
const {
  GetOneLanguage,
  CreateLanguage,
  GetAllLanguage,
  UpdateLanguage,
  DeleteLanguage,
} = require("../controllers/language.controller");
const { CheckValid } = require("../middlewares/check.valid");
const { languageValidator } = require("../validators/language");
const roleGuard = require("../middlewares/guards/role.guard");

const router = Router();

router.post(
  "/",
  roleGuard(["Superadmin"]),
  CheckValid(languageValidator),
  CreateLanguage
);
router.get(
  "/",
  roleGuard(["Superadmin", "Admin", "Teacher", "Student"]),
  GetAllLanguage
);
router.get("/:id", roleGuard(["Superadmin"]), GetOneLanguage);
router.patch(
  "/:id",
  roleGuard(["Superadmin"]),
  CheckValid(languageValidator),
  UpdateLanguage
);
router.delete("/:id", roleGuard(["Superadmin"]), DeleteLanguage);

module.exports = router;
