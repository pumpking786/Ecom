const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({
            status: false,
            msg: "Access token has expired. Please log in again to obtain a new token.",
          });
        }
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
