const express = require("express");
const app_routes = express();
const auth_routes = require("./auth.routes");
app_routes.use(auth_routes);
const cat_routes = require("./category.routes");
app_routes.use("/category", cat_routes);
module.exports = app_routes;
