import { useEffect, useState } from "react";
import BlogList from "../components/Blogs/BlogList";
import Loader from "../components/Loader";

const Home = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [blogs, setBlogs] = useState([])

    const fetchBlogPost = async () => {
        setIsLoading(true)
        const res = await fetch('/post/blogs');
        const data = await res.json();
        // console.log(data);
        setBlogs(data.data)
        setIsLoading(false)
    }
    useEffect(() => { fetchBlogPost() }, [])

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="p-4">
            <div className="max-w-xl m-auto">
                <BlogList blogs={blogs} />
            </div>
        </div>
    )
}

export default Home;