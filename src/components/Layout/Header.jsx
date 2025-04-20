import { useAuth, logout } from '../../utils/authService';

const Header = () => {
    const user = useAuth();

    return (
        <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-5 flex justify-between items-center shadow-lg">
            <h1 className="text-xl font-extrabold text-gray-100">Welcome, {user?.email || 'Guest'}</h1>
            <button
                onClick={logout}
                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 font-semibold"
            >
                Logout
            </button>
        </header>
    );
};

export default Header;
