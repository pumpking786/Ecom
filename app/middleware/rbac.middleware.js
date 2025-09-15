const isAdmin = (req, res, next) => {
  if (req.auth_user.role === "admin") {
    next();
  } else {
    next({ status: 403, msg: "Access denied" });
  }
};
const isSeller = (req, res, next) => {
  if (req.auth_user.role === "seller") {
    next();
  } else {
    next({ status: 403, msg: "Access denied" });
  }
};
const isCustomer = (req, res, next) => {
  if (req.auth_user.role === "customer") {
    next();
  } else {
    next({ status: 403, msg: "Access denied" });
  }
};
const isAdminSeller = (req, res, next) => {
  if (req.auth_user.role === "admin" || req.auth_user.role === "seller") {
    next();
  } else {
    next({ status: 403, msg: "Access denied" });
  }
};
module.exports = {
  isAdmin,
  isAdminSeller,
  isCustomer,
  isSeller,
};
