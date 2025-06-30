const express = require("express");
const exp_routes = express();

exp_routes.get("/", (req, res) => {
  res.json("result");
});
exp_routes.post("/", (req, res) => {});

module.exports = exp_routes;
