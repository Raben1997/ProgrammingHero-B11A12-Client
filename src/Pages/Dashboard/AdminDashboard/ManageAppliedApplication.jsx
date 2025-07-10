import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaEye, FaCommentDots, FaTrashAlt } from "react-icons/fa";
import ApplicationDetailsModal from "../../../Component/ApplicationDetailsModal/ApplicationDetailsModal";
import FeedbackModal from "../../../Component/FeedbackModal/FeedbackModal";

const ManageAppliedApplication = () => {
    const axiosSecure = useAxiosSecure();
    const [filterOption, setFilterOption] = useState("latest_applied"); // default
    const [selectedApp, setSelectedApp] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [modalType, setModalType] = useState("");

    const { data: applications = [], refetch } = useQuery({
        queryKey: ["allApplications"],
        queryFn: async () => {
            const res = await axiosSecure.get("/applications");
            return res.data;
        }
    });

    const filteredSortedApps = [...applications]
        .filter(app => {
            if (["pending", "processing", "completed", "rejected"].includes(filterOption)) {
                return app.status === filterOption;
            }
            return true;
        })
        .sort((a, b) => {
            if (filterOption === "latest_applied") {
                return new Date(b.appliedAt) - new Date(a.appliedAt);
            }
            if (filterOption === "upcoming_deadline") {
                return new Date(a.deadline) - new Date(b.deadline);
            }
            return 0;
        });

    const openModal = (app, type) => {
        setSelectedApp(app);
        setModalType(type);
    };

    const closeModal = () => {
        setSelectedApp(null);
        setModalType("");
        setFeedback("");
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const res = await axiosSecure.patch(`/applications/status/${id}`, { status: newStatus });
            if (res.data.modifiedCount > 0) {
                Swal.fire("Updated", `Application status changed to "${newStatus}"`, "success");
                refetch();
            }
        } catch {
            Swal.fire("Error", "Failed to update application status", "error");
        }
    };

    const handleFeedbackSubmit = async () => {
        try {
            const res = await axiosSecure.patch(`/applications/feedback/${selectedApp._id}`, { feedback });
            if (res.data.success || res.data.modifiedCount > 0) {
                Swal.fire("Success", "Feedback submitted successfully", "success");
                closeModal();
                refetch();
            } else {
                Swal.fire("Warning", res.data.message || "No changes made", "warning");
            }
        } catch {
            Swal.fire("Error", "Failed to submit feedback", "error");
        }
    };

    const handleCancel = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to cancel this application?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        });

        if (confirm.isConfirmed) {
            try {
                const res = await axiosSecure.patch(`/applications/status/${id}`, { status: "rejected" });
                if (res.data.modifiedCount > 0) {
                    Swal.fire("Cancelled", "Application has been rejected", "success");
                    refetch();
                }
            } catch {
                Swal.fire("Error", "Failed to cancel application", "error");
            }
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold text-green-700 mb-4 text-center">All Applied Scholarships</h2>

            {/* ✅ Combined Filter & Sort */}
            <div className="mb-4 flex justify-end items-center gap-2">
                <label>Sort By : </label>
                <select
                    value={filterOption}
                    onChange={(e) => setFilterOption(e.target.value)}
                    className="select select-bordered select-sm border-green-600 text-green-700"
                >
                    <option value="latest_applied">Latest Applied</option>
                    <option value="upcoming_deadline">Upcoming Deadline</option>
                    <option value="pending">Pending Applications</option>
                    <option value="processing">Processing Applications</option>
                    <option value="completed">Completed Applications</option>
                    <option value="rejected">Rejected Applications</option>
                </select>
            </div>

            {/* ✅ Table */}
            <div className="overflow-x-auto">
                <table className="table w-full border border-green-600">
                    <thead className="bg-green-100 text-green-700">
                        <tr>
                            <th>#</th>
                            <th>Applicant</th>
                            <th>University</th>
                            <th>Fee</th>
                            <th>Applied Date</th>
                            <th><span className="inline-block pr-5">Deadline</span></th>
                            <th><span className="inline-block pr-16">Status</span></th>
                            <th>Feedback</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSortedApps.length > 0 ? (
                            filteredSortedApps.map((app, i) => (
                                <tr key={app._id} className="hover:bg-green-50">
                                    <td>{i + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-2 pr-2">
                                            <img src={app.applicantPhoto} alt="avatar" className="w-8 h-8 rounded-full" />
                                            <div>
                                                <p className="font-medium !p-0">{app.userName}</p>
                                                <p className="text-sm text-gray-500 !p-0">{app.userEmail}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{app.universityName}</td>
                                    <td>₹{app.applicationFee}</td>
                                    <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
                                    <td>{app.applicationDeadline}</td>
                                    <td>
                                        <select
                                            value={app.status}
                                            onChange={(e) => handleStatusChange(app._id, e.target.value)}
                                            className="select select-xs border-green-600 text-green-700"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="completed">Completed</option>
                                            <option value="rejected">Rejected</option>
                                        </select>
                                    </td>
                                    <td>{app.feedback || "N/A"}</td>
                                    <td className="flex gap-2">
                                        <button onClick={() => openModal(app, "details")} className="btn btn-sm text-green-600 border-green-600 hover:bg-green-100"><FaEye /></button>
                                        <button onClick={() => openModal(app, "feedback")} className="btn btn-sm text-blue-600 border-blue-600 hover:bg-blue-100"><FaCommentDots /></button>
                                        <button
                                            onClick={() => handleCancel(app._id)}
                                            className="btn btn-sm text-red-600 border-red-600 hover:bg-red-100 disabled:opacity-50"
                                            disabled={app.status === "rejected"}
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center text-gray-500 py-4">
                                    No applications found for this selection.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ✅ Modals */}
            {modalType === "details" && selectedApp && (
                <ApplicationDetailsModal app={selectedApp} onClose={closeModal} />
            )}

            {modalType === "feedback" && selectedApp && (
                <FeedbackModal
                    isOpen={true}
                    feedback={feedback}
                    setFeedback={setFeedback}
                    onSubmit={handleFeedbackSubmit}
                    onClose={closeModal}
                    applicantName={selectedApp?.userName}
                />
            )}
        </div>
    );
};

export default ManageAppliedApplication;
