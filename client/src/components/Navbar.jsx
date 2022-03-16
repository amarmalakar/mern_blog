import { Fragment, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { MenuIcon } from '@heroicons/react/outline'
import { UserContext } from '../reducer/UserContext';

const Navbar = () => {
    const [isMobNav, setIsMobNav] = useState(false);
    const userCtx = useContext(UserContext);
    const [user, setUser] = useState({});

    useEffect(() => setUser(userCtx.isUser));

    const handleTheme = () => userCtx.changeThemeApp()
    const handleMobNav = () => setIsMobNav(!isMobNav)

    const noUserNavLinks = [
        { text: 'SignUp', url: '/signup' },
        { text: 'Login', url: '/login' },
    ]

    const withUserNavLinks = [
        { text: 'Your Posts', url: `/author/${user._id}` },
        { text: 'New Post', url: '/post/new' },
        { text: 'Logout', url: '/logout' },
    ]

    const subNav = !user._id ? noUserNavLinks : withUserNavLinks;

    return (
        <Fragment>
            <nav className="bg-teal-500 p-4 flex items-center justify-between lg:px-24 dark:bg-gray-900 dark:text-gray-900">
                <div>
                    <Link to="/" className="font-serif text-lg text-teal-200 hover:text-white">MERN BLOG</Link>
                </div>

                <div className='hidden md:flex items-center space-x-4'>
                    {/* <Link to="/signup" className="font-serif text-teal-200 hover:text-white">SignUp</Link>
                    <Link to="/login" className="font-serif text-teal-200 hover:text-white">Login</Link> */}
                    {subNav.map(link => (
                        <Link key={link.url} to={link.url} className="font-serif text-teal-200 hover:text-white">{link.text}</Link>
                    ))}
                    <button
                        className='font-serif inline-block border border-teal-200 rounded px-3 py-2 hover:border-white text-teal-200 hover:text-white'
                        onClick={handleTheme}
                    >Toggle Theme</button>
                </div>

                <div className='md:hidden flex space-x-2'>
                    <button
                        className='font-serif inline-block border border-teal-200 rounded px-3 py-2 hover:border-white text-teal-200 hover:text-white'
                        onClick={handleTheme}
                    >Toggle Theme</button>
                    <button className='inline-block border border-teal-200 rounded px-3 py-2 hover:border-white text-teal-200 hover:text-white' onClick={handleMobNav}>
                        <MenuIcon className='h-5' />
                    </button>
                </div>
            </nav>

            {isMobNav && <ul className="md:hidden">
                {subNav.map(link => (
                    <li 
                        key={link.url}
                        className="bg-teal-600 px-3 py-2 font-serif text-teal-200 hover:text-white hover:bg-teal-700 dark:bg-gray-500 dark:hover:bg-gray-600"
                    >
                        <Link className='block' to={link.url}>{link.text}</Link>
                    </li>
                ))}
            </ul> }

            {/* {isMobNav && <ul className='md:hidden'>
                {!user._id ? <Fragment>
                    <li className="bg-teal-600 px-3 py-2 font-serif text-teal-200 hover:text-white hover:bg-teal-700 dark:bg-gray-500 dark:hover:bg-gray-600"><Link className='block' to="/signup">SignUp</Link></li>
                    <li className="bg-teal-600 px-3 py-2 font-serif text-teal-200 hover:text-white hover:bg-teal-700 dark:bg-gray-500 dark:hover:bg-gray-600"><Link className='block' to="/login">Login</Link></li>
                </Fragment> : 
                <Fragment></Fragment>}
            </ul>} */}
        </Fragment>
    )

    // <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Download</a>


    // <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
    //     Docs
    //   </a>
    
    // return (
    //     <div>
    //         <button className="px-4 py-2 m-2 bg-gray-200 rounded shadow hover:shadow-lg dark:bg-gray-900 dark:text-white" onClick={handleTheme}>Enable Dark Mode</button>
    //     </div>
    // )
}

export default Navbar;