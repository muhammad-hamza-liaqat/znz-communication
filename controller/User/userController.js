const { where } = require("sequelize");
const userModel = require("../../models/userModel");
const tokenModel = require("../../models/blacklistModel");
const { newEmailQueue } = require("../../utils/nodeMailer/mailer");
const bcrypt = require("bcrypt");
const additional = require("../../models/userAdditionalInformation");
const jwt = require("jsonwebtoken")
const forgotPassword = async (req, res) => {
  // res.end("hello from user controller")
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      statusCode: 400,
      message: "email is required",
      error: "email is missing",
    });
  }
  try {
    const userToFind = await userModel.findOne({ where: { email: email } });
    if (!userToFind) {
      return res
        .status(400)
        .json({ statusCode: 400, message: "user not found" });
    }
    if (userToFind.password === null) {
      return res
        .status(400)
        .json({ statusCode: 400, message: "email sent already. " });
    }
    await userToFind.update({ password: null });
    const resetContent = `
    <html>
      <head>
        <title>Reset Password</title>
      </head>
      <body style="font-family: Arial, sans-serif;">
  
        <div style="background-color: #f2f2f2; padding: 20px; border-radius: 10px;">
          <h2 style="color: #333;">Email Verification</h2>
          <p>To Reset the Password, click on the link below:</p>
          <a href="http://localhost:3000/api/user/set-password/${email}" target="_blank" style="text-decoration: none;">
            <button style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
              Reset Password
            </button>
          </>
        </div>
      </body>
    </html>
  `;
    await newEmailQueue.add({
      to: userToFind.email,
      subject: "Password Reset Email",
      text: "Hello znz family, you have generated the request for the reset email password",
      html: resetContent,
    });
    return res
      .status(201)
      .json({ statusCode: 201, message: "password reset. check your email" });
  } catch (error) {
    console.log("error=>", error);
  }
};

const setPassword = async (req, res) => {
  // res.end("hello from setPassword");
  const { password, confirmPassword } = req.body;
  const email = req.params.email;
  const userPassword = await userModel.findOne({ where: { email: email } });
  if (!userPassword) {
    return res.status(400).json({ statusCode: 400, message: "user not found" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ statusCode: 400, message: "password is missing" });
  }
  if (!confirmPassword) {
    return res
      .status(400)
      .json({ statusCode: 400, message: "confirmPassword is missing" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({
      statusCode: 400,
      message: "password and confirm password doesnot matches",
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await userPassword.update(
      { password: hashedPassword },
      { where: { email: email } }
    );
    return res.status(201).json({
      statusCode: 201,
      message: "password changed",
      user: userPassword,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      statusCode: 500,
      message: "internal server error",
      error: error,
    });
  }
};
const userDashboard = (req, res) => {
  res.end("hello user dashboard");
};

const logout = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    await tokenModel.create({ token });
    res.status(200).json({
      message: "user logout successfully!",
      additionalMessage: "this session token destroyed",
    });
  } catch (error) {
    console.error("error=>", error);
    res.status(500).json({ message: "internal server error", error: error });
  }
};

const additionalUserDetails = async (req, res) => {
  const { country, language, gender, interests } = req.body;

  if (!country || !language || !gender || !interests) {
    return res.status(400).json({
      statusCode: 400,
      message: "all fields required",
      fields: "country, gender, language, interests",
    });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "token missing" });
  }

  const accessToken = authHeader.split(" ")[1];

  jwt.verify(accessToken, process.env.Secret_KEY, async (err, decoded) => {
    if (err) {
      console.error("JWT verification failed:", err.message);
      return res.status(401).send("Unauthorized: Invalid token");
    } else {
      console.log("JWT decoded:", decoded);

      try {
        // Extract user email from decoded information
        const userEmail = decoded.email;
        const additionalDetails = await additional.create({
          email: userEmail,
          country: country,
          gender: gender,
          language: language,
          interests: interests,
        });

        return res.status(200).json({ message: "Additional details added successfully" });
      } catch (error) {
        console.log("error-additionalUserDetailsController", error);
        return res.status(500).json({ statusCode: 500, message: "internal server error" });
      }
    }
  });
};




module.exports = {
  forgotPassword,
  setPassword,
  userDashboard,
  logout,
  additionalUserDetails,
};
