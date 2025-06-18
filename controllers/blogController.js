// filepath: controllers/blogController.js
const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
    try {
        const blog = new Blog({
            ...req.body,
            author: req.user.userId
        });
        await blog.save();
        res.status(201).json(blog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
            .populate('author', 'username')
            .populate('comments');
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findOneAndUpdate(
            { _id: req.params.id, author: req.user.userId },
            req.body,
            { new: true }
        );
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json(blog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findOneAndDelete({
            _id: req.params.id,
            author: req.user.userId
        });
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json({ message: 'Blog deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};