import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import { FaStar, FaRegStar } from "react-icons/fa";
import Rating from "react-rating";
import useAuth from "../Hooks/useAuth";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRef } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";



const ScholarshipDetails = () => {
    const { id } = useParams();
    const axios = useAxiosSecure();
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [ratingValue, setRatingValue] = useState(0);
    const { user } = useAuth();
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const { data: scholarship = {}, isLoading } = useQuery({
        queryKey: ["scholarshipDetails", id],
        queryFn: async () => {
            const res = await axios.get(`/scholarships/${id}`);
            return res.data;
        },
    });

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ["reviewsByScholarship", id],
        queryFn: async () => {
            const res = await axios.get(`/reviews/byScholarship/${id}`);
            return res.data;
        },
    });

    // console.log(scholarship);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const comment = form.comment.value;



        const review = {
            scholarshipId: id,
            reviewerName: user?.displayName,
            reviewerPhoto: user?.photoURL,
            reviewerEmail: user?.email,
            scholarshipName: scholarship.scholarshipName,
            universityName: scholarship.universityName,
            comment,
            rating: ratingValue,
            date: new Date(),
        };

        try {
            const res = await axios.post("/reviews", review);
            if (res.data.insertedId) {
                Swal.fire("Success", "Review submitted!", "success");
                form.reset();
                setRatingValue(0);
                setShowReviewModal(false);
                refetch();
            }
        } catch (err) {
            Swal.fire("Error", "Could not submit review", err);
        }
    };

    if (isLoading) return <p className="text-center text-green-600 !p-0">Loading...</p>;

    return (
        <div className="sec-gap container">
            <h2 className="text-center text-green-600">Scholarship Details</h2>
            {/* 🏫 Scholarship Card */}
            <div className="card lg:card-side bg-base-100 shadow-xl border border-green-600 bg-green-50">
                <figure className="p-6 w-full lg:w-1/2">
                    <img
                        src={scholarship.logo}
                        alt="University Logo"
                        className="w-full h-full object-contain max-h-[300px] rounded-xl"
                    />
                </figure>
                <div className="card-body lg:w-1/2">
                    <h3 className="text-green-600">{scholarship.scholarshipName}</h3>
                    <div className="grid sm:grid-cols-2 gap-x-2 text-sm text-gray-700">
                        <p><span className="font-semibold">University Name:</span> {scholarship.universityName}</p>
                        <p><span className="font-semibold">Category:</span> {scholarship.category}</p>
                        <p><span className="font-semibold">Location:</span> {scholarship.city}, {scholarship.country}</p>
                        <p><span className="font-semibold">Deadline:</span> {new Date(scholarship.deadline).toLocaleDateString()}</p>
                        <p><span className="font-semibold">Subject:</span> {scholarship.subject}</p>
                        <p><span className="font-semibold">Stipend:</span> {scholarship.stipend || "Not mentioned"}</p>
                        <p><span className="font-semibold">Posted:</span> {new Date(scholarship.postedAt).toLocaleDateString()}</p>
                        <p><span className="font-semibold">Application Fee:</span> ₹{scholarship.applicationFee}</p>
                        <p><span className="font-semibold">Service Charge:</span> ₹{scholarship.serviceCharge}</p>
                    </div>
                    <div className="text-gray-800">
                        <p className="font-bold">Description:</p>
                        <p className="text-sm leading-relaxed">{scholarship.description || "No description available"}</p>
                    </div>
                    <div className="card-actions justify-start mt-4">
                        <button onClick={() => setShowReviewModal(true)} className="btn bg-green-600 hover:bg-green-700 text-white">
                            Write a Review
                        </button>
                        <Link to={`/applyscholarship/${id}`}>
                            <button className="btn btn-outline border-green-600 text-green-600">
                                Apply Scholarship
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* ✅ Reviews Section */}

            {
                reviews.length > 0 && <div className="sec-gap !pb-0">
                    <div className="container">
                        {/* ✅ Section Heading */}
                        <h2 className="text-center text-green-600">
                            What Students Say About This Scholarship
                        </h2>

                        {/* ✅ Swiper Slider */}
                        <Swiper
                            modules={[Pagination, Navigation]}
                            spaceBetween={30}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                            navigation={{
                                prevEl: prevRef.current,
                                nextEl: nextRef.current,
                            }}
                            onBeforeInit={(swiper) => {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                            }}
                            grabCursor={true}
                            breakpoints={{
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                        >
                            {reviews.map((review, index) => (
                                <SwiperSlide key={index}>
                                    <div className="card bg-green-50 border border-green-100 shadow-md hover:shadow-xl transition-all h-full">
                                        <div className="card-body">
                                            {/* User Info */}
                                            <div className="flex items-center gap-4 mb-4">
                                                <img
                                                    src={review.reviewerPhoto}
                                                    alt={review.reviewerName}
                                                    className="w-16 h-16 rounded-full object-cover border-2 border-green-600"
                                                />
                                                <div>
                                                    <h4 className="text-green-700">{review.reviewerName}</h4>
                                                    <span className="text-xs text-gray-500">
                                                        {new Date(review.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Rating */}
                                            <Rating
                                                initialRating={review.rating}
                                                readonly
                                                emptySymbol={<FaRegStar className="text-gray-300 text-base" />}
                                                fullSymbol={<FaStar className="text-yellow-400 text-base" />}
                                            />

                                            {/* Comment */}
                                            <p className="text-gray-700 leading-relaxed !p-0">{review.comment}</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        {reviews.length > 3 && (
                            <div className="flex justify-center gap-4 mt-6">
                                <button ref={prevRef} className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 shadow transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                <button ref={nextRef} className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 shadow transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            }



            {/* 📝 Review Modal */}
            {showReviewModal && (
                <dialog open className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4 text-green-700">Submit Your Review</h3>
                        <form onSubmit={handleReviewSubmit} className="space-y-3">

                            <label className="block text-sm font-medium text-green-700 mb-1">Profile Photo</label>
                            <div className="flex items-center gap-4">
                                <img
                                    src={user?.photoURL}
                                    alt="User Profile"
                                    className="w-14 h-14 rounded-full object-cover border-2 border-green-600"
                                />
                            </div>
                            <label className="block text-sm font-medium text-green-700 mb-1">Your Name</label>
                            <input
                                type="text"
                                name="name"
                                value={user?.displayName}
                                readOnly
                                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                            />

                            <textarea name="comment" placeholder="Your Comment" required className="textarea textarea-bordered w-full" />

                            <div className="flex gap-2">
                                <label className="text-sm font-medium text-green-700 mb-1">Your Rating:</label>
                                <Rating
                                    emptySymbol={<FaRegStar className="text-xl text-gray-400" />}
                                    fullSymbol={<FaStar className="text-xl text-yellow-500" />}
                                    initialRating={ratingValue}
                                    onChange={(value) => setRatingValue(value)}
                                />
                            </div>

                            <div className="modal-action">
                                <button type="submit" className="btn bg-green-600 hover:bg-green-700 text-white">Submit</button>
                                <button onClick={() => setShowReviewModal(false)} className="btn">Cancel</button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default ScholarshipDetails;