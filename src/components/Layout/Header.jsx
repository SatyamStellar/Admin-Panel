import { useAuth } from '../../utils/authService';
import { logout } from '../../utils/authService';

const Header = () => {
    const user = useAuth();

    return (
        <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
            <h1 className="text-lg font-bold">Welcome, {user?.email}</h1>
            <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
                Logout
            </button>
        </header>
    );
};

export default Header;
