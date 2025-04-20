import { useState } from 'react';
import { loginWithEmail } from '../../utils/authService';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            toast.error('Email and password are required.');
            return;
        }

        try {
            await loginWithEmail(email, password);
            toast.success('Logged in successfully!');
        } catch (error) {
            console.error('Full error:', error);
            if (error.code === 'auth/user-not-found') {
                toast.error('User not found. Please register.');
            } else if (error.code === 'auth/wrong-password') {
                toast.error('Incorrect password.');
            } else {
                toast.error(error.message || 'Invalid credentials.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
            <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md transform transition-all hover:scale-105">
                <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">Sign In</h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-blue-600 hover:text-blue-800 transition font-medium">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
