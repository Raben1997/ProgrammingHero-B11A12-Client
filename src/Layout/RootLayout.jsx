import React from 'react';
import Header from '../Component/Header/Header';
import Footer from '../Component/Footer/Footer';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    );
};

export default RootLayout;