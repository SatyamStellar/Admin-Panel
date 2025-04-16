import { useState } from 'react';
import { registerWithEmail } from '../../utils/authService';
import toast from 'react-hot-toast';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        console.log('Register button clicked'); // Debugging line
        try {

            await registerWithEmail(email, password);
            toast.success('Account created successfully!');
        } catch (error) {
            console.error('Error during registration:', error); // Debugging line
            toast.error(error.message || 'Failed to create account.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />
                <button
                    onClick={handleRegister}
                    className="w-full py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default Register;
