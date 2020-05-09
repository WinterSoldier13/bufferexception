// This Route will handle all the blog posts

var express = require("express");
var router = express.Router();

const {getAllPosts, createNewPost, expandPost} = require('../controllers/postController');
const {isSignedIn,isAuthenticated} = require("../controllers/authController");



router.get('/posts/all', getAllPosts)

// TODO: posts should reflect in userprofile

//Create new post
// The userID To be managed by frontend
router.put('/posts/newPost/:userID',isSignedIn, createNewPost) //Need to add isAuthenticated

//Expand a post
router.get('/posts/:postID', expandPost);

//commentOnAPost

module.exports = router;