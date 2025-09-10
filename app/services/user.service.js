const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { SMTP } = require("../../config/config");
const DbService = require("./db.service");

class UserService extends DbService {
  constructor() {
    super();
    this.pendingUsers = [];
  }

  validateRegister = (data) => {
    try {
      const userSchema = Joi.object({
        name: Joi.string().min(3).required().messages({
          "string.min": "Name must be at least 3 characters long",
          "any.required": "Name is required",
        }),
        email: Joi.string().email().required().messages({
          "string.email": "Please provide a valid email address",
          "any.required": "Email is required",
        }),
        password: Joi.string().min(8).required().messages({
          "string.min": "Password must be at least 8 characters long",
          "any.required": "Password is required",
        }),
        confirmPassword: Joi.string().required().messages({
          "any.required": "Confirm password is required",
        }),
      });
      const response = userSchema.validate(data);
      if (response.error) {
        throw new Error(response.error.details[0].message);
      }
      if (data.password !== data.confirmPassword) {
        throw new Error("Password and Confirm Password do not match");
      }
    } catch (err) {
      console.error("Validation error:", err.message);
      throw new Error(err.message);
    }
  };

  validateLogin = (data) => {
    try {
      const userSchema = Joi.object({
        email: Joi.string().email().required().messages({
          "string.email": "Please provide a valid email address",
          "any.required": "Email is required",
        }),
        password: Joi.string().required().messages({
          "any.required": "Password is required",
        }),
      });
      const response = userSchema.validate(data);
      if (response.error) {
        throw new Error(response.error.details[0].message);
      }
    } catch (err) {
      console.error("Validation error:", err.message);
      throw new Error(err.message);
    }
  };

  createUser = async (data) => {
    try {
      // Validate input
      this.validateRegister(data);
      // Check for duplicate email in MongoDB
      const existingUser = await this.db
        .collection("users")
        .findOne({ email: data.email });
      if (existingUser) {
        throw new Error("Email already registered");
      }
      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 10);

      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000);

      // Create a user object and store in pendingUsers
      const pendingUser = {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        otp: otp,
      };
      this.pendingUsers.push(pendingUser);

      // Send OTP via email (commented out as in original)
      // let transporter = nodemailer.createTransport({
      //   host: SMTP.HOST,
      //   port: SMTP.PORT,
      //   secure: SMTP.TLS,
      //   auth: {
      //     user: SMTP.USER,
      //     pass: SMTP.PASS,
      //   },
      // });
      // await transporter.sendMail({
      //   to: data.email,
      //   from: SMTP.FROM,
      //   subject: "Verify your Email",
      //   text: `Dear ${data.name}, Your OTP is: ${otp}`,
      //   html: `<b> Dear ${data.name},Your OTP for registration is ${otp}</b>`,
      // });

      return {
        result: `Your otp for registration is ${otp}`,
        status: true,
        msg: "OTP sent to your email. Enter it to complete registration",
      };
    } catch (err) {
      console.error("Create user error:", err.message);
      throw new Error(err.message);
    }
  };

  verifyOtp = async ({ email, otp }) => {
    try {
      // Validate input
      const schema = Joi.object({
        email: Joi.string().email().required().messages({
          "string.email": "Please provide a valid email address",
          "any.required": "Email is required",
        }),
        otp: Joi.number().required().messages({
          "any.required": "OTP is required",
        }),
      });
      const { error } = schema.validate({ email, otp });
      if (error) {
        throw new Error(error.details[0].message);
      }

      // Find pending user
      const index = this.pendingUsers.findIndex(
        (u) => u.email === email && u.otp == otp
      );
      if (index === -1) {
        throw new Error("Invalid OTP or email");
      }

      // Move user to registered
      const user = this.pendingUsers.splice(index, 1)[0];
      await this.db.collection("users").insertOne({
        name: user.name,
        email: user.email,
        password: user.password,
      });

      return {
        name: user.name,
        email: user.email,
      };
    } catch (err) {
      console.error("Verify OTP error:", err.message);
      throw new Error(err.message);
    }
  };

  login = async (data) => {
    try {
      // Validate input
      this.validateLogin(data);
      const { email, password } = data;

      // Find user in MongoDB
      const user = await this.db.collection("users").findOne({ email });
      if (!user) {
        throw new Error("Credentials do not match");
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Credentials do not match");
      }

      // Create JWT token
      const token = jwt.sign(
        { email: user.email, name: user.name, id: user._id },
        process.env.JWT_SECRET || "YOUR_SECRET_KEY",
        { expiresIn: "1h" }
      );

      return {
        token,
        user: { email: user.email, name: user.name },
      };
    } catch (err) {
      console.error("Login service error:", err.message);
      throw new Error(err.message);
    }
  };
}

module.exports = UserService;
