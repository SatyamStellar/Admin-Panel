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
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Activity Logs</h1>
            <table className="w-full bg-white rounded overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-2">User</th>
                        <th className="p-2">Action</th>
                        <th className="p-2">Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.length > 0 ? (
                        logs.map((log) => (
                            <tr key={log.id} className="border-b">
                                <td className="p-2">{log.user || 'Unknown'}</td>
                                <td className="p-2">{log.action || 'No action'}</td>
                                <td className="p-2">{new Date(log.timestamp?.toDate()).toLocaleString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="p-2 text-center">No logs available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ActivityLogs;
