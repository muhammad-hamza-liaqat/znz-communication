// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const googleModel = sequelize.define('User', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  displayName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
});

module.exports = googleModel;
