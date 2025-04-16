import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../utils/firebase';
import Sidebar from '../components/Layout/Sidebar';
import Header from '../components/Layout/Header';
import Overview from '../components/Dashboard/Overview';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0, admins: 0 });

  // Fetch dashboard statistics
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const users = usersSnapshot.docs.map((doc) => doc.data());
        const totalUsers = users.length;
        const activeUsers = users.filter((user) => user.status === 'active').length;
        const admins = users.filter((user) => user.role === 'admin').length;

        setStats({ totalUsers, activeUsers, admins });
      } catch (error) {
        toast.error('Failed to fetch dashboard data.');
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Dashboard Content */}
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

          {/* Overview Section */}
          <Overview stats={stats} />

          {/* Quick Links */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                to="/users"
                className="bg-white p-4 rounded shadow hover:bg-gray-50 transition"
              >
                <h3 className="text-lg font-bold">Manage Users</h3>
                <p className="text-gray-600">View, add, edit, or delete users.</p>
              </Link>
              <Link
                to="/logs"
                className="bg-white p-4 rounded shadow hover:bg-gray-50 transition"
              >
                <h3 className="text-lg font-bold">Activity Logs</h3>
                <p className="text-gray-600">View recent activity and logs.</p>
              </Link>
              <Link
                to="/settings"
                className="bg-white p-4 rounded shadow hover:bg-gray-50 transition"
              >
                <h3 className="text-lg font-bold">Settings</h3>
                <p className="text-gray-600">Configure admin panel settings.</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
