const authenticateJWT = require("../app/middleware/authenticationJWT");
const { isAdmin, isCustomer } = require("../app/middleware/rbac.middleware");
const uploader = require("../app/middleware/uploader.middleware");
const router = require("express").Router();
const ProductController = require("../app/controller/product.controller");
const productCtrl = new ProductController();

router
  .route("/")
  .post(
    authenticateJWT,
    isAdmin,
    uploader.array("images"),
    productCtrl.productStore
  )
  .get(productCtrl.getProducts);

router
  .route("/:id")
  .put(
    authenticateJWT,
    isAdmin,
    uploader.array("images"),
    productCtrl.productUpdate
  )
  .delete(authenticateJWT, isAdmin, productCtrl.productDelete)
  .get(productCtrl.productGetById);

module.exports = router;
