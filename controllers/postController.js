const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
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
    var posts =[];
    var x =newPost._id;
    User.findOne({"username": UserID},null, (err, user)=> {
        if(err || !user)
        {
            return res.status(400).send("USER NOT FOUND");
        }
        // user.posts.push(newPost._id);
        posts = user.posts;
        posts.push(x);

        User.findOneAndUpdate({"username": UserID}, {"posts": posts}, (err,user)=>
        {
        if(err || !user)
        {
            return res.status(400).json(
                {
                    error: "Unable to add post to the USER profile"
                }
            )
        }
    });
        
    })

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

exports.expandPost = (req,res) =>
{
    let PostID = req.params.postID;
    Post.findById(PostID,(err,post) =>{
        if(err || !post)
        {
            return res.status(404).json(
                {
                    error: "POST NOT FOUND"
                }
            )
        }
        else
        {
            return res.json(post);
        }
    })
}


exports.commentOnPost = (req,res) =>
{
    const postID = req.params.postID;
    const username = req.params.username;

    let newComment = new Comment(req.body);
    newComment.author = username;
    newComment.postID = postID;
    var commentID = newComment._id;

    newComment.save((err,comment) => {
        if(err)
        {
            return res.status(400).json(
                {
                    error: "Unable to create the comment"
                }
            )
        }

        Post.findById(postID,(err,post)=>
        {
            if(err)
            {
                return res.status(400);
            }
            var comments = post.postReplies;
            comments.push(commentID)


            Post.findByIdAndUpdate(postID,{"postReplies":comments},(err,com)=>
            {
                if(err)
                {
                    return res.send(err);
                }
                return res.json(com);
            })
        } )
    })




}

exports.getAllComments = (req,res)=> 
{


}