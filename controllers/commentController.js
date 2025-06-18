const Comment = require('../models/Comment');
const Blog = require('../models/Blog');

exports.addComment = async (req, res) => {
    try {
        const comment = new Comment({
            content: req.body.content,
            author: req.user.userId,
            blog: req.params.blogId
        });
        await comment.save();
        
        await Blog.findByIdAndUpdate(req.params.blogId, {
            $push: { comments: comment._id }
        });
        
        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};