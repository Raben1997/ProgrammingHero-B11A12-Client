import React from "react";

const ApplicationDetailsModal = ({ app, onClose }) => {
    if (!app) return null;

    return (
        <dialog className="modal modal-open">
            <div
                className="modal-box w-full max-w-2xl"
                onClick={(e) => e.stopPropagation()} // prevent bubbling
            >
                <h3 className="font-bold text-xl text-green-600 text-center mb-4">
                    Application Details
                </h3>

                {/* Applicant Photo */}
                <div className="flex justify-center mb-4">
                    <img
                        src={app.applicantPhoto}
                        alt="Applicant"
                        className="w-24 h-24 rounded-full border-4 border-green-500"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 text-sm text-gray-800">
                    {/* Applicant Info */}
                    <p><strong>Name:</strong> {app.userName}</p>
                    <p><strong>Email:</strong> {app.userEmail}</p>
                    <p><strong>Phone:</strong> {app.phone}</p>
                    <p><strong>Gender:</strong> {app.gender}</p>

                    {/* Academic Info */}
                    <p><strong>SSC Result:</strong> {app.sscResult}%</p>
                    <p><strong>HSC Result:</strong> {app.hscResult}%</p>
                    <p><strong>Degree:</strong> {app.degree}</p>
                    <p><strong>Study Gap:</strong> {app.studyGap}</p>

                    {/* Scholarship Info */}
                    <p><strong>Scholarship Name:</strong> {app.scholarshipName}</p>
                    <p><strong>University:</strong> {app.universityName}</p>
                    <p><strong>Address:</strong> {app.address}</p>
                    <p><strong>Subject:</strong> {app.subjectCategory}</p>
                    <p><strong>Scholarship Type:</strong> {app.scholarshipCategory}</p>

                    {/* Application Info */}
                    <p><strong>Applied At:</strong> {new Date(app.appliedAt).toLocaleString()}</p>
                    <p><strong>Status:</strong> {app.status}</p>
                    <p><strong>Feedback:</strong> {app.feedback || "No Feedback"}</p>

                    {/* Payment Info */}
                    <p><strong>Application Fee:</strong> ₹{app.applicationFee}</p>
                    <p><strong>Service Charge:</strong> ₹{(parseFloat(app.applicationFee) * 0.05).toFixed(2)}</p>
                    <p><strong>Payment Status:</strong> {app.paymentStatus}</p>
                    {app.paymentStatus === "paid" && (
                        <>
                            <p><strong>Transaction ID:</strong> {app.transactionId}</p>
                            <p><strong>Payment Date:</strong> {new Date(app.paymentDate).toLocaleString()}</p>
                        </>
                    )}
                </div>

                <div className="modal-action">
                    <form method="dialog">
                        <button onClick={onClose} className="btn btn-error btn-sm">
                            Close
                        </button>
                    </form>
                </div>
            </div>

            {/* overlay click = close */}
            <form method="dialog" className="modal-backdrop" onClick={onClose}>
                <button>close</button>
            </form>
        </dialog>
    );
};

export default ApplicationDetailsModal;
