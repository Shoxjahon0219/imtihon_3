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

const router = Router();

router.use("/admin", AdminRouter);
router.use("/room", RoomRouter);
router.use("/language", LanguageRouter);
router.use("/payment", PaymentRouter);
router.use("/status", StatusRouter);
router.use("/student", StudentRouter);
router.use("/course", CourseRouter);
router.use("/teacher", TeacherRouter);
router.use("/group", GroupRouter);
router.use("/contract", ContractRouter);

module.exports = router;
