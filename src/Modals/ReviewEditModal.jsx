import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const ReviewEditModal = ({ isOpen, onClose, reviewData, onUpdate }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  
  useEffect(() => {
    if (reviewData) {
      setValue('rating', reviewData.rating);
      setValue('review', reviewData.review);
    }
  }, [reviewData, setValue]);

  const handleFormSubmit = (updatedData) => {
    const updatedReview = {
      ...reviewData,
      rating: parseInt(updatedData.rating),
      review: updatedData.review,
      date: new Date().toISOString(),
    };

    onUpdate(updatedReview); 
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Edit Review</h2>

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
            {errors.rating && <p className="text-red-500">Rating is required</p>}
          </div>

          <div>
            <label className="block font-medium dark:text-white">Review Comment</label>
            <textarea
              {...register('review', { required: true })}
              className="textarea textarea-bordered w-full"
              rows="3"
            ></textarea>
            {errors.review && <p className="text-red-500">Review is required</p>}
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewEditModal;
