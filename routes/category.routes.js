const express = require("express");
const cat_routes = express();

cat_routes.get("/", (req, res) => {
  res.json("Categories got");
});
cat_routes.post("/", (req, res) => {
  res.json("Categories added");
});
cat_routes.put("/:id", (req, res) => {
  let id = req.params.id;
  res.json(`Category ${id} edited`);
});
cat_routes.delete("/12", (req, res) => {
  res.json("Category deleted");
});
module.exports = cat_routes;
