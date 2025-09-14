const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Language = require("./language");

const Course = sequelize.define(
  "course",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(70),
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    language_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Language.hasMany(Course, { foreignKey: "language_id" });
Course.belongsTo(Language, { foreignKey: "language_id" });

module.exports = Course;
