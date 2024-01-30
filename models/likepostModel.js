const {DataTypes} = require("sequelize");
const sequelize = require("../database/connection");


const postLikeModel = sequelize.define("likes",{
    likeID:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    likeUserID:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    likePostID: {
        type: DataTypes.STRING,
        allowNull: false
    }

})


sequelize
  .sync()
  .then(() => {
    console.log("likePostModel synchronized with the database(znz).");
  })
  .catch((error) => {
    console.error("Error synchronizing likePostModel", error);
});


module.exports = postLikeModel;