import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../utils/firebase.js';

const ActivityLogs = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const logsSnapshot = await getDocs(collection(db, 'logs'));
                const logsData = logsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setLogs(logsData);
            } catch (error) {
                console.error('Error fetching logs:', error);
            }
        };

        fetchLogs();
    }, []);

    return (
        <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
            <h1 className="text-3xl font-extrabold mb-8 text-gray-800">Activity Logs</h1>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-left text-sm font-semibold text-gray-700">User</th>
                            <th className="p-4 text-left text-sm font-semibold text-gray-700">Action</th>
                            <th className="p-4 text-left text-sm font-semibold text-gray-700">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.length > 0 ? (
                            logs.map((log) => (
                                <tr key={log.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                                    <td className="p-4 text-gray-600">{log.user || 'Unknown'}</td>
                                    <td className="p-4 text-gray-600">{log.action || 'No action'}</td>
                                    <td className="p-4 text-gray-600">{new Date(log.timestamp?.toDate()).toLocaleString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="p-4 text-center text-gray-500">No logs available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ActivityLogs;
