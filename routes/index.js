const { Router } = require("express");
const RoomRouter = require("./room.route");
const AdminRouter = require("./admin.route");
const LanguageRouter = require("./language.route");
const PaymentRouter = require("./payment.route");
const StatusRouter = require("./status.route");
const StudentRouter = require("./student.route");
const CourseRouter = require("./course.route");
const TeacherRouter = require("./teacher.route");
const GroupRouter = require("./group.route");
const ContractRouter = require("./contract.route");
const {
  smartQuery1,
  smartQuery2,
  smartQuery3,
  smartQuery4,
  smartQuery5,
} = require("../controllers/smartQueries.controller");

const authGuard = require("../middlewares/guards/auth.guard");
const roleGuard = require("../middlewares/guards/role.guard");

const router = Router();

router.use("/admin", AdminRouter);
router.use("/student", StudentRouter);
router.use("/teacher", TeacherRouter);

router.use(authGuard);

router.use("/room", RoomRouter);
router.use("/language", LanguageRouter);
router.use("/payment", PaymentRouter);
router.use("/status", StatusRouter);
router.use("/course", CourseRouter);
router.use("/group", GroupRouter);
router.use("/contract", ContractRouter);

// Smart queries

router.post("/smartquery1", roleGuard(["Superadmin", "Admin"]), smartQuery1);
router.post("/smartquery2", roleGuard(["Superadmin", "Admin"]), smartQuery2);
router.post("/smartquery3", roleGuard(["Superadmin", "Admin"]), smartQuery3);
router.post("/smartquery4", roleGuard(["Superadmin", "Admin"]), smartQuery4);
router.post("/smartquery5", roleGuard(["Superadmin", "Admin"]), smartQuery5);

module.exports = router;
