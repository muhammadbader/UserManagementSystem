import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const auth = () => {
  return (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const decoded = jwt.verify(token, "muhammad bdeir");
      req.user = decoded;
      return next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};

export default auth;
