const express = require('express')
const { model } = require('mongoose')
const router = express.Router()
var mongoose = require('mongoose');


// Load model
const post = require('../models/post')

// hien thi cac bai viet
router.get('/', async(req, res) => {
    try {
        const posts = await post.find();
        res.render('page/index', { post: posts })
    } catch (error) {
        console.log(error)
    }
});

router.get('/add', (req, res) => {
    res.render('posts/add')
});

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    if( !mongoose.Types.ObjectId.isValid(id) ) return false;
    const posts = await post.findOne({ _id: id }).lean()
    res.render('page/detail', { post: posts, id })
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