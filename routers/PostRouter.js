const express = require('express');
const Authenticate = require('../middleware/authenticate');
const postModel = require('../Schema/PostSchema');

const postRouter = express.Router();

// {
//     "title": "first",
//     "slug": "very-first-1",
//     "heading": "Very First",
//     "post": "This Is The Very First Blog Post..."
// }

postRouter.post('/write', Authenticate, async (req, res) => {
    try {
        const { title, slug, heading, post } = req.body;

        if (!title || !slug || !heading || !post) {
            return res.status(401).json({ success: false, message: "Fill Post Form Correctly! :(" })
        }

        const isPost = await postModel.findOne({ userId: req.isUser._id, slug })
        if (isPost) {
            return res.status(401).json({ success: false, message: "Please Keep Unique Slug" })
        }

        const userId = req.isUser._id;
        const userName = req.isUser.name;

        await postModel.create({ title, slug, heading, post, userId, userName })
        res.status(200).json({ success: true, message: 'Blog Is Posted!' })
    } catch (error) {
        res.status(501).json({ success: false, message: error.message })
    }
})

postRouter.patch('/update/:postId', Authenticate, async (req, res) => {
    try {
        const isPost = await postModel.findById(req.params.postId)
        if (!isPost) {
            return res.status(401).json({ success: false, message: 'post is not availabel ! :(' })
        }

        const { title, slug, heading, post } = req.body;
        if (!title || !slug || !heading || !post) {
            return res.status(401).json({ success: false, message: "Fill Post Form Correctly! :(" })
        }

        if (req.isUser._id.toString() !== isPost.userId.toString()) {
            return res.status(401).json({ success: false, message: "Authorize Error! You've not access to update this post :(" })
        }

        const updatePost = await postModel.findByIdAndUpdate(req.params.postId, req.body, {
            new: true
        })
        res.status(200).json({ success: true, message: 'post is updated', data: updatePost })
    } catch (error) {
        res.status(501).json({ success: false, message: error.message })
    }
})

// Get Blogs By UserId
// 622ca5239154dd6728651a07
postRouter.get('/user/:userId', async (req, res) => {
    try {
        // res.json(req.params.userId)
        const findBlogs = await postModel.find({ userId: req.params.userId })
        if (!findBlogs) {
            return res.status(401).json({ success: false, message: "Something Error" })
        }

        res.status(200).json({ success: true, message: "Author Blogs", data: findBlogs })
    } catch (error) {
        res.status(501).json({ success: false, message: error.message })
    }
})

postRouter.get('/blogs', async (req, res) => {
    try {
        // res.json(req.params.userId)
        const findAllBlogs = await postModel.find()
        if (!findAllBlogs) {
            return res.status(401).json({ success: false, message: "Something Error" })
        }

        res.status(200).json({ success: true, message: "All Blogs Are Fetched!", data: findAllBlogs })
    } catch (error) {
        res.status(501).json({ success: false, message: error.message })
    }
})

// 622f0d6de35a25dca915cbd2
postRouter.get('/blog/:postId', async (req, res) => {
    try {
        // res.json(req.params.postId)
        const findBlog = await postModel.findById(req.params.postId)
        if (!findBlog) {
            return res.status(401).json({ success: false, message: "Something Error" })
        }

        res.status(200).json({ success: true, message: "Blog Data", data: findBlog })
    } catch (error) {
        res.status(501).json({ success: false, message: error.message })
    }
})

module.exports = postRouter;