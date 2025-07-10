import React from "react";
import { Link } from "react-router";
import { FaLock } from "react-icons/fa";

const Forbidden = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-center px-4">
            <FaLock className="text-red-500 text-6xl mb-4" />
            <h1 className="text-4xl font-bold text-red-600 mb-2">403 - Forbidden</h1>
            <p className="text-gray-600 mb-6">
                Sorry, you don't have permission to access this page.
            </p>
            <Link to="/" className="btn bg-primary text-white hover:bg-primary/90">
                Go to Home
            </Link>
        </div>
    );
};

export default Forbidden;
