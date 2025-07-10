import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: `http://localhost:3000`
});

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.accessToken) return;

        const requestInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                config.headers.Authorization = `Bearer ${user.accessToken}`;
                console.log(user.accessToken);
                console.log('✅ Auth Header Set:', config.headers.Authorization);
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axiosSecure.interceptors.response.use(
            (res) => res,
            async (error) => {
                const status = error?.response?.status;
                console.log('Inside Res Interceptor', status);

                if (status === 403) {
                    navigate('/forbidden');
                } else if (status === 401) {
                    try {
                        await logOut();
                        navigate('/signUp-signIn');
                    } catch (logoutError) {
                        console.error('Logout failed:', logoutError);
                    }
                }

                return Promise.reject(error);
            }
        );

        // cleanup: remove interceptor if component unmounts
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [user?.accessToken]);

    return axiosSecure;
};

export default useAxiosSecure;
