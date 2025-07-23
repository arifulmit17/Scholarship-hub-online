import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import React from "react";

const UpdateApplicationModal = ({ isOpen, onClose, application,universityName,scholarshipCategory,subjectCategory }) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: application,
  });

  const { mutateAsync: updateApplication } = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/application/update/${application._id}`,
        updatedData
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['applications']);
      Swal.fire("Updated!", "Application updated successfully.", "success");
      onClose();
    },
    onError: () => {
      Swal.fire("Error", "Failed to update the application.", "error");
    },
  });

  const onSubmit = async (data) => {
    await updateApplication(data);
  };

  
  React.useEffect(() => {
    reset(application);
  }, [application, reset]);

  if (!isOpen) return null;

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box max-w-3xl w-full">
        <h3 className="font-bold text-lg mb-4">Update Scholarship Application</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              {...register("phone", { required: true })}
              type="tel"
              placeholder="Phone Number"
              className="input input-bordered w-full"
            />

            <input
              {...register("photo", { required: true })}
              type="text"
              placeholder="Photo URL"
              className="input input-bordered w-full"
            />

            <input
              {...register("address", { required: true })}
              type="text"
              placeholder="Address"
              className="input input-bordered w-full"
            />

            <select {...register("gender")} className="select select-bordered w-full">
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <select {...register("degree")} className="select select-bordered w-full">
              <option value="">Select Degree</option>
              <option>Diploma</option>
              <option>Bachelor</option>
              <option>Masters</option>
            </select>

            <input
              {...register("sscResult")}
              type="text"
              placeholder="SSC Result"
              className="input input-bordered w-full"
            />

            <input
              {...register("hscResult")}
              type="text"
              placeholder="HSC Result"
              className="input input-bordered w-full"
            />

            <select {...register("studyGap")} className="select select-bordered w-full">
              <option value="">Study Gap?</option>
              <option>Yes</option>
              <option>No</option>
            </select>

            <input
              type="text"
              className="input input-bordered w-full"
              readOnly
              value={universityName}
            />

            <input
              type="text"
              className="input input-bordered w-full"
              readOnly
              value={scholarshipCategory}
            />

            <input
              type="text"
              className="input input-bordered w-full"
              readOnly
              value={subjectCategory}
            />
          </div>

          <div className="modal-action">
            <button type="submit" className="btn btn-primary">Update</button>
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateApplicationModal;
