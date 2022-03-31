import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import Loader from "../components/Loader";
import { UserContext } from "../reducer/UserContext";

const EditBlog = () => {
    const navigate = useNavigate()
    const params = useParams();
    const userCtx = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [heading, setHeading] = useState('');
    const [post, setPost] = useState('');
    const [isLoading, setIsLoading] = useState(false)

    const [postData, setPostData] = useState({})

    const fetchBlogPost = async () => {
        setIsLoading(true);
        const res = await fetch(`/post/blog/${params.postId}`);
        const data = await res.json();
        setTitle(data.data.title)
        setSlug(data.data.slug)
        setHeading(data.data.heading)
        setPost(data.data.post)
        setPostData(data.data)
        setIsLoading(false);
    }
    useEffect(() => {
        fetchBlogPost();

        if (postData?.userId?.toString() !== userCtx?.isUser?._id?.toString() ) {
            navigate('/')
        }
    }, [])
    if (isLoading) {
        return <Loader />
    }

    const updateHandler = async (e) => {
        e.preventDefault();
        const res = await fetch(`/post/update/${params.postId}`, {
            method: 'PATCH',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({ title, slug, heading, post })
        })

        const data = await res.json();
        
        if (!data.success) {
            window.alert(data.message)
        } else {
            window.alert(data.message)
            navigate(`/${params.postId}`)
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        
        const confirm = window.confirm('Do You Want To Delete Post?');
        if (confirm) {
            const res = await fetch(`/post/delete/${params.postId}`, {
                method: 'DELETE',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: 'include',
            })

            await res.json();
            navigate('/')
        }
    }

    return (
        <div className="p-4">
            <div className='m-auto max-w-2xl p-4 shadow-lg rounded-lg'>
                <h1 className="text-teal-600 font-semibold text-xl mt-2 mb-4">Update Blog</h1>

                <form onSubmit={updateHandler}>
                    <Input label="Post Title" data={{
                        id: 'title',
                        type: 'text',
                        placeholder: 'Post Title',
                        value: title,
                        onChange: e => setTitle(e.target.value)
                    }} />

                    <Input label="Post Slug" data={{
                        id: 'slug',
                        type: 'text',
                        placeholder: 'this-is-post-slug',
                        value: slug,
                        onChange: e => setSlug(e.target.value)
                    }} />

                    <Input label="Post Heading" data={{
                        id: 'heading',
                        type: 'text',
                        placeholder: 'Heading',
                        value: heading,
                        onChange: e => setHeading(e.target.value)
                    }} />

                    <div className='mb-4'>
                        <label htmlFor="post" className="block text-grey-darker font-bold mb-2">Write Your Post</label>
                        <textarea
                            id="post"
                            placeholder='Write Your Post Here'
                            value={post}
                            onChange={e => setPost(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker dark:text-black min-h-[250px] resize-none overflow-auto"
                        ></textarea>
                    </div>

                    <button className="bg-teal-600 hover:bg-teal-400 px-8 py-2 rounded shadow dark:bg-gray-800 dark:hover:bg-gray-900 text-white">Update Your Blog</button>
                </form>

                <button onClick={handleDelete} className="bg-red-600 hover:bg-red-400 px-8 py-2 rounded shadow dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-red-600 mt-2 text-white">Delete Blog</button>
            </div>
        </div>
    )
}

export default EditBlog;