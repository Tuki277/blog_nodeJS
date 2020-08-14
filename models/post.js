const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Tao model
const postSchema = new Schema({
    title : {
        type : String,
        require : true
    },
    text : {
        type : String,
        require : true
    }
})

module.exports = mongoose.model('post', postSchema)