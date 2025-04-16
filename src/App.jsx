import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './pages/Dashboard';
import UserManagement from './components/Dashboard/UserManagement';
import ActivityLogs from './components/Dashboard/ActivityLogs';
import NotFound from './pages/NotFound';
import { auth } from './utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';

// A component to protect routes for authenticated users
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    // Redirect to login, preserving the intended URL
    return <Navigate to="/login" state={{ from: window.location.pathname }} replace />;
  }
  return children;
};

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false); // Set loading to false once auth state is resolved
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Show a loading indicator while checking auth state
  if (isLoading) {
    return <div>Loading...</div>; // Replace with a proper loading component
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Routes for unauthenticated users */}
        {!user ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Redirect all other routes to /login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            {/* Routes for authenticated users */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute user={user}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute user={user}>
                  <UserManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/logs"
              element={
                <ProtectedRoute user={user}>
                  <ActivityLogs />
                </ProtectedRoute>
              }
            />
            {/* Redirect / and /login to /dashboard for authenticated users */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Navigate to="/dashboard" replace />} />
            <Route path="/register" element={<Navigate to="/dashboard" replace />} />
            {/* Fallback for unknown routes */}
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
