import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
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
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <div className="p-8">
          <h1 className="text-3xl font-extrabold mb-8 text-gray-800">Dashboard</h1>

          <Overview stats={stats} />

          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-6 text-gray-700">Quick Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link
                to="/users"
                className="bg-white p-6 rounded-2xl shadow-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
              >
                <h3 className="text-lg font-bold text-gray-800">Manage Users</h3>
                <p className="text-gray-600 mt-2">View, add, edit, or delete users.</p>
              </Link>
              <Link
                to="/logs"
                className="bg-white p-6 rounded-2xl shadow-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
              >
                <h3 className="text-lg font-bold text-gray-800">Activity Logs</h3>
                <p className="text-gray-600 mt-2">View recent activity and logs.</p>
              </Link>
              <Link
                to="/settings"
                className="bg-white p-6 rounded-2xl shadow-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
              >
                <h3 className="text-lg font-bold text-gray-800">Settings</h3>
                <p className="text-gray-600 mt-2">Configure admin panel settings.</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
