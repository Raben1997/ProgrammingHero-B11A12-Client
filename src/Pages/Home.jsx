import React from 'react';
import Banner from '../Component/Banner/Banner';
import TopScholarship from '../Component/TopScholarship/TopScholarship';
import { WhyChooseUs } from '../Component/WhyChooseUs/WhyChooseUs';
import { HowItWorks } from '../Component/HowItWorks/HowItWorks';

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <TopScholarship></TopScholarship>
            <WhyChooseUs></WhyChooseUs>
            <HowItWorks></HowItWorks>
        </>
    );
};

export default Home;