import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxios from "../../Hooks/useAxios";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa";

const TopScholarship = () => {
    const axios = useAxios();

    const { data: scholarships = [], isLoading, isError } = useQuery({
        queryKey: ["topScholarships"],
        queryFn: async () => {
            const res = await axios.get("/scholarships");
            return res.data;
        },
    });

    // 🔍 Filter and sort: recent + low applicationFee
    const sortedTop6 = scholarships
        .sort((a, b) => {
            return new Date(b.postedAt) - new Date(a.postedAt) || a.applicationFee - b.applicationFee;
        })
        .slice(0, 6);


    return (
        <div className="sec-gap">
            <div className="container">
                <h2 className="text-green-600 text-center text-2xl font-semibold mb-6">
                    Top Scholarships
                </h2>

                {isLoading ? (
                    <p className="text-center text-green-600">Loading top scholarships...</p>
                ) : isError ? (
                    <p className="text-center text-red-600">Failed to load top scholarships.</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sortedTop6.map((item) => (
                                <div
                                    key={item._id}
                                    className="bg-green-50 border border-green-100 p-4 rounded shadow-sm hover:shadow-md transition-all"
                                >
                                    <img
                                        src={item.logo}
                                        alt={item.universityName}
                                        className="w-full h-36 object-contain mb-3"
                                    />
                                    <h3 className="text-green-700 pb-4 md:pb-5 lg:pb-6">
                                        {item.scholarshipName}
                                    </h3>
                                    <p className="text-sm text-gray-700">
                                        <span className="font-medium">University Name:</span> {item.universityName}
                                    </p>
                                    {/* 🏷️ Scholarship Category */}
                                    <p className="text-sm text-gray-700">
                                        <span className="font-medium">Category:</span> {item.category}
                                    </p>

                                    {/* 📍 Location */}
                                    <p className="text-sm text-gray-700">
                                        <span className="font-medium">Location:</span> {item.city}, {item.country}
                                    </p>

                                    {/* 📆 Deadline */}
                                    <p className="text-sm text-gray-700">
                                        <span className="font-medium">Deadline:</span>{" "}
                                        {new Date(item.deadline).toLocaleDateString()}
                                    </p>

                                    {/* 📚 Subject */}
                                    <p className="text-sm text-gray-700">
                                        <span className="font-medium">Subject:</span> {item.subject}
                                    </p>

                                    {/* 💸 Application Fee */}
                                    <p className="text-sm text-gray-700">
                                        <span className="font-medium">Application Fee:</span> ₹{item.applicationFee}
                                    </p>

                                    {/* ⭐ Rating */}
                                    <p className="text-sm text-gray-700 flex items-center gap-1">
                                        <span className="font-medium">Rating:</span>
                                        {item.averageRating ? (
                                            <Rating
                                                readonly
                                                initialRating={item.averageRating}
                                                emptySymbol={<FaRegStar className="text-yellow-400 text-base" />}
                                                fullSymbol={<FaStar className="text-yellow-500 text-base" />}
                                            />
                                        ) : (
                                            "Not rated"
                                        )}
                                    </p>

                                    {/* 🔍 Details Button */}
                                    <div className="mt-4 text-right">
                                        <Link
                                            to={`/scholarships/${item._id}`}
                                            className="btn btn-sm bg-green-600 hover:bg-green-700 text-white"
                                        >
                                            Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 🔗 See All Button */}
                        <div className="text-center mt-8">
                            <Link
                                to="/allScholarship"
                                className="btn bg-green-600 hover:bg-green-700 text-white"
                            >
                                See All Scholarships
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TopScholarship;
