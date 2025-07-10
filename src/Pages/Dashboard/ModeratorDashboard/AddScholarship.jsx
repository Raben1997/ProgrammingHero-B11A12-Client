import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_imageHostKey;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddScholarship = () => {
    const axiosSecure = useAxiosSecure();
    const [imageURL, setImageURL] = useState("");
    const [uploading, setUploading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // 🔼 Image Upload
    const handleImageUpload = async (e) => {
        const imageFile = e.target.files[0];
        const formData = new FormData();
        formData.append("image", imageFile);

        try {
            setUploading(true);
            const res = await fetch(image_hosting_api, {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                setImageURL(data.data.display_url);
                Swal.fire("Success!", "Image uploaded successfully!", "success");
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error!", "Failed to upload image.", "error");
        } finally {
            setUploading(false);
        }
    };

    // 🔽 Submit Form
    const onSubmit = async (data) => {
        if (!imageURL) {
            Swal.fire("Error", "Please upload university logo!", "warning");
            return;
        }

        const newScholarship = {
            ...data,
            logo: imageURL,
            tuitionFee: data.tuitionFee || "Not Applicable",
            postedAt: data.postDate,
        };

        try {
            const res = await axiosSecure.post("/scholarships", newScholarship);
            if (res.data.insertedId) {
                Swal.fire("Success!", "Scholarship added successfully!", "success");
                reset();
                setImageURL("");
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error!", "Failed to add scholarship", "error");
        }
    };

    return (
        <div className="p-6 bg-green-50 rounded shadow max-w-4xl mx-auto border border-green-600">
            <h2 className="text-center text-green-600">
                Add Scholarship
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                    <label className="label text-green-600">Scholarship Name</label>
                    <input
                        {...register("scholarshipName", { required: "Scholarship Name is required" })}
                        className="input input-bordered border-green-600 w-full"
                        placeholder="Scholarship Name"
                    />
                    {errors.scholarshipName && <p className="text-red-600 text-sm">{errors.scholarshipName.message}</p>}
                </div>

                <div>
                    <label className="label text-green-600">University Name</label>
                    <input
                        {...register("universityName", { required: "University Name is required" })}
                        className="input input-bordered border-green-600 w-full"
                        placeholder="University Name"
                    />
                    {errors.universityName && <p className="text-red-600 text-sm">{errors.universityName.message}</p>}
                </div>

                <div>
                    <label className="label text-green-600">University Logo/Image</label>
                    <input
                        type="file"
                        onChange={handleImageUpload}
                        className="file-input file-input-bordered border-green-600 w-full"
                        accept="image/*"
                    />
                    {/* {uploading && <p className="text-blue-600 text-sm">Uploading...</p>}
                    {imageURL && <p className="text-green-600 text-sm">Image uploaded</p>} */}
                </div>

                <div>
                    <label className="label text-green-600">University Country</label>
                    <input
                        {...register("country", { required: "Country is required" })}
                        className="input input-bordered border-green-600 w-full"
                        placeholder="Country"
                    />
                    {errors.country && <p className="text-red-600 text-sm">{errors.country.message}</p>}
                </div>

                <div>
                    <label className="label text-green-600">University City</label>
                    <input
                        {...register("city", { required: "City is required" })}
                        className="input input-bordered border-green-600 w-full"
                        placeholder="City"
                    />
                    {errors.city && <p className="text-red-600 text-sm">{errors.city.message}</p>}
                </div>

                <div>
                    <label className="label text-green-600">University World Rank</label>
                    <input
                        type="number"
                        {...register("worldRank", { required: "World Rank is required" })}
                        className="input input-bordered border-green-600 w-full"
                        placeholder="e.g. 100"
                    />
                    {errors.worldRank && <p className="text-red-600 text-sm">{errors.worldRank.message}</p>}
                </div>

                <div>
                    <label className="label text-green-600">Subject Category</label>
                    <select {...register("subject")} className="select select-bordered border-green-600 w-full">
                        <option value="Agriculture">Agriculture</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Doctor">Doctor</option>
                    </select>
                </div>

                <div>
                    <label className="label text-green-600">Scholarship Category</label>
                    <select {...register("category")} className="select select-bordered border-green-600 w-full">
                        <option value="Full fund">Full fund</option>
                        <option value="Partial">Partial</option>
                        <option value="Self-fund">Self-fund</option>
                    </select>
                </div>

                <div>
                    <label className="label text-green-600">Degree</label>
                    <select {...register("degree")} className="select select-bordered border-green-600 w-full">
                        <option value="Diploma">Diploma</option>
                        <option value="Bachelor">Bachelor</option>
                        <option value="Masters">Masters</option>
                    </select>
                </div>

                <div>
                    <label className="label text-green-600">Tuition Fees (Optional)</label>
                    <input {...register("tuitionFee")} className="input input-bordered border-green-600 w-full" placeholder="e.g. 5000 INR" />
                </div>

                <div>
                    <label className="label text-green-600">Application Fee</label>
                    <input
                        type="number"
                        {...register("applicationFee", { required: "Application Fee is required" })}
                        className="input input-bordered border-green-600 w-full"
                        placeholder="e.g. 50 INR"
                    />
                    {errors.applicationFee && <p className="text-red-600 text-sm">{errors.applicationFee.message}</p>}
                </div>

                <div>
                    <label className="label text-green-600">Service Charge</label>
                    <input
                        type="number"
                        {...register("serviceCharge", { required: "Service Charge is required" })}
                        className="input input-bordered border-green-600 w-full"
                        placeholder="e.g. 200 INR"
                    />
                    {errors.serviceCharge && <p className="text-red-600 text-sm">{errors.serviceCharge.message}</p>}
                </div>

                <div>
                    <label className="label text-green-600">Application Deadline</label>
                    <input
                        type="date"
                        {...register("deadline", { required: "Deadline is required" })}
                        className="input input-bordered border-green-600 w-full"
                    />
                    {errors.deadline && <p className="text-red-600 text-sm">{errors.deadline.message}</p>}
                </div>

                <div>
                    <label className="label text-green-600">Scholarship Post Date</label>
                    <input
                        type="date"
                        defaultValue={new Date().toISOString().split("T")[0]}
                        {...register("postDate", { required: "Post Date is required" })}
                        className="input input-bordered border-green-600 w-full"
                    />
                    {errors.postDate && <p className="text-red-600 text-sm">{errors.postDate.message}</p>}
                </div>

                <div>
                    <label className="label text-green-600">Posted User Email</label>
                    <input
                        type="email"
                        {...register("postedEmail", { required: "Posted Email is required" })}
                        className="input input-bordered border-green-600 w-full"
                        placeholder="example@mail.com"
                    />
                    {errors.postedEmail && <p className="text-red-600 text-sm">{errors.postedEmail.message}</p>}
                </div>

                <div>
                    <label className="label text-green-600">Description (Optional)</label>
                    <input
                        type="text"
                        {...register("description")}
                        className="input input-bordered border-green-600 w-full"
                        placeholder="Description Here..."
                    />
                </div>

                <div className="md:col-span-2 mt-4">
                    <button type="submit" className="btn bg-green-600 hover:bg-green-700 text-white w-full">
                        {uploading ? "Uploading..." : "Add Scholarship"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddScholarship;
