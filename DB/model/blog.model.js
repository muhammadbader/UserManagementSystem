import { DataTypes } from "sequelize";
import sequelize from "../connection.js";
import UserModel from "./user.model.js"; // Assuming you have a User model defined

const blogModel = sequelize.define(
  "Blog",
  {
    // it will be created automatically if not defined
    // id: {
    //   type: Sequelize.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true,
    // },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique:true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

  },

);

// for relationships between tables (models)
// UserModel has many blogs, blogModel belongs to UserModel
UserModel.hasMany(blogModel)
blogModel.belongsTo(UserModel)

export default blogModel;
