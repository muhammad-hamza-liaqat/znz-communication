const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");


const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
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
      checked: null,
    });
    console.log(newUser);
    return res.status(201).json({
      statusCode: 201,
      message: "user created successfully",
      data: newUser,
    });
  } catch (error) {
    console.log("internal server error- registerUser", error);
    return res.status(500).json({
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
    return res.status(400).json({
      statusCode: 400,
      message: "all fields required",
      error: "email and password required",
    });
  }
  try {
    // finding the user exists or not
    const userToFind = await userModel.findOne({
      where: {
        email: email,
      },
    });
    // if user doesnot exist
    if (!userToFind) {
      return res.status(400).json({
        statusCode: 400,
        message: "invalid email or password",
        error: "invalid email or password",
      });
    }
    // comparing the hashed password with the user's password in the req.body
    const validatePassword = await bcrypt.compare(
      password,
      userToFind.password
    );
    // if error in the password
    if (!validatePassword) {
      return res.status(400).json({
        statusCode: 400,
        message: "invalid email or password",
        error: "invalid email or password",
      });
    }

    const jwtToken = jwt.sign(
      {
        userID: userToFind.userID,
        firstName: userToFind.firstName,
        lastName: userToFind.lastName,
        email: userToFind.email,
      },
      process.env.Secret_KEY,
      { expiresIn: process.env.expiry_time }
    );
    // console.log("userData", userToFind);
    console.log("user JWT:", jwtToken);
    // final response
    return res
      .status(201)
      .json({
        statusCode: 201,
        message: "user successfully login",
        token: jwtToken,
      });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({
      statusCode: 500,
      message: "internal server error",
      error: error,
    });
  }
};

const googleLoginPage = (req, res) => {
  res.render("googlePage");
};

const authGoogle = passport.authenticate("google", { scope: ["profile", "email"] });


const googleCallback = (req, res) => {
  passport.authenticate('google', (err, user) => {
    if (err) {
      return res.status(400).json({message: "Error while login", error: err});
    }

    if (!user) {
      // Authentication failed, redirect to the login page or handle accordingly
      return res.status(400).json({message: "authentication failed"});
    }

    // Authentication successful, redirect to the profile page or any other route
    return res.status(201).json({message: "user login successfully!"});
  })(req, res);
};


module.exports = { registerUser, loginUser, googleLoginPage, authGoogle, googleCallback };
