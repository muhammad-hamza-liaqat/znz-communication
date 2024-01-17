const userModel = require("../models/userModel");
const userDetailsModel = require("../models/userAdditionalInformation");

console.log("association called")
// Define association between users and userDetails
userModel.hasOne(userDetailsModel, {
  foreignKey: "email",
  onDelete: "CASCADE",
});

module.exports = {
  userModel,
  userDetailsModel,
};
