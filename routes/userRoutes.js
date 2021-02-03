const router = require('express').Router();
const userController = require("../controllers/userController");

// create new user
router.post("/signup", userController.signup );

// sign in user
router.post("/signin", userController.signin );

// logout user
router.get("/logout", userController.logout );

// check user authorisation
router.get("/check", userController.checkToken, (req, res)=> res.send(true));

module.exports = router;