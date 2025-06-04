// all code examples are from https://sequelize.org/docs/v6/getting-started/
import { Sequelize } from "sequelize";

// Update these values with your actual database credentials
const sequelize = new Sequelize("Library", "root", "", {
  host: "localhost",
  dialect: "mysql", // or 'postgres', 'sqlite', 'mssql'
  logging: false, // Set to true to see SQL queries in console
});

export const connectDB = () => {
  sequelize
    .sync()
    // .sync({ force: true })
    .then(() => {
      console.log("Library Database connection established.");
    })
    .catch((error) => {
      console.error("Unable to connect to the Library database:", error);
    });
};

export default sequelize;
