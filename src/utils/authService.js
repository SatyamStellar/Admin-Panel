import { useState, useEffect } from 'react';
import { auth } from './firebase';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

export const loginWithEmail = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
};

export const registerWithEmail = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
    return await signOut(auth);
};

export const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    return user;
};
