const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Language = require("./language");

const Teacher = sequelize.define(
  "teacher",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    full_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(15),
    },
    password: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    is_head_mentor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    language_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.STRING(255),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Language.hasMany(Teacher, { foreignKey: "language_id" });
Teacher.belongsTo(Language, { foreignKey: "language_id" });

module.exports = Teacher;
