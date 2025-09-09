const { MongoClient } = require("mongodb");
const { DB } = require("../../config/config");

class DbService {
  constructor() {
    this.connect();
  }
  connect = async () => {
    try {
      let client = await MongoClient.connect(
        DB.PROTOCOL + "://" + DB.HOST + ":" + DB.PORT
      );
      this.db = client.db(DB.NAME);
    } catch (err) {
      throw err;
    }
  };
}
module.exports = DbService;
