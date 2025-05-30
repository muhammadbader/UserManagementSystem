import {  DataTypes } from "sequelize";
import sequelize from "../connection.js";

// create a table for users
const UserModel = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  confirmEmail: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true, // Allow null for optional profile picture
  },
  role: {
    type: DataTypes.ENUM("user", "admin"),
    defaultValue: "user", // Default role is 'user'
    allowNull: false, // Ensure role is always set
  },
}, {
  timestamps: false, // Adds createdAt and updatedAt fields
});

export default UserModel;