const router = require('express').Router();
const userController = require("../controllers/userController");

router.post("/signup", userController.signup );
router.post("/signin", userController.signin );
router.get("/logout", userController.logout );
router.get("/check", userController.checkToken, (req, res)=> res.send(true));

module.exports = router;