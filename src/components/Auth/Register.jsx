import { useState } from 'react';
import { registerWithEmail } from '../../utils/authService';
import toast from 'react-hot-toast';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        console.log('Register button clicked');
        try {
            await registerWithEmail(email, password);
            toast.success('Account created successfully!');
        } catch (error) {
            console.error('Error during registration:', error);
            toast.error(error.message || 'Failed to create account.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
            <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md transform transition-all hover:scale-105">
                <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">Create Account</h2>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <button
                    onClick={handleRegister}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold"
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default Register;
