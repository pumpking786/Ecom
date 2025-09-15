const express = require("express");
const app_routes = express();

const auth_routes = require("./auth.routes");
app_routes.use(auth_routes);

const user_routes = require("./user.routes");
app_routes.use(user_routes);

const cat_routes = require("./category.routes");
app_routes.use("/category", cat_routes);

const label_routes = require("./label.routes");
app_routes.use(label_routes);
module.exports = app_routes;
