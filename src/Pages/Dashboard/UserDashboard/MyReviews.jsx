import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";

const MyReviews = () => {
    const { user } = useAuth();
    const axios = useAxiosSecure();
    const [editingReview, setEditingReview] = useState(null);
    const [updatedComment, setUpdatedComment] = useState("");
    const [updatedRating, setUpdatedRating] = useState(0);

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ["myReviews", user?.email],
        queryFn: async () => {
            const res = await axios.get(`/reviews/byUser/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
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
                Swal.fire("Deleted!", "Your review has been deleted.", "success");
                refetch();
            } catch (err) {
                Swal.fire("Error!", "Could not delete review", err);
            }
        }
    };

    const handleEdit = (review) => {
        setEditingReview(review);
        setUpdatedComment(review.comment);
        setUpdatedRating(review.rating);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const updatedReview = {
            comment: updatedComment,
            rating: updatedRating,
            date: new Date(),
        };

        try {
            await axios.put(`/reviews/${editingReview._id}`, updatedReview);
            Swal.fire("Updated!", "Review updated successfully.", "success");
            setEditingReview(null);
            refetch();
        } catch (err) {
            Swal.fire("Error!", "Could not update review", err);
        }
    };

    return (
        <>
            <h2 className="text-center text-green-600">
                My Reviews
            </h2>
            {reviews.length === 0 ? (
                <p className="text-center text-gray-500">No reviews found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra border border-green-200">
                        <thead className="bg-green-100 text-green-700">
                            <tr>
                                <th>#</th>
                                <th>Scholarship</th>
                                <th>University</th>
                                <th>Comment</th>
                                <th><span className="inline-block pr-6">Rating</span></th>
                                <th>Date</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review, idx) => (
                                <tr key={review._id}>
                                    <td>{idx + 1}</td>
                                    <td>{review.scholarshipName}</td>
                                    <td>{review.universityName}</td>
                                    <td>{review.comment}</td>
                                    <td>
                                        <Rating
                                            initialRating={review.rating}
                                            readonly
                                            emptySymbol={<FaRegStar className="text-yellow-400" />}
                                            fullSymbol={<FaStar className="text-yellow-500" />}
                                        />
                                    </td>
                                    <td>{new Date(review.date).toLocaleDateString()}</td>
                                    <td className="flex gap-2 justify-center">
                                        <button
                                            onClick={() => handleEdit(review)}
                                            className="btn btn-sm bg-green-600 hover:bg-green-700 text-white"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(review._id)}
                                            className="btn btn-sm bg-red-600 hover:bg-red-700 text-white"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {editingReview && (
                <dialog open className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg text-green-700 mb-4">
                            Edit Review
                        </h3>
                        <form onSubmit={handleUpdateSubmit} className="space-y-4">
                            <div>
                                <label className="text-green-700 font-medium block mb-1">
                                    Scholarship:
                                </label>
                                <input
                                    type="text"
                                    value={editingReview.scholarshipName}
                                    readOnly
                                    className="input input-bordered w-full bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="text-green-700 font-medium block mb-1">
                                    University:
                                </label>
                                <input
                                    type="text"
                                    value={editingReview.universityName}
                                    readOnly
                                    className="input input-bordered w-full bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="text-green-700 font-medium block mb-1">
                                    Comment:
                                </label>
                                <textarea
                                    className="textarea textarea-bordered w-full"
                                    value={updatedComment}
                                    onChange={(e) => setUpdatedComment(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-green-700 font-medium block mb-1">
                                    Rating:
                                </label>
                                <Rating
                                    initialRating={updatedRating}
                                    emptySymbol={
                                        <FaRegStar className="text-yellow-400 text-2xl cursor-pointer" />
                                    }
                                    fullSymbol={
                                        <FaStar className="text-yellow-500 text-2xl cursor-pointer" />
                                    }
                                    fractions={2}
                                    onChange={(rate) => setUpdatedRating(rate)}
                                />
                                {/* <p className="text-sm text-green-600 mt-1">
                                    Selected: {updatedRating}
                                </p> */}
                            </div>
                            <div className="modal-action">
                                <button
                                    type="submit"
                                    className="btn bg-green-600 hover:bg-green-700 text-white"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditingReview(null)}
                                    className="btn"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}
        </>
    );
};

export default MyReviews;
