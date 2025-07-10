import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
    const [showButton, setShowButton] = useState(false);
    const [scrollPercent, setScrollPercent] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (scrollTop / docHeight) * 100;

            setScrollPercent(Math.round(scrolled));
            setShowButton(scrollTop > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        showButton && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-5 right-5 z-50 flex flex-col items-center justify-center gap-1 p-3 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg w-16 h-16 transition-all duration-300 cursor-pointer"
                aria-label="Scroll to top"
            >
                <FaArrowUp className="text-lg" />
                <span className="text-xs">{scrollPercent}%</span>
            </button>
        )
    );
};

export default ScrollToTop;
