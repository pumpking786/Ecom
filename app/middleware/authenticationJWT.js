const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, "YOUR_SECRET_KEY", (err, user) => {
      if (err) {
        return res.status(403).json({ status: false, msg: "Forbidden" });
      }
      req.user = user; // attach user to request
      next();
    });
  } else {
    res.status(401).json({ status: false, msg: "Unauthorized" });
  }
};

module.exports = authenticateJWT;
