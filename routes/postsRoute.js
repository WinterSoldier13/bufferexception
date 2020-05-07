// This Route will handle all the blog posts

var express = require("express");
var router = express.Router();

const {getAllPosts, createNewPost} = require('../controllers/postController');
const {isSignedIn,isAuthenticated} = require("../controllers/authController");



router.get('/posts/all', getAllPosts)


//Create new post
// The userID To be managed by frontend
router.put('/posts/newPost/:userID',isSignedIn, createNewPost)

module.exports = router;