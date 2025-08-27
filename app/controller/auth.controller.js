const UserService = require("../services/user.service");
class AuthController {
  constructor() {
    this.user_svc = new UserService();
  }
  registerUser = (req, res, next) => {
    try {
      let body = req.body;
      if (req.file) {
        // console.log(req.file);
        body.image = req.file.filename;
      }
      this.user_svc.validateUser(body);
      res.json({
        result: body,
        status: true,
        msg: "Received",
      });
    } catch (excep) {
      next({ status: 400, msg: excep });
    }
  };
  loginUser = (req, res) => {
    let validation = true;
    if (!validation) {
      res.status(400).json({
        result: null,
        status: false,
        msg: "Credential does not match",
      });
    } else {
      res.json({
        result: null,
        status: true,
        msg: "Logged in",
      });
    }
  };
  logoutUser = (req, res) => {};
  changepwd = (req, res) => {};
}
module.exports = AuthController;
