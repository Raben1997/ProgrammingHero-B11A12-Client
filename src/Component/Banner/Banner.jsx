import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const banners = [
    {
        id: 1,
        image: "https://i.ibb.co/DSCNZN3/1.png",
        title: "Find Your Dream Scholarship",
        subtitle: "Explore thousands of opportunities worldwide."
    },
    {
        id: 2,
        image: "https://i.ibb.co/wrKH4zqX/3.png",
        title: "Achieve Academic Excellence",
        subtitle: "Apply to top global institutions with ease."
    },
    {
        id: 3,
        image: "https://i.ibb.co/Ndvd7F3j/2.png",
        title: "Education is Empowerment",
        subtitle: "Unlock your future with the right scholarship."
    }
];

const Banner = () => {
    return (
        <div className="w-full h-[60vh] md:h-[75vh]">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                modules={[Autoplay, Pagination]}
                className="w-full h-full"
            >
                {banners.map(({ id, image, title, subtitle }) => (
                    <SwiperSlide key={id}>
                        <div
                            className="w-full h-full bg-contain bg-no-repeat bg-center flex items-center justify-center text-white px-6"
                            style={{ backgroundImage: `url(${image})` }}
                        >
                            <div className="bg-black/50 p-6 rounded-xl text-center max-w-2xl">
                                <h2>{title}</h2>
                                <p>{subtitle}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};


export default Banner;
