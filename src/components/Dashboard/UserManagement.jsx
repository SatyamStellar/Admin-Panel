import { useState, useEffect } from 'react';
import {
    collection,
    getDocs,
    query,
    where,
    doc,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';
import { db } from '../../utils/firebase.js';
import toast from 'react-hot-toast';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersSnapshot = await getDocs(collection(db, 'users'));
                const usersData = usersSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setUsers(usersData);
            } catch (error) {
                toast.error('Failed to fetch users.');
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteDoc(doc(db, 'users', id));
                setUsers(users.filter((user) => user.id !== id));
                toast.success('User deleted successfully!');
            } catch (error) {
                toast.error('Failed to delete user.');
            }
        }
    };

    const handleUpdateRole = async (id, newRole) => {
        try {
            await updateDoc(doc(db, 'users', id), { role: newRole });
            setUsers(
                users.map((user) =>
                    user.id === id ? { ...user, role: newRole } : user
                )
            );
            toast.success('User role updated successfully!');
        } catch (error) {
            toast.error('Failed to update user role.');
        }
    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
            <h1 className="text-3xl font-extrabold mb-8 text-gray-800">User Management</h1>

            <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            {editingUser && (
                <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
                    <h3 className="text-xl font-bold mb-4 text-gray-800">
                        {editingUser.id ? 'Edit User' : 'Add User'}
                    </h3>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                        className="space-y-4"
                    >
                        <input
                            type="text"
                            placeholder="Name"
                            defaultValue={editingUser.name || ''}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            defaultValue={editingUser.email || ''}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                        <select
                            defaultValue={editingUser.role || 'user'}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditingUser(null)}
                            className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300 font-semibold"
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-left text-sm font-semibold text-gray-700">Name</th>
                            <th className="p-4 text-left text-sm font-semibold text-gray-700">Email</th>
                            <th className="p-4 text-left text-sm font-semibold text-gray-700">Role</th>
                            <th className="p-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                                <td className="p-4 text-gray-600">{user.name}</td>
                                <td className="p-4 text-gray-600">{user.email}</td>
                                <td className="p-4">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className="p-4 space-x-2">
                                    <button
                                        onClick={() => setEditingUser(user)}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
