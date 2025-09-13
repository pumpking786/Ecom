const { MongoClient } = require("mongodb");
const { DB, ENVIRONMENT } = require("../../config/config");

class DbService {
  constructor() {
    this.connect();
  }
  connect = async () => {
    try {
      let DB_URL = "";
      if (ENVIRONMENT === "dev") {
        DB_URL = DB.PROTOCOL + "://" + DB.HOST + ":" + DB.PORT;
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
      let client = await MongoClient.connect(DB_URL);
      this.db = client.db(DB.NAME);
    } catch (err) {
      throw err;
    }
  };
}
module.exports = DbService;
