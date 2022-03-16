const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser')
const path = require('path')

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening in ${PORT}...`);
})

// routers
const userRouter = require('./routers/AuthRouter');
app.use('/auth', userRouter)

const postRouter = require('./routers/PostRouter');
app.use('/post', postRouter)

// -------------- deployment --------------
__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "/client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
} else {
    app.get("/", (req, res) => {
        res.send("API Is Running...")
    })
}
// -------------- deployment --------------


mongoose.connect(process.env.DB)
.then((db) => {
    console.log('Server is connected with DataBase');
}).catch((err) => {
    console.log(err.message);
})