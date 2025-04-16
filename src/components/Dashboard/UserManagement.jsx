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

    // Fetch users from Firestore
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

    // Handle user deletion
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

    // Handle user role update
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

    // Filter users based on search term
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">User Management</h1>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
            />

            {/* Add/Edit User Form */}
            {editingUser && (
                <div className="bg-white p-4 rounded shadow mb-4">
                    <h3 className="text-lg font-bold mb-2">
                        {editingUser.id ? 'Edit User' : 'Add User'}
                    </h3>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            // Save logic here (optional)
                        }}
                        className="space-y-4"
                    >
                        <input
                            type="text"
                            placeholder="Name"
                            defaultValue={editingUser.name || ''}
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            defaultValue={editingUser.email || ''}
                            className="w-full p-2 border rounded"
                        />
                        <select
                            defaultValue={editingUser.role || 'user'}
                            className="w-full p-2 border rounded"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditingUser(null)}
                            className="w-full bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}

            {/* User Table */}
            <table className="w-full bg-white rounded overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-2">Name</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Role</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b">
                            <td className="p-2">{user.name}</td>
                            <td className="p-2">{user.email}</td>
                            <td className="p-2">
                                <select
                                    value={user.role}
                                    onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                                    className="p-1 border rounded"
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </td>
                            <td className="p-2 space-x-2">
                                <button
                                    onClick={() => setEditingUser(user)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
