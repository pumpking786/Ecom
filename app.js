const express = require("express");
const app = express();
const routes = require("./routes");
const router = express.Router();

app.use(
  express.urlencoded({
    extended: false,
  })
);
router.get("/", (req, res, next) => {
  res.json({ result: "I am P", status: true, msg: "Test" });
});

app.use(express.json());

app.use(routes);
app.use(router);

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
    status: true,
    msg: msg,
  });
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, "localhost", (err) => {
  if (!err) {
    console.log(`Server at ${PORT} has started`);
    console.log("Press Ctrl+C to shutdown");
  }
});
