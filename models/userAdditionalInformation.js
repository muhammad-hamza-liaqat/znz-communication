const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const userDetailsModel = sequelize.define(
  "userDetails",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "users",
        key: "email",
      },
      onDelete: "CASCADE",
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "userDetails",
    timestamps: true,
  }
);

sequelize
  .sync()
  .then(() => {
    console.log("userDetailsModel synchronized with the database(znz).");
  })
  .catch((error) => {
    console.error("Error synchronizing userDetailsModel", error);
  });

module.exports = userDetailsModel;
