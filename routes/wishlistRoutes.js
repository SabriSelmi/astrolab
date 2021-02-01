const router = require('express').Router();
const wishlistController = require("../controllers/wishlistControllers");
const userController = require("../controllers/userController");

router.post("/", userController.checkToken ,wishlistController.addWishlist );
router.put("/:id", userController.checkToken ,wishlistController.editWishlist );
router.delete("/:id", userController.checkToken ,wishlistController.deleteWishlist );
router.get("/:id", userController.checkToken ,wishlistController.getWishlist );
router.get("/", userController.checkToken, wishlistController.getWishlists);
module.exports = router;