// database connection
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("znz", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected to znz=>");
  })
  .catch((error) => {
    console.error("something went wrong, DB not connected!");
  });

module.exports = sequelize;
