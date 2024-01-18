const userModel = require("../models/userModel");
const userDetailsModel = require("../models/userAdditionalInformation");

console.log("association called")
// Define association between users and userDetails
userDetailsModel.belongsTo(userModel, {
  foreignKey: "email",
  onDelete: "CASCADE",
});

userModel.hasOne(userDetailsModel, {
  foreignKey: "email",
  onDelete: "CASCADE",
});

