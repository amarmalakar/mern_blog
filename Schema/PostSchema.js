const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please Fill Post Title']
    },
    slug: {
        type: String,
        required: [true, 'Please Fill Post Slug']
    },
    heading: {
        type: String,
        required: [true, 'Please Fill Post Heading']
    },
    post: {
        type: String,
        required: [true, 'Please Fill Post Section']
    },
    userId: {
        type: mongoose.ObjectId,
        required: true
    },
    userName: {
        type: String,
        required: true
    }
})

// const userModel = mongoose.model('userModel', userSchema);
const postModel = mongoose.model('postModel', postSchema)
module.exports = postModel;