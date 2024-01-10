const { where } = require("sequelize");
const userModel = require("../models/userModel");

const forgotPassword = async (req,res)=>{
    // res.end("hello from user controller")
    const {email} = req.body
    if (!email){
        return res.status(400).json({statusCode: 400, message: "email is required", error: "email is missing"})
    }
    try {
        const userToFind = await userModel.findOne({where:{ email: email}})
        if (!userToFind){
            return res.status(400).json({statusCode:400,message: "user not found"})
        }
        await userToFind.update({password: null});
        return res.status(201).json({statusCode:201, message: "password reset. check your email"})
        
    } catch (error) {
        console.log("error=>",error);

    }
}


module.exports ={ forgotPassword }