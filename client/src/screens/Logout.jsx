import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../reducer/UserContext'

const Logout = () => {
    const navigate = useNavigate()
    const userCtx = useContext(UserContext);
    // console.log(userCtx.isUser._id);

    

    const logout = async () => {
        const res = await fetch('/auth/logout', {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })

        await res.json()
        userCtx.logoutHandler();
        window.alert('User Successfully Logout...');
        navigate('/')
    }
    useEffect(() => {
        if (!userCtx.isUser._id) {
            navigate('/login')
        } else {
            logout()
        }
    }, [ ])

    return (
        <div className='p-12 text-xl'>Logout...</div>
    )
}

export default Logout