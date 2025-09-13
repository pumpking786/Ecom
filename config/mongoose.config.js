const mongoose = require("mongoose");
const { ENVIRONMENT, DB } = require("./config");
let DB_URL = "";
if (ENVIRONMENT === "dev") {
  DB_URL = DB.PROTOCOL + "://" + DB.HOST + ":" + DB.PORT + "/" + DB.NAME;
} else if (ENVIRONMENT === "prod") {
  DB_URL =
    DB.PROTOCOL +
    "://" +
    DB.USER +
    ":" +
    DB.PWD +
    "@" +
    DB.HOST +
    ":" +
    DB.PORT;
}

// Connect using promise-based syntax
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("✅ DB connected successfully...");
  })
  .catch((err) => {
    console.error("❌ DB connection error:", err);
    process.exit(1); // Exit process if DB fails
  });
