import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageScholarships = () => {
    const axios = useAxiosSecure();
    const [editingScholarship, setEditingScholarship] = useState(null);
    const [previewScholarship, setPreviewScholarship] = useState(null);
    const [formData, setFormData] = useState({});

    const { data: scholarships = [], refetch, isLoading, isError } = useQuery({
        queryKey: ["allScholarships"],
        queryFn: async () => {
            const res = await axios.get("/scholarships");
            return res.data;
        },
    });

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This scholarship will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                const res = await axios.delete(`/scholarships/${id}`);
                if (res.data?.deletedCount > 0 || res.data?.success) {
                    Swal.fire("Deleted!", "Scholarship deleted successfully.", "success");
                    refetch();
                } else {
                    throw new Error("Not deleted");
                }
            } catch (err) {
                Swal.fire("Error!", "Could not delete scholarship", err);
            }
        }
    };

    const handleEdit = (scholarship) => {
        setEditingScholarship(scholarship);
        setFormData(scholarship);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const { _id, ...updatePayload } = formData;

        try {
            await axios.put(`/scholarships/${editingScholarship._id}`, updatePayload);
            Swal.fire("Updated!", "Scholarship updated successfully.", "success");
            setEditingScholarship(null);
            refetch();
        } catch (err) {
            Swal.fire("Error!", "Could not update scholarship", err);
        }
    };


    if (isLoading) return <p className="text-center text-green-600">Loading scholarships...</p>;
    if (isError) return <p className="text-center text-red-600">Failed to load scholarships.</p>;

    return (
        <>
            <h2 className="text-green-600 text-center text-2xl font-semibold mb-4">Manage Scholarships</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra border border-green-200">
                    <thead className="bg-green-100 text-green-600">
                        <tr>
                            <th>#</th>
                            <th>Scholarship</th>
                            <th>University</th>
                            <th>Subject</th>
                            <th>Degree</th>
                            <th>Fees</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scholarships.map((item, idx) => (
                            <tr key={item._id}>
                                <td>{idx + 1}</td>
                                <td>{item.scholarshipName}</td>
                                <td>{item.universityName}</td>
                                <td>{item.subject}</td>
                                <td>{item.degree}</td>
                                <td>${item.applicationFee}</td>
                                <td className="flex gap-2 justify-center">
                                    <button
                                        onClick={() => setPreviewScholarship(item)}
                                        className="btn btn-sm text-green-600 border-green-600"
                                        title="Details"
                                    >
                                        <FaEye />
                                    </button>
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="btn btn-sm text-blue-600 border-blue-600"
                                        title="Edit"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="btn btn-sm text-red-600 border-red-600"
                                        title="Delete"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {previewScholarship && (
                <dialog
                    open
                    className="modal modal-bottom sm:modal-middle"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setPreviewScholarship(null);
                        }
                    }}
                >
                    <div className="modal-box">

                        <img
                            src={previewScholarship.logo}
                            alt={previewScholarship.scholarshipName}
                            className="w-32 h-32 object-cover mb-4 rounded-full border border-green-300"
                        />

                        <h3 className="font-bold text-lg text-green-700 mb-4">
                            {previewScholarship.scholarshipName}
                        </h3>

                        <div className="space-y-1 text-sm">
                            {Object.entries(previewScholarship).map(([key, value]) =>
                                !["_id", "website", "description", "averageRating", "logo"].includes(key) ? (
                                    <p key={key} className="!p-0">
                                        <strong>{key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}:</strong> {value}
                                    </p>
                                ) : null
                            )}
                        </div>

                        <div className="modal-action justify-end">
                            <button onClick={() => setPreviewScholarship(null)} className="btn bg-red-600 text-white">
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            )}


            {editingScholarship && (
                <dialog
                    open
                    className="modal modal-bottom sm:modal-middle"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setEditingScholarship(null);
                        }
                    }}
                >
                    <div className="modal-box max-h-[80vh] overflow-y-auto relative">
                        <h3 className="font-bold text-lg text-green-700 mb-4 text-center">
                            Edit Scholarship
                        </h3>

                        <form onSubmit={handleUpdateSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="md:col-span-2 text-center">
                                <img
                                    src={formData.logo}
                                    alt="Scholarship Logo"
                                    className="w-24 h-24 rounded-full object-cover mx-auto border"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="label text-green-600">Upload New Logo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="file-input file-input-bordered border-green-600 w-full"
                                    onChange={async (e) => {
                                        const image = e.target.files[0];
                                        if (!image) return;

                                        const formImage = new FormData();
                                        formImage.append("image", image);

                                        try {
                                            const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageHostKey}`, {
                                                method: "POST",
                                                body: formImage,
                                            });
                                            const data = await res.json();
                                            if (data.success) {
                                                setFormData({ ...formData, logo: data.data.url });
                                                Swal.fire("Success!", "Image uploaded successfully.", "success");
                                            } else {
                                                throw new Error("Upload failed");
                                            }
                                        } catch (err) {
                                            Swal.fire("Error!", "Image upload failed.", err);
                                        }
                                    }}
                                />
                            </div>

                            {Object.entries(formData).map(([key, value]) =>
                                key !== "_id" &&
                                    key !== "logo" &&
                                    key !== "website" &&
                                    key !== "averageRating" &&
                                    key !== "postedAt" &&
                                    key !== "description" ? (
                                    <div key={key}>
                                        <label className="label text-green-600">
                                            {key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}
                                        </label>

                                        {["subject", "category", "degree"].includes(key) ? (
                                            <select
                                                value={formData[key] || ""}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, [key]: e.target.value })
                                                }
                                                className="select select-bordered border-green-600 w-full"
                                            >
                                                {key === "subject" && (
                                                    <>
                                                        <option value="Agriculture">Agriculture</option>
                                                        <option value="Engineering">Engineering</option>
                                                        <option value="Doctor">Doctor</option>
                                                    </>
                                                )}
                                                {key === "category" && (
                                                    <>
                                                        <option value="Full fund">Full fund</option>
                                                        <option value="Partial">Partial</option>
                                                        <option value="Self-fund">Self-fund</option>
                                                    </>
                                                )}
                                                {key === "degree" && (
                                                    <>
                                                        <option value="Diploma">Diploma</option>
                                                        <option value="Bachelor">Bachelor</option>
                                                        <option value="Masters">Masters</option>
                                                    </>
                                                )}
                                            </select>
                                        ) : (
                                            <input
                                                type={key === "deadline" || key.toLowerCase().includes("date") ? "date" : "text"}
                                                className="input input-bordered border-green-600 w-full"
                                                value={formData[key] || ""}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, [key]: e.target.value })
                                                }
                                            />
                                        )}
                                    </div>
                                ) : null
                            )}

                            {formData.description !== undefined && (
                                <div className="md:col-span-2">
                                    <label className="label text-green-600">Description (Optional)</label>
                                    <textarea
                                        className="textarea textarea-bordered border-green-600 w-full"
                                        rows={4}
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({ ...formData, description: e.target.value })
                                        }
                                        placeholder="Enter scholarship description here..."
                                    ></textarea>
                                </div>
                            )}

                            <div className="modal-action md:col-span-2 justify-end">
                                <button
                                    type="submit"
                                    className="btn bg-green-600 hover:bg-green-700 text-white"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditingScholarship(null)}
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

export default ManageScholarships;