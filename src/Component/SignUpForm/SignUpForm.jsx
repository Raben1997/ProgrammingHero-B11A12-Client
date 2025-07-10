import Swal from "sweetalert2";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";
import { useNavigate } from 'react-router';
import useAxios from "../../Hooks/useAxios";

const SignUpForm = ({ onToggle }) => {

    const { handleUserSignUp, setUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const imageHostKey = import.meta.env.VITE_imageHostKey;
    const navigate = useNavigate();
    const axios = useAxios();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const image = form.photo.files[0];

        if (!/[A-Z]/.test(password)) {
            Swal.fire({
                icon: "error",
                title: "Password must have at least one uppercase letter.",
                showConfirmButton: false,
                timer: 1500
            });
            setLoading(false);
            return;
        } else if (!/[a-z]/.test(password)) {
            Swal.fire({
                icon: "error",
                title: "Password must have at least one lowercase letter.",
                showConfirmButton: false,
                timer: 1500
            });
            setLoading(false);
            return;
        } else if (password.length < 6) {
            Swal.fire({
                icon: "error",
                title: "Password must be at least 6 characters long.",
                showConfirmButton: false,
                timer: 1500
            });
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append("image", image);

        // console.log(name,email,image,password);
        // console.log("formdata",formData);

        try {
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
                method: "POST",
                body: formData,
            });
            const data = await res.json();

            if (data.success) {
                const photoURL = data.data.url;

                // 🔥 Firebase Auth create
                await handleUserSignUp(name, email, photoURL, password)
                    .then((result) => {
                        updateProfile(auth.currentUser, { displayName: name, photoURL })
                            .then(() => {
                                setUser(result.user);

                                // ☁️ Save to MongoDB
                                const newUser = {
                                    name,
                                    email,
                                    photoURL,
                                    role: "user",
                                    createdAt: new Date()
                                };

                                axios.post("/users", newUser)
                                    .then(() => {
                                        Swal.fire({
                                            icon: "success",
                                            title: "Registration Successful",
                                            showConfirmButton: false,
                                            timer: 1500,
                                        });
                                        navigate("/");
                                        form.reset();
                                        onToggle();
                                    })
                                    .catch((err) => {
                                        console.error("DB save error:", err);
                                        Swal.fire({
                                            icon: "warning",
                                            title: "Registered but not saved to DB!",
                                            text: "Please contact support.",
                                            timer: 1500,
                                            showConfirmButton: false
                                        });
                                    });
                            })
                            .catch(() => {
                                Swal.fire({
                                    icon: "error",
                                    title: "Failed to update profile.",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            });
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: "error",
                            title: "Failed to create account.",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    });
            } else {
                throw new Error("Image upload failed");
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Something went wrong!",
                text: err.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl shadow-xl p-8 border-t-4 border-green-600 bg-green-50">
            <h2 className="text-center text-green-600">Create Account</h2>
            <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                    <label className="block text-sm mb-1 text-green-600">Name</label>
                    <input type="text" className="w-full input input-bordered border-green-600" placeholder="Your name" name="name" required />
                </div>
                <div>
                    <label className="block text-sm mb-1 text-green-600">Profile Picture</label>
                    <input type="file" className="w-full file-input input-bordered border-green-600" placeholder="Image URL" name="photo" required />
                </div>
                <div>
                    <label className="block text-sm mb-1 text-green-600">Email</label>
                    <input type="email" className="w-full input input-bordered border-green-600" placeholder="Email address" name="email" required />
                </div>
                <div>
                    <label className="block text-sm mb-1 text-green-600">Password</label>
                    <input type="password" className="w-full input input-bordered border-green-600" placeholder="Password" name="password" required />
                </div>
                <button type="submit" className="btn bg-green-600 text-white w-full hover:bg-green-700">{loading ? "Signing up..." : "Sign Up"}</button>
            </form>
            <p className="text-center mt-4 text-sm">
                Already have an account?{" "}
                <button onClick={onToggle} className="hover:underline text-green-600 font-medium">Sign In</button>
            </p>
        </div>
    );
};

export default SignUpForm;
