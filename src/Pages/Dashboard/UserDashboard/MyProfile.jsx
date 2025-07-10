import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Component/Loading/Loading';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const MyProfile = () => {
    const { user } = useAuth();
    const axios = useAxiosSecure();

    const { data: userData, isLoading } = useQuery({
        queryKey: ['user-data', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(`/users/role/${user.email}`);
            return res.data;
        }
    });

    // console.log(userData);

    if (isLoading) return <Loading />;

    return (
        <div className="flex justify-center items-center min-h-[70vh] p-6">
            <div className="bg-green-50 shadow-lg rounded-xl p-8 max-w-md w-full border-t-4 border-green-600">
                <div className="flex flex-col items-center">
                    <img
                        src={user?.photoURL}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-green-400 object-cover mb-6"
                    />
                    <h2 className="text-center text-green-600">{user?.displayName}</h2>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                    {
                        userData?.role !== 'user' &&
                        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs uppercase font-medium">
                            {userData?.role}
                        </span>
                    }
                </div>

                <div className="mt-6">
                    <p className="text-center text-sm text-gray-700"><strong>Account Created: {user?.metadata?.creationTime
                        ? new Date(user.metadata.creationTime).toLocaleString()
                        : 'N/A'}</strong></p>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;

