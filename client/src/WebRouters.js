import { Route, Routes } from "react-router-dom"
import AuthorBlogList from "./screens/AuthorBlogList";
import Blog from "./screens/Blog";
import EditBlog from "./screens/EditBlog";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Logout from "./screens/Logout";
import Signup from "./screens/Signup";
import WritePost from "./screens/WritePost";

const WebRouters = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/post/new" element={<WritePost />} />
            <Route path="/author/:userId" element={<AuthorBlogList />} />
            <Route path="/:postId" element={<Blog />} />
            <Route path="/post/edit/:postId" element={<EditBlog />} />
        </Routes>
    )
}

export default WebRouters;