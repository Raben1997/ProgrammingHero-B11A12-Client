import React from 'react';
import { Link } from 'react-router';


const NotFound = () => {
    return (
        <div className="flex items-center justify-center sec-gap">
            <div className="text-center container">
                <h1 className="text-red-500 max-sm:!text-[60px] !text-[100px] mb-4 max-sm:mb-0">404</h1>
                <p className="mb-6">Oops! The page you're looking for doesn't exist.</p>
                <Link to="/" className="bg-primary text-white px-4 py-2 rounded hover:bg-green-600 transition inline-block" >Back to Home</Link>
            </div>
        </div>
    );
};

export default NotFound;