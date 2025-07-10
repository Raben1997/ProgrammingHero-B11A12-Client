import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import useUserRole from '../../../Hooks/useUserRole';

const RoleBasedRedirect = () => {
    const { user } = useAuth();
    const email = user?.email?.toLowerCase();
    const { role, isLoading } = useUserRole(email);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && role) {
            const lowerRole = role.toLowerCase();

            if (lowerRole === 'admin') {
                navigate('/dashboard/admin/my-profile');
            } else if (lowerRole === 'moderator') {
                navigate('/dashboard/moderator/my-profile');
            } else {
                navigate('/dashboard/user/my-profile');
            }
        }
    }, [role, isLoading, navigate]);

    return null;
};

export default RoleBasedRedirect;
