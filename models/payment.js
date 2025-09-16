const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Contract = require("./contract");

const Payment = sequelize.define(
  "payment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    contract_id: {
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

Contract.hasMany(Payment, { foreignKey: "contract_id" });
Payment.belongsTo(Contract, { foreignKey: "contract_id" });

module.exports = Payment;
