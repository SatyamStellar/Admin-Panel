import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="bg-gray-900 text-white w-64 min-h-screen p-6 shadow-lg">
            <h2 className="text-2xl font-extrabold mb-8 text-gray-100">Admin Panel</h2>
            <nav>
                <ul className="space-y-3">
                    <li>
                        <Link
                            to="/dashboard"
                            className="block p-3 rounded-lg text-gray-200 hover:bg-gray-800 hover:text-blue-400 transition-all duration-300"
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/users"
                            className="block p-3 rounded-lg text-gray-200 hover:bg-gray-800 hover:text-blue-400 transition-all duration-300"
                        >
                            User Management
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/logs"
                            className="block p-3 rounded-lg text-gray-200 hover:bg-gray-800 hover:text-blue-400 transition-all duration-300"
                        >
                            Activity Logs
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
