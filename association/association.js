const userModel = require("../models/userModel");
const userDetailsModel = require("../models/userAdditionalInformation");

// Define association between users and userDetails
userModel.hasOne(userDetailsModel, {
  foreignKey: "email",
  onDelete: "CASCADE",
});

module.exports = {
  userModel,
  userDetailsModel,
};
