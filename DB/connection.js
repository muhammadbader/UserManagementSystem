// all code examples are from https://sequelize.org/docs/v6/getting-started/
import { Sequelize } from "sequelize";

// Update these values with your actual database credentials
const sequelize = new Sequelize("freedb_umsproject_knowdledge", "freedb_muhammad1", "6tn@KR2Xs@w2!W$", {
  // const sequelize = new Sequelize("UMS", "root", "", {
  host: "sql.freedb.tech" ,// "localhost",
  dialect: "mysql", // or 'postgres', 'sqlite', 'mssql'
  port: 3306, // default MySQL port, only for production use
  logging: false, // Set to true to see SQL queries in console
});

// another test for connection
// async function testConnection() {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// }
// testConnection();

export const connectDB = () => {
  sequelize
    .sync()
    // .sync({ force: true })
    .then(() => {
      console.log("Database connection established.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });
};

export default sequelize;
