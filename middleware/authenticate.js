const jwt = require("jsonwebtoken");
const userModel = require("../Schema/UserSchema");

const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.json_web_token;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const isUser = await userModel.findOne({ _id: verifyToken._id, "tokens.token": token })

        if (!isUser) { throw new Error("User not found ! :(") }

        req.token = token;
        req.isUser = isUser;
        req.userId = isUser._id;

        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Unauthorize: No token provided' })
    }
}

module.exports = Authenticate;