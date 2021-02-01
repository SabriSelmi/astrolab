const router = require('express').Router();
const productController = require("../controllers/productControllers");
const userController = require("../controllers/userController");

router.post("/", userController.checkToken, productController.uploadPicture.single("image") ,productController.addProduct );
router.put("/:id", userController.checkToken , productController.uploadPicture.single("image"),productController.editProduct );
router.delete("/:id", userController.checkToken ,productController.deleteProduct );
router.get("/:id", userController.checkToken ,productController.getProduct );
router.get("/", userController.checkToken, productController.getProducts);
router.get("/products/:id", userController.checkToken, productController.getProductsWishlist);

module.exports = router;