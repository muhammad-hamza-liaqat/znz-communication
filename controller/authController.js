const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;
  if (!firstName || !lastName || !email || !password || !phoneNumber) {
    return res
      .status(400)
      .json({ statusCode: 400, message: "all fields are required" });
  }
  try {
    // hashing the password through bcrypt npm module.
    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = await userModel.create({ ...req.body, password: hashedPassword });
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
      .json({ statusCode: 500, message: "Internal Server Error", error: error });
  }
};

module.exports = { registerUser };
