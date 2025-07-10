import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import useAuth from '../../Hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxios from '../../Hooks/useAxios';

const SignInWithGoogle = () => {

    const { handleSignInWithGoogle } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const axios = useAxios();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";



    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const result = await handleSignInWithGoogle();
            const loggedUser = result.user;

            const newUser = {
                name: loggedUser.displayName,
                email: loggedUser.email,
                photoURL: loggedUser.photoURL,
                role: "user",
                createdAt: new Date()
            };

            await axios.post("/users", newUser);

            Swal.fire({
                icon: "success",
                title: "Logged in with Google!",
                showConfirmButton: false,
                timer: 1500,
            });

            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Google Sign In Failed",
                text: error.message,
            });
        } finally {
            setLoading(false);
        }
    };





    return (
        <button onClick={handleGoogleLogin} className="mt-4 flex items-center justify-center w-full border border-green-600 rounded py-2 gap-2 hover:bg-green-100 transition text-green-600">
            <FcGoogle size={20} /> {loading ? "Signing in..." : "Login with Google"}
        </button>
    );
};

export default SignInWithGoogle;