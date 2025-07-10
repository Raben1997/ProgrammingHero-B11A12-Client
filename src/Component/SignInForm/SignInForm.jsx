import { useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import SignInWithGoogle from "../SignInWithGoogle/SignInWithGoogle";
import { useState } from "react";
import Swal from "sweetalert2";

const SignInForm = ({ onToggle }) => {
    const { handleSignIn } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            await handleSignIn(email, password);
            Swal.fire({
                icon: "success",
                title: "Login successful!",
                showConfirmButton: false,
                timer: 1500,
            });
            form.reset();
            navigate(from, { replace: true });
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Login failed",
                text: err.message,
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="absolute inset-0 backface-hidden rounded-xl shadow-xl p-8 border-t-4 border-green-600 bg-green-50">
            <h2 className="text-center text-green-600">Login to Your Account</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="block text-sm mb-1 text-green-600">Email</label>
                    <input type="email" className="w-full input input-bordered border-green-600" placeholder="Email address" name="email" required />
                </div>
                <div>
                    <label className="block text-sm mb-1 text-green-600">Password</label>
                    <input type="password" className="w-full input input-bordered border-green-600" placeholder="Password" name="password" required />
                </div>
                <button type="submit" className="btn bg-green-600 text-white w-full hover:bg-green-700">{loading ? "Signing in..." : "Sign In"}</button>
            </form>
            <SignInWithGoogle></SignInWithGoogle>
            <p className="text-center mt-4 text-sm ">
                Don’t have an account?{" "}
                <button onClick={onToggle} className="hover:underline text-green-600 font-medium">Sign Up</button>
            </p>
        </div>
    );
};

export default SignInForm;
