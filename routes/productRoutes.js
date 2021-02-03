const router = require('express').Router();
const productController = require("../controllers/productControllers");
const userController = require("../controllers/userController");

// post a new product
router.post("/", userController.checkToken, productController.uploadPicture.single("image") ,productController.addProduct );

// update product
router.put("/:id", userController.checkToken , productController.uploadPicture.single("image"),productController.editProduct );

// delete product
router.delete("/:id", userController.checkToken ,productController.deleteProduct );


// get single product
router.get("/:id", userController.checkToken ,productController.getProduct );

// get all products
router.get("/", userController.checkToken, productController.getProducts);

// get products related to a wishlist
router.get("/products/:id", userController.checkToken, productController.getProductsWishlist);

module.exports = router;