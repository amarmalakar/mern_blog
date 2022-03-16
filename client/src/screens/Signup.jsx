import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";

const Signup = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const res = await fetch('/auth/signup', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, password, confirmPassword
            })
        });
        const data = await res.json();
        setIsLoading(true)
        
        if (!data.success) {
            window.alert(data.message)
        } else {
            window.alert(data.message)
            navigate('/login')
        }
    }

    return (
        <div className="p-2">
            <div className="mt-6 max-w-md m-auto py-4 px-6 border rounded-lg shadow">
                <h1 className="text-2xl font-semibold mb-4 text-teal-600 dark:text-teal-200">Signup</h1>

                <form onSubmit={handleSignup}>
                    <Input label="Name:" data={{
                        id: 'name',
                        type: 'text',
                        placeholder: 'Your Name',
                        value: name,
                        onChange: e => setName(e.target.value)
                    }} />

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

                    <Input label="Confirm Password" data={{
                        id: 'confirmPassword',
                        type: 'password',
                        placeholder: '*************',
                        value: confirmPassword,
                        onChange: e => setConfirmPassword(e.target.value)
                    }} />

                    <button 
                        className="bg-teal-600 hover:bg-teal-400 px-8 py-2 rounded shadow dark:bg-gray-800 dark:hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >Signup{isLoading ? '...' : ''}</button>
                </form>

            </div>
        </div>
    )
}

export default Signup;