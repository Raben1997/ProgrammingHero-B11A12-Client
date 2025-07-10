import { useForm } from "react-hook-form";
import { FaStar, FaRegStar } from "react-icons/fa";
import Rating from "react-rating";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";

const AddReviewModal = ({ app, onSubmit, onClose }) => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [ratingValue, setRatingValue] = useState(0);

  const handleReviewSubmit = (data) => {
    const reviewData = {
      comment: data.comment,
      rating: ratingValue,
    };
    onSubmit(app.scholarshipId, reviewData);
    reset();
    setRatingValue(0);
  };

  return (
    <dialog open className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4 text-green-700">Submit Your Review</h3>
        <form onSubmit={handleSubmit(handleReviewSubmit)} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-green-700 mb-1">Profile Photo</label>
            <img
              src={user?.photoURL}
              alt="User Profile"
              className="w-14 h-14 rounded-full border-2 border-green-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700 mb-1">Your Name</label>
            <input
              type="text"
              value={user?.displayName}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700 mb-1">Your Review</label>
            <textarea
              {...register("comment", { required: true })}
              placeholder="Write your review here..."
              className="textarea textarea-bordered w-full"
              required
            />
          </div>

          <div className="flex gap-2 items-center">
            <label className="text-sm font-medium text-green-700 mb-1">Your Rating:</label>
            <Rating
              emptySymbol={<FaRegStar className="text-xl text-gray-400" />}
              fullSymbol={<FaStar className="text-xl text-yellow-500" />}
              initialRating={ratingValue}
              onChange={(value) => setRatingValue(value)}
            />
          </div>

          <div className="modal-action">
            <button type="submit" className="btn bg-green-600 hover:bg-green-700 text-white">
              Submit
            </button>
            <button onClick={onClose} className="btn" type="button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddReviewModal;
