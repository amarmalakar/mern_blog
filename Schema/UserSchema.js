const mongoose = require('mongoose');
const validator = require("email-validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "This email is already in use, email must be unique"],
        validate: function () {
            return validator.validate(this.email)
        }
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'Password Must Be max then 6 letter'],
    },
    date: {
        type: Date,
        default: Date.now()
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

// generating token
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({ token })
        await this.save();
        return token;
    } catch (error) {
        console.log(error.message);
    }
}

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;