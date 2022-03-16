import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BlogList from '../components/Blogs/BlogList'
import Loader from '../components/Loader'

const AuthorBlogList = () => {
    const params = useParams()
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const fetchAuthBlogs = async () => {
        setIsLoading(true)
        const res = await fetch(`/post/user/${params.userId}`);
        const data = await res.json();
        // console.log(data);
        setBlogs(data.data)
        setIsLoading(false)
    }
    useEffect(() => { fetchAuthBlogs() }, [])

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

export default AuthorBlogList