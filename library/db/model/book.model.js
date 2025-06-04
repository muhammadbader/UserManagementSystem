import { DataTypes } from "sequelize";
import sequelize from "../connection.js";

const BookModel = sequelize.define(
  "Book",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically increment the ID
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure ISBN is unique
    },
  },
  {
    timestamps: false, // Adds createdAt and updatedAt fields
  }
);

export default BookModel;
