const userModel = require("../models/userModel");

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;
  if (!firstName || !lastName || !email || !password || !phoneNumber) {
    return res
      .status(400)
      .json({ statusCode: 400, message: "all fields are required" });
  }
  try {
    const newUser = await userModel.create({ ...req.body });
    console.log(newUser);
    return res
      .status(201)
      .json({
        statusCode: 201,
        message: "user created successfully",
        data: newUser,
      });
  } catch (error) {
    console.log("internal server error- registerUser", error);
    return res
      .status(500)
      .json({ statusCode: 500, message: "Internal Server Error" });
  }
};

module.exports = { registerUser };
