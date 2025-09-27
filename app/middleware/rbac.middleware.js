const isAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    next({ status: 403, msg: "Access denied" });
  }
};

const isSeller = (req, res, next) => {
  if (req.user.role === "seller") {
    next();
  } else {
    next({ status: 403, msg: "Access denied" });
  }
};

const isCustomer = (req, res, next) => {
  // console.log(req.user.id);

  if (req.user.role === "customer") {
    next();
  } else {
    next({ status: 403, msg: "Access denied" });
  }
};

const isAdminSeller = (req, res, next) => {
  if (req.user.role === "admin" || req.user.role === "seller") {
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
