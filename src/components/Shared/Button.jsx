import { logout } from '../utils/authService';
import toast from 'react-hot-toast';

const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            await logout();
            toast.success('Logged out successfully!');
        } catch (error) {
            toast.error('Failed to log out.');
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
