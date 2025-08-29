const express = require("express");
const app = express();

const routes = require("./routes/");

app.use("/assets", express.static("public/"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(routes);

app.use((req, res, next) => {
  next({
    status: 404,
    msg: "not found",
  });
});

app.use((error, req, res, next) => {
  let status = error.status ?? 500;
  let msg = error.msg ?? error;
  res.status(status).json({
    result: null,
    status: false,
    msg: msg,
  });
});

app.listen(3000, "localhost", (err) => {
  if (!err) {
    console.log("Server is listening to port: 3000");
    console.log("Press CTRL+C to disconnect server");
  }
});
