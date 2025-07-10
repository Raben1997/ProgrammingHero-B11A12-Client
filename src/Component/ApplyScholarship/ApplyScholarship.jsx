import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_imageHostKey;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ApplyScholarship = () => {
  const { id } = useParams(); // this is scholarshipId
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState("");
  const [uploading, setUploading] = useState(false);

  const { data: scholarship, isLoading } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
        Swal.fire("Success!", "Photo uploaded successfully!", "success");
      }
    } catch (err) {
      Swal.fire("Error!", "Failed to upload photo.", err);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (formData) => {
    if (!imageURL) {
      return Swal.fire("Error", "Please upload your photo!", "warning");
    }

    const application = {
      ...formData,
      applicantPhoto: imageURL,
      universityName: scholarship.universityName,
      scholarshipName: scholarship.scholarshipName,
      subjectCategory: scholarship.subject,
      scholarshipCategory: scholarship.category,
      scholarshipId: scholarship._id,
      applicationFee: scholarship.applicationFee,
      applicationDeadline: scholarship.deadline,
      userId: user?.uid,
      userName: user?.displayName,
      userEmail: user?.email,
      appliedAt: new Date(),
      status: "pending",
      paymentStatus: "unpaid", // ✅ added default payment status
    };

    try {
      const res = await axiosSecure.post("/applications", application);

      if (res.data.insertedId) {
        const result = await Swal.fire({
          title: "Application Submitted!",
          text: "Would you like to proceed to payment now?",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#16a34a",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Pay Now",
          cancelButtonText: "Later",
        });

        if (result.isConfirmed) {
          // ✅ Use the inserted application ID
          navigate(`/payment/${res.data.insertedId}`);
        } else {
          Swal.fire("Info", "You can complete payment later from your dashboard.", "info");
          navigate("/dashboard/user/my-application");
        }

        reset();
        setImageURL("");
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to submit application", error);
    }
  };

  if (isLoading || !scholarship) {
    return (
      <p className="text-center text-green-600 font-semibold mt-10">
        Loading scholarship details...
      </p>
    );
  }

  return (
    <div className="sec-gap">
      <div className="container">
        <div className="p-6 bg-green-50 rounded shadow max-w-3xl mx-auto border border-green-600">
          <h2 className="text-center text-green-600 font-bold text-xl mb-4">
            Apply for Scholarship
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label text-green-600">Phone Number</label>
              <input
                {...register("phone", { required: "Phone number is required" })}
                className="input input-bordered border-green-600 w-full"
                placeholder="Enter phone number"
              />
              {errors.phone && <p className="text-red-600 text-sm">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="label text-green-600">Upload Photo</label>
              <input
                type="file"
                onChange={handleImageUpload}
                className="file-input file-input-bordered border-green-600 w-full"
                accept="image/*"
              />
            </div>

            <div>
              <label className="label text-green-600">Address</label>
              <input
                {...register("address", { required: "Address is required" })}
                className="input input-bordered border-green-600 w-full"
                placeholder="e.g. Natunpara, Nadia, India"
              />
              {errors.address && <p className="text-red-600 text-sm">{errors.address.message}</p>}
            </div>

            <div>
              <label className="label text-green-600">Gender</label>
              <select {...register("gender")} className="select select-bordered border-green-600 w-full">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="label text-green-600">Applying Degree</label>
              <select {...register("degree")} className="select select-bordered border-green-600 w-full">
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Masters">Masters</option>
              </select>
            </div>

            <div>
              <label className="label text-green-600">SSC Result</label>
              <input
                type="number"
                step="0.01"
                {...register("sscResult", { required: "SSC result is required" })}
                className="input input-bordered border-green-600 w-full"
                placeholder="e.g. 4.80"
              />
              {errors.sscResult && <p className="text-red-600 text-sm">{errors.sscResult.message}</p>}
            </div>

            <div>
              <label className="label text-green-600">HSC Result</label>
              <input
                type="number"
                step="0.01"
                {...register("hscResult", { required: "HSC result is required" })}
                className="input input-bordered border-green-600 w-full"
                placeholder="e.g. 5.00"
              />
              {errors.hscResult && <p className="text-red-600 text-sm">{errors.hscResult.message}</p>}
            </div>

            <div>
              <label className="label text-green-600">Study Gap</label>
              <select {...register("studyGap")} className="select select-bordered border-green-600 w-full">
                <option value="No">No</option>
                <option value="1 Year">1 Year</option>
                <option value="2+ Years">2+ Years</option>
              </select>
            </div>

            {/* Read-only Fields */}
            <div>
              <label className="label text-green-600">Scholarship Name</label>
              <input
                value={scholarship.scholarshipName}
                readOnly
                className="input input-bordered border-green-600 w-full bg-gray-100"
              />
            </div>
            <div>
              <label className="label text-green-600">University Name</label>
              <input
                value={scholarship.universityName}
                readOnly
                className="input input-bordered border-green-600 w-full bg-gray-100"
              />
            </div>
            <div>
              <label className="label text-green-600">Scholarship Category</label>
              <input
                value={scholarship.category}
                readOnly
                className="input input-bordered border-green-600 w-full bg-gray-100"
              />
            </div>
            <div>
              <label className="label text-green-600">Subject Category</label>
              <input
                value={scholarship.subject}
                readOnly
                className="input input-bordered border-green-600 w-full bg-gray-100"
              />
            </div>

            <div className="md:col-span-2 mt-4">
              <button type="submit" className="btn bg-green-600 hover:bg-green-700 text-white w-full">
                {uploading ? "Uploading Photo..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyScholarship;
