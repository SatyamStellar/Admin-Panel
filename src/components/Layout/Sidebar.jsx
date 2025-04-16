import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
            <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
            <nav>
                <ul>
                    <li className="mb-2">
                        <Link to="/dashboard" className="hover:text-blue-400">
                            Dashboard
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/users" className="hover:text-blue-400">
                            User Management
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/logs" className="hover:text-blue-400">
                            Activity Logs
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
