import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_imageHostKey;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const EditApplicationModal = ({ application, onClose, onSubmit }) => {
  const [imageURL, setImageURL] = useState(application?.applicantPhoto || "");
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: application,
  });

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

  const submitForm = (data) => {
    if (!imageURL) {
      return Swal.fire("Error!", "Please upload your photo!", "warning");
    }

    const updatedApp = {
      ...application,
      ...data,
      applicantPhoto: imageURL,
    };
    onSubmit(updatedApp);
    onClose();
  };

  return (
    <dialog open className="modal modal-bottom sm:modal-middle">
      <div className="modal-box max-w-3xl border border-green-600 bg-green-50">
        <h3 className="font-bold text-lg text-green-600 mb-4 text-center">Edit Your Application</h3>

        <form onSubmit={handleSubmit(submitForm)} className="grid grid-cols-1 md:grid-cols-2 gap-3">

          {/* Photo Upload */}
          <div className="col-span-2">
            {/* ✅ Show default or uploaded image */}
            {imageURL && (
              <div className="mb-3">
                <p className="text-green-600 text-sm mb-1">Current Photo Preview:</p>
                <img
                  src={imageURL}
                  alt="Applicant"
                  className="w-32 h-32 object-cover rounded-full border border-green-600"
                />
              </div>
            )}

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
          {/* Phone */}
          <div>
            <label className="label text-green-600">Phone Number</label>
            <input
              {...register("phone", { required: "Phone number is required" })}
              className="input input-bordered border-green-600 w-full"
              placeholder="Enter phone number"
            />
            {errors.phone && <p className="text-red-600 text-sm">{errors.phone.message}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="label text-green-600">Address</label>
            <input
              {...register("address", { required: "Address is required" })}
              className="input input-bordered border-green-600 w-full"
              placeholder="Enter address"
            />
            {errors.address && <p className="text-red-600 text-sm">{errors.address.message}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="label text-green-600">Gender</label>
            <select {...register("gender")} className="select select-bordered border-green-600 w-full">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Degree */}
          <div>
            <label className="label text-green-600">Degree</label>
            <select {...register("degree")} className="select select-bordered border-green-600 w-full">
              <option value="Diploma">Diploma</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Masters">Masters</option>
            </select>
          </div>

          {/* SSC Result */}
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

          {/* HSC Result */}
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

          {/* Study Gap */}
          <div>
            <label className="label text-green-600">Study Gap</label>
            <select {...register("studyGap")} className="select select-bordered border-green-600 w-full">
              <option value="No">No</option>
              <option value="1 Year">1 Year</option>
              <option value="2+ Years">2+ Years</option>
            </select>
          </div>


          {/* Action Buttons */}
          <div className="md:col-span-2 mt-4 flex justify-end gap-4">
            <button type="submit" className="btn bg-green-600 hover:bg-green-700 text-white">
              {uploading ? "Uploading Photo..." : "Update Application"}
            </button>
            <button type="button" onClick={onClose} className="btn btn-outline btn-error">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditApplicationModal;
