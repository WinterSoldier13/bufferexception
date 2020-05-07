const Post = require('../models/Post');
const {isSignedIn} = require("../controllers/authController");


exports.getAllPosts = (req,res) =>
{
    console.log(Post.find({},(err, post)=>
    {
        if(err || !post)
        {
            return res.status(400).json({
                error: "No posts found"
            })
        }
        else
        {
            return res.json(post);
        }
    }))

    // return res.json({});
}

exports.createNewPost = (req,res) =>
{
    let UserID = req.params.userID;
    let newPost = new Post(req.body);
    newPost.postAuthor = UserID;
    newPost.save((err,post) =>{
        if(err)
        {
            return res.status(400).json(
                {
                    error: "POST NOT SUCCESSFUL"
                }
            )
        }
        else
        {
            return res.json(post);
        }
    });

}