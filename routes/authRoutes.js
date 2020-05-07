// This route will handle SignUP, SignIN and SignOUT

var express = require("express");
var router = express.Router();


const { check, validationResult } = require("express-validator");
const{ signup, signin, signout, isSignedIn } = require("../controllers/authController");





router.post("/signup",  [
  check("name", "name should be at least 3 char").isLength({ min: 3 }),
  check("username","Username is required and should be unique").isLength({min:4, max:18}),
  check("instituteName","InstitueName is required").isLength({min:4, max:18}),
  check("email", "email is required").isEmail(),
  check("password", "password should be at least 3 char").isLength({ min: 3 })
],
signup);


router.post(
  "/signin",
  [
    check("username", "username is required").isLength({min:4, max:18}),
    check("password", "password field is required").isLength({ min: 1 })
  ],
  signin
);

router.get("/signout",isSignedIn, signout);


module.exports = router;