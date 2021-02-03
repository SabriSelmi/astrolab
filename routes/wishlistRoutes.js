const router = require('express').Router();
const wishlistController = require("../controllers/wishlistControllers");
const userController = require("../controllers/userController");


// post new wishlist
router.post("/", userController.checkToken ,wishlistController.addWishlist );

// update a wishlist
router.put("/:id", userController.checkToken ,wishlistController.editWishlist );

// delete a wishlist
router.delete("/:id", userController.checkToken ,wishlistController.deleteWishlist );

// get a single wishlist
router.get("/:id", userController.checkToken ,wishlistController.getWishlist );

// get all wishlists
router.get("/", userController.checkToken, wishlistController.getWishlists);
module.exports = router;