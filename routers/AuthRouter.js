const express = require('express');
const bcrypt = require('bcrypt');
const userModel = require('../Schema/UserSchema');
const Authenticate = require('../middleware/authenticate');

const authRouter = express.Router();

authRouter.route('/login')
    .post(login);

authRouter.route('/signup')
    .post(signup);

authRouter.route('/logout')
    .get(logout);

authRouter.get('/about', Authenticate, (req, res) => {
    res.send(req.isUser);
});

async function signup (req, res) {
    try {
        const { name, email, password, confirmPassword } = req.body;
        if (!name || !email || !password || !confirmPassword) {
            return res.status(401).json({ success: false, message: "Please input field correctly ! :(" })
        }

        if (password !== confirmPassword) {
            return res.status(401).json({ success: false, message: "Password And Confirm Password Are Not Match ! :(" })
        }

        let salt = await bcrypt.genSalt();
        let hashedPassword = await bcrypt.hash(password, salt);

        await userModel.create({ name, email, password: hashedPassword, confirmPassword });
        res.status(200).json({ success: true, message: 'User Successfully ! :)' })
    } catch (error) {
        res.status(501).json({ success: false, message: error.message })
    }
}

async function login (req, res) {
    try {
        const { email, password } = req.body;
        if ( !email || !password ) {
            return res.status(401).json({ success: false, message: "Please input field correctly ! :(" })
        }

        const isUser = await userModel.findOne({ email })
        if (!isUser) {
            return res.status(401).json({ success: false, message: "Please fill valid credentials ! :((" })
        }

        const extractPassword = await bcrypt.compare(password, isUser.password);
        if (!extractPassword) {
            return res.status(401).json({ success: false, message: "Please fill valid credentials ! :-(" })
        }

        const token = await isUser.generateAuthToken();

        res.cookie('json_web_token', token, {
            expires: new Date(Date.now() + 100*60*60*24),
            httpOnly: true
        })

        res.status(200).json({ success: true, message: "User Successfully LoggedIn ! :)", data: isUser })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

async function logout (req, res) {
    res.clearCookie('json_web_token', { path: '/' })
    res.status(200).send({ success: true, message: 'User Logout' })
}

module.exports = authRouter;