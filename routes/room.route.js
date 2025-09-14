const { Router } = require("express");
const {
  GetOneRoom,
  CreateRoom,
  GetAllRoom,
  UpdateRoom,
  DeleteRoom,
} = require("../controllers/room.controller");

const router = Router();

router.post("/", CreateRoom);
router.get("/", GetAllRoom);
router.get("/:id", GetOneRoom);
router.patch("/:id", UpdateRoom);
router.delete("/:id", DeleteRoom);

module.exports = router;
