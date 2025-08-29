const { SMTP } = require("../../config/config");
const UserService = require("../services/user.service");
const nodemailer = require("nodemailer");
class AuthController {
  constructor() {
    this.user_svc = new UserService();
  }
  registerUser = async (req, res, next) => {
    try {
      let body = req.body;
      if (req.file) {
        // console.log(req.file);
        body.image = req.file.filename;
      }
      this.user_svc.validateUser(body);
      let transporter = nodemailer.createTransport({
        host: SMTP.HOST,
        port: SMTP.PORT,
        secure: SMTP.TLS,
        auth: {
          user: SMTP.USER,
          pass: SMTP.PASS,
        },
      });
      let mail_response = await transporter.sendMail({
        to: body.email,
        from: SMTP.FROM,
        attachments: [
          {
            filename: "Image.jpeg",
            path: "http://localhost:3000/assets/1756325180909-Coverletter-page-001 (1).jpg",
          },
        ],
        subject: "Account Registered",
        text: `Dear ${body.name} ,Your account has been registered`,
        html: `<b>Dear ${body.name},</b><br/><p>Your account has been registered. <img src='http://localhost:3000/assets/1756325180909-Coverletter-page-001 (1).jpg'></p>`,
      });
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
