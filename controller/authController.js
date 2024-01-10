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
    const hashedPassword = await bcrypt.hash(password, 10);
    // storing the hash password
    const newUser = await userModel.create({
      ...req.body,
      password: hashedPassword,
    });
    console.log(newUser);
    return res.status(201).json({
      statusCode: 201,
      message: "user created successfully",
      data: newUser,
    });
  } catch (error) {
    console.log("internal server error- registerUser", error);
    return res
      .status(500)
      .json({
        statusCode: 500,
        message: "Internal Server Error",
        error: error,
      });
  }
};

const loginUser = async (req, res) => {
  // res.end("hello from login user")
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({
        statusCode: 400,
        message: "all fields required",
        error: "email and password required",
      });
  }
  try {
    const userToFind = await userModel.findOne({
      where: {
        email: email,
      },
    });
    if (!userToFind) {
      return res
        .status(400)
        .json({
          statusCode: 400,
          message: "invalid email or password",
          error: "invalid email or password",
        });
    }
    const validatePassword = await bcrypt.compare(
      password,
      userToFind.password
    );
    if (!validatePassword) {
      return res
        .status(400)
        .json({
          statusCode: 400,
          message: "invalid email or password",
          error: "invalid email or password",
        });
    }
    console.log("user login");
    return res
      .status(201)
      .json({ statusCode: 201, message: "user successfully login" });
  } catch (error) {
    console.log("error:", error);
    return res
      .status(500)
      .json({
        statusCode: 500,
        message: "internal server error",
        error: error,
      });
  }
};

module.exports = { registerUser, loginUser };
