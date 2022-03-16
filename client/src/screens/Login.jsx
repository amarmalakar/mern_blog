import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { UserContext } from '../reducer/UserContext';

const Login = () => {
    const navigate = useNavigate()
    const userCtx = useContext(UserContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const res = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });
        const data = await res.json();
        setIsLoading(false)

        if (!data.success) {
            window.alert(data.message);
        } else {
            // console.log(data);
            userCtx.loginHandler(data)
            window.alert(data.message)
            navigate('/')
        }
    }

    return (
        <div className="p-2">
            <div className="mt-12 max-w-md m-auto py-4 px-6 border rounded-lg shadow">
                <h1 className="text-2xl font-semibold mb-4 text-teal-600 dark:text-teal-200">Login</h1>

                <form onSubmit={handleLogin}>
                    <Input label="User Email" data={{
                        id: 'email',
                        type: 'email',
                        placeholder: 'user @email',
                        value: email,
                        onChange: e => setEmail(e.target.value)
                    }} />
                    <Input label="Password" data={{
                        id: 'password',
                        type: 'password',
                        placeholder: '*************',
                        value: password,
                        onChange: e => setPassword(e.target.value)
                    }} />
                    <button
                        className="bg-teal-600 hover:bg-teal-400 px-8 py-2 rounded shadow dark:bg-gray-800 dark:hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >Login{isLoading ? '...' : ''}</button>
                </form>

            </div>
        </div>
    )
}

export default Login;