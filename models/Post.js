let moongoose = require('mongoose');

let postSchema = new moongoose.Schema(
    {
        title:
        {
            type: String,
            required: true,
            maxlength: 150,
            trim: true
        },
        description:
        {
            type: String,
            required: true,
            trim :true
        },
        postAuthor:
        {
            type: String,
            trim: true
        },
        postReplies:
        {
            type: Array,
            default: []
        }
    },
    {timestamps:true}
);


module.exports = moongoose.model("Post", postSchema);
