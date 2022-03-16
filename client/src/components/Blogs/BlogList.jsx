import { Fragment, useState } from "react"
import Pagination from "../Pagination";
import BlogCard from "./BlogCard"

const BlogList = ({ blogs }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(3);

    // Get Current Post
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = blogs?.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    if (currentPosts.length === 0) {
        return <h1 className="text-2xl md:text-3xl font-semibold">No Blog Post Is Avliable ! :(</h1>
    }

    return (
        <Fragment>
            {currentPosts?.reverse()?.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
            ))}
            <Pagination postsPerPage={postsPerPage} totalPosts={blogs.length} paginate={paginate} />
        </Fragment>
    )
}

export default BlogList