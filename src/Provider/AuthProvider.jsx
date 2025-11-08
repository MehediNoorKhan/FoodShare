import React, { useEffect, useState } from "react";
import auth from "../Firebase/firebase.init.js";
import axios from "axios";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import AuthContext from "./AuthContext.jsx";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    // Register new user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Login user
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Google Sign-In
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // Logout
    const logout = () => {
        setLoading(true);
        return signOut(auth);
    };

    // ✅ Fetch only the logged-in user's data
    // Retry version of fetching user data
    const fetchLoggedInUser = async (email, retries = 3, delay = 1000) => {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await axios.get(`http://localhost:5000/users/${email}`);
                if (response.data) {
                    setUserData(response.data);
                    setLoading(false); // ✅ Stop loading here
                    return;
                }
            } catch (error) {
                if (i === retries - 1) {
                    console.error("User not found after retries:", error);
                    setUserData(null);
                    setLoading(false); // ✅ Stop loading even if failed
                } else {
                    await new Promise((resolve) => setTimeout(resolve, delay));
                }
            }
        }
    };



    // Observe auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            if (currentUser?.email) {
                fetchLoggedInUser(currentUser.email);
            } else {
                setUserData(null);
                setLoading(false); // ✅ Important
            }
        });

        return () => unsubscribe();
    }, []);




    const authInfo = {
        user,
        userData,
        loading,
        createUser,
        login,
        logout,
        googleSignIn,
        setUser,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
