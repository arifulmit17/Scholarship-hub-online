import { useForm } from 'react-hook-form';
import { useState } from 'react';

const ReviewModal = ({ isOpen, onClose, onSubmitReview }) => {
  const { register, handleSubmit, reset } = useForm();

  const handleFormSubmit = (data) => {
    data.reviewDate = new Date().toISOString(); 
    data.rating=parseInt(data.rating)
    onSubmitReview(data);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Add Review</h2>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium dark:text-white">Rating Point (1–5)</label>
            <input
              type="number"
              min="1"
              max="5"
              {...register('rating', { required: true })}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block font-medium dark:text-white">Review Comment</label>
            <textarea
              {...register('review', { required: true })}
              className="textarea textarea-bordered w-full"
              rows="3"
            ></textarea>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;