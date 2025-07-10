import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaEdit, FaEye, FaTrash, FaStar } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import ApplicationDetailsModal from "../../../Component/ApplicationDetailsModal/ApplicationDetailsModal";
import EditApplicationModal from "../../../Component/EditApplicationModal/EditApplicationModal";
import AddReviewModal from "../../../Component/AddReviewModal/AddReviewModal";
import { useNavigate } from "react-router";

const MyApplications = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [selectedApp, setSelectedApp] = useState(null);
    const [modalType, setModalType] = useState("");

    const { data: applications = [], refetch, isLoading } = useQuery({
        queryKey: ["myApplications", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications/byUser/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const openModal = (app, type) => {
        setSelectedApp(app);
        setModalType(type);
    };

    const closeModal = () => {
        setSelectedApp(null);
        setModalType("");
        refetch();
    };

    const handleCancelApplication = async (app) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: `You want to cancel your application to ${app.universityName}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Cancel it!",
        });

        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/applications/${app._id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire("Cancelled!", "Your application has been cancelled.", "success");
                    refetch();
                } else {
                    Swal.fire("Error", "Failed to cancel application", "error");
                }
            } catch (err) {
                Swal.fire("Error", "Something went wrong while cancelling", err);
            }
        }
    };

    const handleReviewSubmit = async (scholarshipId, reviewData) => {
        const review = {
            scholarshipId,
            reviewerName: user?.displayName,
            reviewerPhoto: user?.photoURL,
            reviewerEmail: user?.email,
            scholarshipName: selectedApp.scholarshipName,
            universityName: selectedApp.universityName,
            comment: reviewData.comment,
            rating: reviewData.rating,
            date: new Date(),
        };

        try {
            const res = await axiosSecure.post("/reviews", review);
            if (res.data.insertedId) {
                Swal.fire("Success", "Review submitted successfully", "success");
                closeModal();
            } else {
                Swal.fire("Failed", "Could not submit review", "error");
            }
        } catch (error) {
            console.error("Review error:", error);
            Swal.fire("Error", "Something went wrong", "error");
        }
    };

    const handleUpdateApplication = async (updatedData) => {
        const { _id, ...rest } = updatedData;
        try {
            const res = await axiosSecure.put(`/applications/${_id}`, rest);
            if (res.data.modifiedCount > 0) {
                Swal.fire("Updated!", "Application updated successfully.", "success");
                closeModal();
            } else {
                Swal.fire("No Changes", "Nothing was updated.", "info");
            }
        } catch (error) {
            console.error("Update failed:", error);
            Swal.fire("Error", "Failed to update application", "error");
        }
    };





    if (isLoading) {
        return <p className="text-center text-green-600 mt-10 font-semibold">Loading applications...</p>;
    }

    if (!isLoading && applications.length === 0) {
        return (
            <div className="text-center mt-10 text-green-700 font-semibold">
                <p>No applications found.</p>
                <p className="text-sm text-gray-500">You have not applied for any scholarship yet.</p>
            </div>
        );
    }

    return (
        <>
            <h2 className="text-green-700 text-center font-bold text-xl my-4">My Applications</h2>
            <div className="overflow-x-auto">
                <table className="table w-full border border-green-600">
                    <thead className="bg-green-100 text-green-700">
                        <tr>
                            <th>#</th>
                            <th>Scholarship</th>
                            <th>University</th>
                            <th>Subject</th>
                            <th>Fees</th>
                            <th>Payment Status</th>
                            <th>Application Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app, index) => (
                            <tr key={app._id} className="hover:bg-green-50">
                                <td>{index + 1}</td>
                                <td>{app.scholarshipName}</td>
                                <td>{app.universityName}</td>
                                <td>{app.subjectCategory}</td>
                                <td>₹{app.applicationFee}</td>
                                <td>{app.paymentStatus || "Unpaid"}</td>
                                <td>
                                    <span className={`badge 
                    ${app.status === "pending" && "badge-warning"} 
                    ${app.status === "processing" && "badge-info"} 
                    ${app.status === "completed" && "badge-success"} 
                    ${app.status === "rejected" && "badge-error"}`}>
                                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                    </span>
                                </td>
                                <td className="flex gap-2 justify-center">
                                    <button onClick={() => openModal(app, "details")} className="btn btn-sm text-green-600 border-green-600 hover:bg-green-100" title="Details">
                                        <FaEye />
                                    </button>
                                    <button onClick={() =>
                                        app.status === "pending"
                                            ? openModal(app, "edit")
                                            : Swal.fire("Cannot Edit", "Only pending applications can be edited.", "warning")
                                    }
                                        className="btn btn-sm text-yellow-600 border-yellow-600 hover:bg-yellow-100"
                                        title="Edit">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handleCancelApplication(app)} className="btn btn-sm text-red-600 border-red-600 hover:bg-red-100" title="Cancel">
                                        <FaTrash />
                                    </button>
                                    <button onClick={() => openModal(app, "review")} className="btn btn-sm text-blue-600 border-blue-600 hover:bg-blue-100" title="Add Review">
                                        <FaStar />
                                    </button>
                                    <button
                                        onClick={() => navigate(`/payment/${app._id}`)}
                                        disabled={app.paymentStatus === "paid"}
                                        className={`btn btn-sm ${app.paymentStatus === "paid"
                                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                            : "bg-green-600 text-white hover:bg-green-700"
                                            }`}
                                        title={app.paymentStatus === "paid" ? "Already Paid" : "Proceed to Payment"}
                                    >
                                        {app.paymentStatus === "paid" ? "Paid" : "Pay Now"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modals */}
            {modalType === "details" && selectedApp && (
                <ApplicationDetailsModal app={selectedApp} onClose={closeModal} />
            )}
            {modalType === "edit" && selectedApp && (
                <EditApplicationModal
                    application={selectedApp}
                    onClose={closeModal}
                    onSubmit={handleUpdateApplication}
                />
            )}
            {modalType === "review" && selectedApp && (
                <AddReviewModal app={selectedApp} onClose={closeModal} onSubmit={handleReviewSubmit} />
            )}
        </>
    );
};

export default MyApplications;
