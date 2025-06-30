const express = require("express");
const app_routes = express();
const AuthController = require("../app/controllers/auth.controller");
const authctrl = new AuthController();
app_routes.post("/register", authctrl.registerUser);
app_routes.post("/login", authctrl.loginUser);
module.exports = app_routes;
