const { SMTP } = require("../../config/config");
const UserService = require("../services/user.service");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let pendingUsers = [];
let registeredUsers = [];

class AuthController {
  constructor() {
    this.user_svc = new UserService();
  }
  registerUser = async (req, res, next) => {
    try {
      let body = req.body;
      this.user_svc.validateRegister(body);

      // Hash password
      const hashedPassword = await bcrypt.hash(body.password, 10);

      const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit

      // Create a user object
      pendingUsers.push({
        name: body.name,
        email: body.email,
        password: hashedPassword,
        otp: otp,
      });
      // let transporter = nodemailer.createTransport({
      //   host: SMTP.HOST,
      //   port: SMTP.PORT,
      //   secure: SMTP.TLS,
      //   auth: {
      //     user: SMTP.USER,
      //     pass: SMTP.PASS,
      //   },
      // });
      // let mail_response = await transporter.sendMail({
      //   to: body.email,
      //   from: SMTP.FROM,
      //   subject: "Verify your Email",
      //   text: `Dear ${body.name} ,Your OTP is: ${otp}`,
      //   html: `<b>Your otp for registration is ${otp} </b></p>`,
      // });
      res.json({
        result: otp,
        status: true,
        msg: "Otp sent to your email. Enter it to complete registration",
      });
    } catch (excep) {
      next({ status: 400, msg: excep });
    }
  };
  // Step 2: Verify OTP and register
  verifyOtp = (req, res, next) => {
    try {
      const { email, otp } = req.body;

      // Find pending user
      const index = pendingUsers.findIndex(
        (u) => u.email === email && u.otp == otp
      );

      if (index === -1) {
        return res.status(400).json({
          status: false,
          msg: "Invalid OTP or email",
        });
      }

      // Move user to registered
      const user = pendingUsers.splice(index, 1)[0];
      registeredUsers.push(user);

      res.json({
        status: true,
        msg: "Registration completed successfully",
        result: { name: user.name, email: user.email },
      });
    } catch (err) {
      next({ status: 400, msg: err });
    }
  };
  loginUser = async (req, res) => {
    try {
      let body = req.body;
      this.user_svc.validateLogin(body);
      const { email, password } = body;
      // Find user in data array
      const user = registeredUsers.find((u) => u.email === email);
      if (!user) {
        return res.status(400).json({
          result: null,
          status: false,
          msg: "Email not found",
        });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          result: null,
          status: false,
          msg: "Password incorrect",
        });
      }

      // Create JWT token
      const token = jwt.sign(
        { email: user.email, name: user.name },
        "YOUR_SECRET_KEY", // replace with env variable in production
        { expiresIn: "1h" }
      );

      res.json({
        result: { token },
        status: true,
        msg: "Logged in successfully",
      });
    } catch (err) {
      res.status(500).json({ status: false, msg: err.message });
    }
  };
  logoutUser = (req, res) => {};
  changepwd = (req, res) => {};
}
module.exports = AuthController;
