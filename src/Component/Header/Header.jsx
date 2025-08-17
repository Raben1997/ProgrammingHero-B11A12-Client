import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import logo from '../../assets/logo.png';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { TbLogin2 } from 'react-icons/tb';





export const links = <>
    <li><NavLink to={"/"}>Home</NavLink></li>
    <li><NavLink to={"/allScholarship"}>All Scholarship</NavLink></li>
    <li><NavLink to={"/contact"}>Contact</NavLink></li>
</>

const Header = () => {
    const [isSticky, setIsSticky] = useState(false);
    const { user, handleSignOut } = useAuth();

    const handleLogout = async () => {
        try {
            await handleSignOut();
            Swal.fire({
                icon: "success",
                title: "Logged out successfully",
                showConfirmButton: false,
                timer: 1200
            });
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Logout failed",
                text: err.message,
            });
        }
    };



    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);



    return (
        <div className={`${isSticky ? 'fixed top-0 left-0 w-full z-50 py-1' : 'py-2'} shadow-md bg-primary transition-all duration-300`}>
            <div className='container'>
                <div className="navbar !p-0">
                    <div className="navbar-start">
                        <img className='max-w-[60px]' src={logo} alt="" />
                    </div>
                    <div className="navbar-end">
                        <div className='hidden lg:flex'>
                            <ul className="menu menu-horizontal px-1 [&>li>a]:text-white [&>li>a:hover]:bg-green-600 [&>li>a.active]:bg-green-600">
                                {links}
                                {
                                    user && <li><NavLink to={"/dashboard"}>Dashboard</NavLink></li>
                                }
                            </ul>
                        </div>

                        {
                            user ? <>
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-0 shadow-none">
                                        <div className="w-10 rounded-full">
                                            <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
                                        </div>
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                        <li><a>{user.displayName}</a></li>
                                        <li><a onClick={handleLogout} >Logout</a></li>
                                    </ul>
                                </div>
                            </> : <>
                                <ul className='menu menu-horizontal px-1 [&>li>a]:text-white [&>li>a:hover]:bg-green-700 [&>li>a.active]:bg-green-600'>
                                    <li><NavLink className='md:py-2 md:px-6 max-md:w-10 max-md:h-10 max-md:rounded-full rounded-4xl font-bold cursor-pointer text-sm sm:text-base leading-relaxed max-md:flex max-md:justify-center max-md:items-center bg-green-600' to={"/signUp-signIn"}><TbLogin2 className='inline-block md:mr-2 text-xl' /><span className='max-md:hidden'>Login</span></NavLink></li>
                                </ul>
                            </>
                        }


                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost bg-green-600 border-0 shadow-none text-white lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-green-600 text-white rounded-box z-1 mt-3 w-52 p-2 shadow">
                                {links}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;