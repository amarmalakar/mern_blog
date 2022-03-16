import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../reducer/UserContext';
import Input from '../components/Input'

const WritePost = () => {
    const navigate = useNavigate()
    const userCtx = useContext(UserContext);

    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [heading, setHeading] = useState('');
    const [post, setPost] = useState('');

    useEffect(() => {
        if (!userCtx.isUser._id) {
            navigate('/')
        }
    }, [])

    const postHandler = async (e) => {
        e.preventDefault();
        // console.log( title, slug, heading, post );
        const res = await fetch('/post/write', {
            method: 'POST',
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
            navigate('/')
        }
    }

    return (
        <div className="p-4">
            <div className='m-auto max-w-2xl p-4 shadow-lg rounded-lg'>
                <h1 className="text-teal-600 font-semibold text-xl mt-2 mb-4">Write New Post</h1>

                <form onSubmit={postHandler}>
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

                    <button className="bg-teal-600 hover:bg-teal-400 px-8 py-2 rounded shadow dark:bg-gray-800 dark:hover:bg-gray-900">Post Your Blog</button>
                </form>
            </div>
        </div>
    )
}

export default WritePost;