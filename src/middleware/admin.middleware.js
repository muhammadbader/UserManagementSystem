const admin = () => {
  return (req, res, next) => {
 
      if (req.role !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admins only" });
      }
      return next();
   
  };
};

export default admin;
