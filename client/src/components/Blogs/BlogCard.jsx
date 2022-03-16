import { Link } from "react-router-dom";
import TextSortner from "./TextSortner";
import { ChevronDoubleRightIcon } from '@heroicons/react/solid'
import { UserContext } from "../../reducer/UserContext";
import { Fragment, useContext } from "react";

const BlogCard = ({ blog }) => {
    const userCtx = useContext(UserContext);

    return (
        <div className="my-3 shadow rounded-md px-4 py-2">
            <Link to={`/author/${blog.userId}`} className="font-serif capitalize underline text-sm font-semibold text-teal-600 hover:text-teal-700">{blog.userName}</Link>
            {userCtx.isUser._id === blog.userId ? <Fragment>&nbsp;|&nbsp;<Link
                to={`/post/edit/${blog._id}`}
                className="font-serif capitalize underline text-sm font-semibold text-teal-600 hover:text-teal-700"
                target="_blank"
            >Edit</Link></Fragment> : ''}
            
            <h2 className="my-2 text-xl font-bold">{blog.heading}</h2>
            <TextSortner text={blog.post} />
            <Link to={`/${blog._id}`} className="flex items-center text-teal-600 hover:underline">
                Read More
                <ChevronDoubleRightIcon className="h-4 ml-1" />
            </Link>
        </div>
    )
}

export default BlogCard