const express = require("express");
const auth_routes = express();
const AuthController = require("../app/controller/auth.controller");
const authCtrl = new AuthController();
const uploader = require("../app/middleware/uploader.middleware");
auth_routes.post("/register", uploader.single("image"), authCtrl.registerUser);
auth_routes.post("/login", authCtrl.loginUser);

auth_routes.post("/logout", authCtrl.logoutUser);
auth_routes.put("/change-pwd", authCtrl.changepwd);

module.exports = auth_routes;
