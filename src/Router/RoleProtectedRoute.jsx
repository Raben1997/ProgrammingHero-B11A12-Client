import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';
import Loading from '../Component/Loading/Loading';

const RoleProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();
    const { role, isLoading } = useUserRole(user?.email);
    const location = useLocation();

    if (loading || isLoading) return <Loading />;

    if (!user) {
        return <Navigate to="/signUp-signIn" state={{ from: location }} replace />;
    }

    if (!allowedRoles.includes(role?.toLowerCase())) {
        // 🔁 Redirect to role-based dashboard
        if (role === 'admin') return <Navigate to="/dashboard/admin" replace />;
        else if (role === 'moderator') return <Navigate to="/dashboard/moderator" replace />;
        else return <Navigate to="/dashboard/user" replace />;
    }

    return children;
};

export default RoleProtectedRoute;
