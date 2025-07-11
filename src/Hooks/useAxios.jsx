import axios from 'axios';
import React from 'react';

const axiosInstance = axios.create({
    baseURL: `https://scholarship-management-system-serve.vercel.app`
    // baseURL: `http://localhost:3000`
});

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;