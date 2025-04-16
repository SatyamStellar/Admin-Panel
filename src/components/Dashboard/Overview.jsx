const Overview = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold">Total Users</h3>
                <p className="text-2xl">{stats.totalUsers}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold">Active Users</h3>
                <p className="text-2xl">{stats.activeUsers}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold">Admins</h3>
                <p className="text-2xl">{stats.admins}</p>
            </div>
        </div>
    );
};

export default Overview;
