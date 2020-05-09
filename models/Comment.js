let moongoose = require('mongoose');

const commentSchema = new moongoose.Schema(
    {
        postID:
        {
            type: String,
            required: true
        },
        body:
        {
            type: String,
            required: true,
            trim: true
        },

        author:
        {
            type: String,
            required: true,
            trim:true
        }
    },
    {timestamps:true}
)


module.exports = moongoose.model('Comment', commentSchema);