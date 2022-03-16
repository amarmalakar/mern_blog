import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";

const Blog = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [isLoading, setIsLoading] = useState(false)

    const fetchBlogPost = async () => {
        setIsLoading(true);
        const res = await fetch(`/post/blog/${params.postId}`);
        const data = await res.json();
        setPost(data.data)
        setIsLoading(false);
    }
    useEffect(() => { fetchBlogPost() }, [])

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="p-4">
            <div className="max-w-xl m-auto">
                <Link to={`/author/${post.userId}`} className="capitalize underline text-sm font-semibold text-teal-600 hover:text-teal-700 font-serif mb-2 block">{post.userName}</Link>
                <h1 className="mb-4 text-3xl md:text-4xl font-bold capitalize">{post.heading}</h1>
                <p>{post.post}</p>
            </div>
        </div>
    )
}

export default Blog