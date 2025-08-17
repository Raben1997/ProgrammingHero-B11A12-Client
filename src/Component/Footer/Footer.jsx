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
                        <div className='w-full'>
                            <h6 className="footer-title opacity-100">Map</h6>

                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235850.81212011125!2d88.18254112599966!3d22.535343439863773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1755411218578!5m2!1sen!2sin" className='w-full' allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default Footer;