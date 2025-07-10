import React from 'react';
import { links } from '../Header/Header';
import { Link } from 'react-router';
import logo from '../../assets/logo.png';
import students from './assets/students.jpg';

const Footer = () => {
    return (
        <>
            <div className="relative bg-cover bg-center bg-no-repeat sec-gap" style={{ backgroundImage: `url(${students})` }} >
                <div className="absolute inset-0 bg-primary/80 z-0"></div>
                <div className='relative z-10 container'>
                    <footer className="footer sm:footer-horizontal text-white">
                        <aside>
                            <Link><img className='max-w-[100px]' src={logo} alt="" /></Link>
                            <p className="text-sm mt-2 max-w-xs">
                                Scholarship Management System is a student-focused platform helping learners find and apply to top global scholarships with ease and confidence.
                            </p>
                        </aside>
                        <nav>
                            <h6 className="footer-title opacity-100">Services</h6>
                            <ul className='space-y-2 [&>li>a:hover]:underline'>
                                {links}
                            </ul>
                        </nav>
                        <nav>
                            <h6 className="footer-title opacity-100">Company</h6>
                            <ul className='space-y-2 [&>li>a:hover]:underline'>
                                <li><a href="#">About us</a></li>
                                <li><a href="#">Contact</a></li>
                                <li><a href="#">Jobs</a></li>
                                <li><a href="#">Press kit</a></li>
                            </ul>
                        </nav>
                        <nav>
                            <h6 className="footer-title opacity-100">Legal</h6>
                            <ul className='space-y-2 [&>li>a:hover]:underline'>
                                <li><a href="#">Terms of use</a></li>
                                <li><a href="#">Privacy policy</a></li>
                                <li><a href="#">Cookie policy</a></li>
                            </ul>
                        </nav>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default Footer;