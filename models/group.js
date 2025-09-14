const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Room = require("./room");
const Course = require("./course");
const Teacher = require("./teacher");

const Group = sequelize.define(
  "group",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    level: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    count_students: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    stop_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    updatedAt: false,
  }
);

Room.hasMany(Group, { foreignKey: "room_id" });
Group.belongsTo(Room, { foreignKey: "room_id" });

Course.hasMany(Group, { foreignKey: "course_id" });
Group.belongsTo(Course, { foreignKey: "course_id" });

Teacher.hasMany(Group, { foreignKey: "teacher_id" });
Group.belongsTo(Teacher, { foreignKey: "teacher_id" });

module.exports = Group;
