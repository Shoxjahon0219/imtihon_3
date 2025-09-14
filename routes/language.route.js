const { Router } = require("express");
const {
  GetOneLanguage,
  CreateLanguage,
  GetAllLanguage,
  UpdateLanguage,
  DeleteLanguage,
} = require("../controllers/language.controller");

const router = Router();

router.post("/", CreateLanguage);
router.get("/", GetAllLanguage);
router.get("/:id", GetOneLanguage);
router.patch("/:id", UpdateLanguage);
router.delete("/:id", DeleteLanguage);

module.exports = router;
