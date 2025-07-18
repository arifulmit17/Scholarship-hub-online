import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';

const UpdateScholarshipModal = ({ isOpen, onClose, scholarship }) => {
  const { register, handleSubmit, setValue, reset, watch } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const queryClient = useQueryClient();
    
  // Prefill form when scholarship changes
  useEffect(() => {
    if (scholarship) {
      reset(scholarship);
      setImagePreview(scholarship.universityImage);
    }
  }, [scholarship, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
  if (file) {
    setImageFile(file); // store file for upload
    setImagePreview(URL.createObjectURL(file));
  }
  };
  const uploadToImgBB = async (image) => {
  const formData = new FormData();
  formData.append('image', image);

  const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY; // Set this in your .env
  const url = `https://api.imgbb.com/1/upload?key=${imgbbKey}`;

  const res = await axios.post(url, formData);
  return res.data?.data?.url;
};

  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
        console.log(updatedData);
      const { _id, ...rest } = updatedData;
      return await axios.put(`${import.meta.env.VITE_API_URL}/scholarshipupdate/${_id}`, rest);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['scholarship']);
      Swal.fire('Success!', 'Scholarship updated successfully.', 'success');
      onClose();
    },
    onError: () => {
      Swal.fire('Error', 'Failed to update scholarship', 'error');
    },
  });

  const onSubmit =async (data) => {
    let updatedImageUrl = scholarship.universityImage;

    // Upload only if a new image is selected
    if (imageFile) {
      updatedImageUrl = await uploadToImgBB(imageFile);
    }

    const updatedScholarship = {
      ...data,
      universityImage: updatedImageUrl,
    };

    updateMutation.mutate({ ...updatedScholarship, _id: scholarship._id });
    // updateMutation.mutate({ ...data, _id: scholarship._id });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-4xl relative">
        <h2 className="text-2xl font-bold mb-4">Update Scholarship</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input {...register("scholarshipName", { required: true })} type="text" placeholder="Scholarship Name" className="input input-bordered w-full" />
          <input {...register("universityName", { required: true })} type="text" placeholder="University Name" className="input input-bordered w-full" />

          <div>
            <input type="file" accept="image/*" onChange={handleImageChange} className="file-input file-input-bordered w-full" />
            {imagePreview && <img src={imagePreview} alt="Preview" className="w-24 h-24 mt-2 object-cover rounded-md" />}
          </div>

          <input {...register("universityCountry", { required: true })} type="text" placeholder="University Country" className="input input-bordered w-full" />
          <input {...register("universityCity", { required: true })} type="text" placeholder="University City" className="input input-bordered w-full" />
          <input {...register("universityRank", { required: true })} type="number" placeholder="University World Rank" className="input input-bordered w-full" />

          <select {...register("subjectCategory", { required: true })} className="select select-bordered w-full">
            <option>Agriculture</option>
            <option>Engineering</option>
            <option>Doctor</option>
          </select>

          <select {...register("scholarshipCategory", { required: true })} className="select select-bordered w-full">
            <option>Full fund</option>
            <option>Partial</option>
            <option>Self-fund</option>
          </select>

          <select {...register("degree", { required: true })} className="select select-bordered w-full">
            <option>Diploma</option>
            <option>Bachelor</option>
            <option>Masters</option>
          </select>

          <input {...register("tuitionFees")} type="text" placeholder="Tuition Fees (Optional)" className="input input-bordered w-full" />
          <input {...register("applicationFees", { required: true })} type="number" placeholder="Application Fees" className="input input-bordered w-full" />
          <input {...register("serviceCharge", { required: true })} type="number" placeholder="Service Charge" className="input input-bordered w-full" />
          <input {...register("applicationDeadline", { required: true })} type="date" className="input input-bordered w-full" />
          <input {...register("postDate", { required: true })} type="date" className="input input-bordered w-full" />
          

          <div className="md:col-span-2 flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="btn btn-outline">Cancel</button>
            <button type="submit" className="btn btn-primary">Update</button>
          </div>
        </form>

        <button className="absolute top-2 right-4 text-xl" onClick={onClose}>✕</button>
      </div>
    </div>
  );
};

export default UpdateScholarshipModal;
