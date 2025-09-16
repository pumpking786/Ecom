const slugify = require("slugify");

const LabelService = require("../services/label.service");
class LabelController {
  constructor() {
    this.label_srv = new LabelService();
  }
  labelStore = async (req, res, next) => {
    try {
      let data = req.body; // Initialize with request body or {...req.body}

      if (req.file) {
        data.image = req.file.filename;
      }
      data.type = req.params.type;

      if (!data.link || data.link == "null") {
        data.link = slugify(data.title, {
          lower: true,
        });
      }

      // this.label_srv.storeValidate(data);
      let response = await this.label_srv.createLabel(data);
      res.json({
        result: response,
        msg: data.type + " created successfully",
        status: true,
      });
    } catch (except) {
      console.log("LabelStore: ", except);
      next({ status: 400, msg: except });
    }
  };
}
module.exports = LabelController;
