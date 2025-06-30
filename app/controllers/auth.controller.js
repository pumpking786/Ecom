const UserService = require("../services/user.service");
class AuthController {
  constructor() {
    this.user_srv = new UserService();
  }

  registerUser = (req, res, next) => {
    try {
      let body = req.body;
      this.user_srv.validateUser(body);

      res.json({
        result: body,
        status: true,
        msg: "Register data test",
      });
    } catch (excep) {
      next({ status: 400, msg: excep });
    }
  };
  loginUser = (req, res) => {};
}
module.exports = AuthController;
