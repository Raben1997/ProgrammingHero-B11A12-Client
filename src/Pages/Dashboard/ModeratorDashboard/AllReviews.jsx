import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Rating from "react-rating";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllReviews = () => {
    const axios = useAxiosSecure();

    const { data: reviews = [], refetch, isLoading, isError } = useQuery({
        queryKey: ["allReviews"],
        queryFn: async () => {
            const res = await axios.get("/reviews");
            return res.data;
        },
    });

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This review will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                await axios.delete(`/reviews/${id}`);
                Swal.fire("Deleted!", "Review deleted successfully.", "success");
                refetch();
            } catch (err) {
                Swal.fire("Error!", "Could not delete review", err);
            }
        }
    };

    if (isLoading) return <p className="text-center text-green-600">Loading reviews...</p>;
    if (isError) return <p className="text-center text-red-600">Failed to load reviews.</p>;

    return (
        <>
            <h2 className="text-center text-green-600">
                All Reviews
            </h2>

            {reviews.length === 0 ? (
                <p className="text-center text-gray-500">No reviews found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review) => (
                        <div
                            key={review._id}
                            className="bg-green-50 border border-green-100 p-4 rounded-lg shadow hover:shadow-md transition-all flex flex-col justify-between"
                        >
                            <div>
                                <h4 className="text-green-700 pb-3">
                                    {review.scholarshipName}
                                </h4>
                                <p className="!p-0 text-gray-700">
                                    <span className="font-medium">University Name:</span> {review.universityName}
                                </p>
                            </div>

                            <div className="flex items-center gap-3 my-3">
                                <img
                                    src={review.reviewerPhoto}
                                    alt={review.reviewerName}
                                    className="w-12 h-12 rounded-full object-cover border border-green-300"
                                />
                                <div>
                                    <p className="!p-0 text-green-700">{review.reviewerName}</p>
                                    <span className="text-xs text-gray-500">
                                        {new Date(review.date).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            <div className="mb-2 flex gap-2">
                                <p className="font-medium text-gray-700 !p-0">Rating:</p>
                                <Rating
                                    readonly
                                    initialRating={review.rating}
                                    fullSymbol={<span className="text-yellow-500 text-lg">★</span>}
                                    emptySymbol={<span className="text-yellow-300 text-lg">☆</span>}
                                />
                            </div>

                            <div className="mb-3">
                                <p className="text-sm text-gray-700">
                                    <span className="font-medium">Comment:</span> {review.comment}
                                </p>
                            </div>

                            <div className="text-right mt-auto">
                                <button
                                    onClick={() => handleDelete(review._id)}
                                    className="btn btn-sm bg-red-600 hover:bg-red-700 text-white"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default AllReviews;



