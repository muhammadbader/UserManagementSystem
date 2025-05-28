import express from "express";
import { connectDB } from "./DB/connection.js";

import userRouter from "./src/modules/user/user.js";

const app = express();
connectDB();

app.use(express.json());
// in case you got /user in the endpoint, redirect to userRouter
app.use("/users", userRouter);


app.listen(3000, () => {
  console.log("UMS server is running on port ... 3000");
});
