const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router
  .route("/admin/create")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router.route("/product").get(getAllProducts);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);
router.route("/product/:id").get(getProductDetails);
router
  .route("/admin/product/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
router.route("/review").put(isAuthenticatedUser, createProductReview);
router
  .route("/allreview")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

module.exports = router;
