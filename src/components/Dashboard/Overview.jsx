const Overview = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg transform transition-all hover:scale-105">
                <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
                <p className="text-3xl font-bold text-gray-800">{stats.totalUsers}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg transform transition-all hover:scale-105">
                <h3 className="text-lg font-semibold text-gray-700">Active Users</h3>
                <p className="text-3xl font-bold text-gray-800">{stats.activeUsers}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg transform transition-all hover:scale-105">
                <h3 className="text-lg font-semibold text-gray-700">Admins</h3>
                <p className="text-3xl font-bold text-gray-800">{stats.admins}</p>
            </div>
        </div>
    );
};

export default Overview;
