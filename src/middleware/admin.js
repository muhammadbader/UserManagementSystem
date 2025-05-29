const admin = () => {
  return (req, res, next) => {
    try {
      if (req.role !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admins only" });
      }
      return next();
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  };
};

export default admin;
