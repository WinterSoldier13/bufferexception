// This Route will handle the User-Profile i.e show info about the user

var express = require("express");
var router = express.Router();

const {getUser} = require('../controllers/userController');
const {isSignedIn, isAuthenticated, isAdmin} = require('../controllers/authController');


router.get('/user/:username', getUser);



module.exports = router;