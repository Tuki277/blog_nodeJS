const express = require('express')
const { model } = require('mongoose')
const router = express.Router()


// Load model
const post = require('../models/post')

// hien thi cac bai viet
router.get('/', async(req, res) => {
    const posts = await post.find().lean().sort();
    console.log("day la index");
    res.render('page/index', { post: posts })
});

// Thu nghiem
router.get('/add', (req, res) => {
    res.render('posts/add')
});

router.get('/:id', async(req, res) => {

    const posts = await post.findOne({ _id: req.params.id }).lean()
    res.render('page/detail', { post: posts, id: req.params.id })
})

//tao post moi
router.post('/post', async(req, res) => {

    const { title, text } = req.body

    let errors = [];

    if (!title) errors.push({msg: 'Ten trong'})
    if (!text) errors.push({msg: 'Noi dung trong'})
    if (errors.length > 0) res.render('/add', { title : title, text : text })
    else {
        const newPostData = { title : title, text: text }
        const newPost = new post(newPostData)
        await newPost.save()
        res.redirect('/')
    }
});

module.exports = router