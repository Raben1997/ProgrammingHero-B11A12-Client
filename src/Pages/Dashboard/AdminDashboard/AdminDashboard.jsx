import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import logo from '../../../assets/logo.png';

const AdminDashboard = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Top Navbar (Mobile) */}
                <div className='max-lg:bg-primary'>
                    <div className='container'>
                        <div className="max-lg:navbar max-lg:w-full text-white justify-between !px-0 !py-3 lg:!py-0">
                            <div className="flex-none lg:hidden">
                                <Link to={"/"}>
                                    <img src={logo} className="max-w-[80px] inline-block" alt="Logo" />
                                </Link>
                            </div>
                            <div className="flex-none lg:hidden">
                                <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost text-white !bg-primary border-0 shadow-none">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        className="inline-block h-6 w-6 stroke-current"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        ></path>
                                    </svg>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <div className="container sec-gap">
                    <Outlet></Outlet>
                </div>
            </div>

            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-primary text-white min-h-full w-80 p-4 space-y-1">
                    {/* Logo */}
                    <div className="mb-5 text-center">
                        <Link to={"/"}>
                            <img src={logo} className="max-w-[160px] inline-block" alt="Logo" />
                        </Link>
                    </div>

                    {/* Sidebar Links */}
                    <li>
                        <NavLink
                            to="/dashboard/admin/overview"
                            className={({ isActive }) => isActive ? 'bg-green-600 text-white font-semibold' : ''}
                        >Overview</NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/admin/my-profile"
                            className={({ isActive }) => isActive ? 'bg-green-600 text-white font-semibold' : ''}
                        >Admin Profile</NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/admin/addScholarship"
                            className={({ isActive }) => isActive ? 'bg-green-600 text-white font-semibold' : ''}
                        >Add Scholarship</NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/admin/manageScholarships"
                            className={({ isActive }) => isActive ? 'bg-green-600 text-white font-semibold' : ''}
                        >Manage Scholarship</NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/admin/manageAppliedApplication"
                            className={({ isActive }) => isActive ? 'bg-green-600 text-white font-semibold' : ''}
                        >Manage Applied Application</NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/admin/manageUsers"
                            className={({ isActive }) => isActive ? 'bg-green-600 text-white font-semibold' : ''}
                        >Manage Users</NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/dashboard/admin/manageReview"
                            className={({ isActive }) => isActive ? 'bg-green-600 text-white font-semibold' : ''}
                        >Manage Review</NavLink>
                    </li>                    
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;