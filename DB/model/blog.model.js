import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

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

export default blogModel;
