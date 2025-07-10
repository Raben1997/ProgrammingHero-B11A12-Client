import React from "react";

const FeedbackModal = ({ isOpen, feedback, setFeedback, onSubmit, onClose, applicantName }) => {
    if (!isOpen) return null;

    return (
        <dialog open className="modal modal-open">
            <form method="dialog" className="modal-backdrop  bg-opacity-10" onClick={onClose}>
                <button type="button">close</button>
            </form>

            <div
                className="modal-box w-full max-w-md p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="font-bold text-lg mb-4 text-green-700 text-center">
                    Submit Feedback for {applicantName || "Applicant"}
                </h3>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                    }}
                    className="space-y-4"
                >
                    <div>
                        <label className="block text-sm font-medium text-green-700 mb-2">
                            Your Feedback
                        </label>
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            placeholder="Write your feedback here..."
                            className="textarea textarea-bordered w-full h-32"
                            required
                        ></textarea>
                    </div>

                    <div className="modal-action">
                        <button
                            type="submit"
                            className="btn bg-green-600 text-white hover:bg-green-700"
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn bg-gray-400 text-white hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default FeedbackModal;
