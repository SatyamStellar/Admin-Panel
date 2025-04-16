import { useState, useEffect } from 'react';
import { auth } from './firebase';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

// Login with Email/Password
export const loginWithEmail = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
};

// Register with Email/Password
export const registerWithEmail = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
};

// Logout
export const logout = async () => {
    return await signOut(auth);
};

// Custom Hook to Track Auth State
export const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Set the current user when auth state changes
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, []);

    return user; // Return the current user
};
