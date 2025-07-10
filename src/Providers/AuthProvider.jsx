import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import Swal from 'sweetalert2';
import Loading from '../Component/Loading/Loading';



export const authContextData = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dataloading, setDataLoading] = useState(true);



    const handleUserSignUp = (name, email, photourl, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }


    const handleSignIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const handleSignInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }


    const handleSignOut = () => {
        return signOut(auth);
    }



    const contextValue = {
        handleUserSignUp,
        handleSignIn,
        handleSignInWithGoogle,
        handleSignOut,
        user,
        setUser,
        loading,
        setLoading,
        dataloading,
        setDataLoading
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const token = await currentUser.getIdToken();
                currentUser.accessToken = token;
                setUser(currentUser);
                // console.log(currentUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);


    if (loading) {
        return <Loading></Loading>;
    }


    return <authContextData.Provider value={contextValue}>{children}</authContextData.Provider>;
};

export default AuthProvider;