import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";
import useAxios from "../Hooks/useAxios";
import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";


const AllScholarship = () => {
    const axios = useAxios();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const { data: scholarships = [], isLoading, isError } = useQuery({
        queryKey: ["scholarships"],
        queryFn: async () => {
            const res = await axios.get("/scholarships");
            return res.data;
        },
    });

    // 🔍 Search logic
    const handleSearch = () => {
        if (!searchTerm.trim()) {
            Swal.fire("Oops!", "Search term cannot be empty.", "warning");
            return;
        }

        const filtered = scholarships.filter((s) =>
            s.scholarshipName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.universityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.degree.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredData(filtered);
        setCurrentPage(1);
    };

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredData(null);
        }
    }, [searchTerm]);

    const dataToShow = filteredData !== null ? filteredData : scholarships;
    const totalPages = Math.ceil(dataToShow.length / itemsPerPage);
    const paginatedData = dataToShow.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    return (
        <div className="sec-gap">
            <div className="container">
                <h2 className="text-green-600 text-center text-2xl font-semibold mb-6">
                    All Scholarships
                </h2>

                {/* Search and Per Page Control */}
                <div className="flex flex-col gap-4 sm:flex-row md:items-center md:justify-between mb-6">

                    {/* 🔍 Search Box */}
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Search by Name, University or Degree"
                            className="input input-sm input-bordered border-green-600 w-full sm:w-80 max-w-1/2"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            className="btn btn-sm bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto max-w-1/2"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>

                    {/* 🔢 Items Per Page */}
                    <div className="flex items-center max-sm:justify-start gap-2">
                        <label className="text-green-700 font-medium whitespace-nowrap">
                            Items per page:
                        </label>
                        <select
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                            className="select select-sm select-bordered border-green-600 min-w-16 max-sm:max-w-16"
                        >
                            {[3, 6, 9, 12, 15, 18, 21, 24].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>


                {/* Loader/Error/Empty */}
                {isLoading ? (
                    <p className="text-center text-green-600">Loading scholarships...</p>
                ) : isError ? (
                    <p className="text-center text-red-600">Failed to load scholarships.</p>
                ) : paginatedData.length === 0 ? (
                    <div className="text-center text-gray-500">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/7486/7486800.png"
                            alt="No Data"
                            className="w-40 mx-auto mb-4"
                        />
                        <p>No scholarships found!</p>
                    </div>
                ) : (
                    <>
                        {/* Card Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedData.map((item) => (
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

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center mt-8 gap-4">
                                <button
                                    onClick={handlePrev}
                                    disabled={currentPage === 1}
                                    className="btn btn-sm border-green-600 text-green-600 bg-green-50 hover:bg-green-100"
                                >
                                    Previous
                                </button>
                                <span className="text-green-600 font-medium">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={handleNext}
                                    disabled={currentPage === totalPages}
                                    className="btn btn-sm border-green-600 text-green-600 bg-green-50 hover:bg-green-100"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AllScholarship;
