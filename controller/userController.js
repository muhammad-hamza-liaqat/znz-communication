const { where } = require("sequelize");
const userModel = require("../models/userModel");
const {newEmailQueue} = require("../utils/nodeMailer/mailer")
const forgotPassword = async (req, res) => {
  // res.end("hello from user controller")
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({
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
    if (userToFind.password ===null){
      return res.status(400).json({statusCode: 400, message: "email sent already. "})
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

module.exports = { forgotPassword };
