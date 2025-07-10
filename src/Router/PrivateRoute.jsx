import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';
import Loading from '../Component/Loading/Loading';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <Loading />;

    if (!user) {
        return <Navigate to="/signUp-signIn" state={{ from: location }} replace />
    }

    return children;
};

export default PrivateRoute;