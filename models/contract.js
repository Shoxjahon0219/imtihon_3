const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Group = require("./group");
const Student = require("./student");
const Status = require("./status");

const Contract = sequelize.define(
  "contract",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status_id: {
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

Group.hasMany(Contract, { foreignKey: "group_id" });
Contract.belongsTo(Group, { foreignKey: "group_id" });

Student.hasMany(Contract, { foreignKey: "student_id" });
Contract.belongsTo(Student, { foreignKey: "student_id" });

Status.hasMany(Contract, { foreignKey: "status_id" });
Contract.belongsTo(Status, { foreignKey: "status_id" });

module.exports = Contract;
