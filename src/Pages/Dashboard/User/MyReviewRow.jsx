import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import ReviewEditModal from '../../../Modals/ReviewEditModal';

const MyReviewRow = ({rev,user}) => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentReview, setCurrentReview] = useState(null);

    const handleEditClick = (review) => {
  setCurrentReview(review);
  setEditModalOpen(true);
  
};

const updateReviewMutation = useMutation({
  mutationFn: async (updatedReview) => {
    const res = await axios.put(
      `${import.meta.env.VITE_API_URL}/reviewupdate/${rev._id}`,
      updatedReview
    );
    return res.data;
  },
  onSuccess: () => {
    Swal.fire({
      icon: 'success',
      title: 'Review updated!',
      showConfirmButton: false,
      timer: 1500,
    });

    // Invalidate any related queries to refresh data
    queryClient.invalidateQueries({ queryKey: ['review', user?.email] }); // Change the key to match your app
  },
  onError: (error) => {
    Swal.fire({
      icon: 'error',
      title: 'Update failed!',
      text: error.message || 'Something went wrong.',
    });
  },
});

    const handleUpdateReview = async (updatedReview) => {
        console.log(updatedReview);
        updateReviewMutation.mutate(updatedReview);
     refetch(); 
    };
    const queryClient = useQueryClient();

const deleteMutation = useMutation({
  mutationFn: async (id) => {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/deletereview/${id}`);
    return res.data;
  },
  onSuccess: (data) => {
    if (data.deletedCount) {
      Swal.fire("Deleted!", "Review has been deleted.", "success");
      queryClient.invalidateQueries(['mytutorial']); // Refresh the list
    }
  },
  onError: () => {
    Swal.fire("Error!", "Something went wrong.", "error");
  },
});

const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteMutation.mutate(id);
    }
  });
};
    const {review,reviewDate,scholarshipId,_id,rating}=rev || {}
    const {data,isLoading,refetch}=useQuery({
        queryKey:['scholarship',scholarshipId],
        queryFn:async ()=>{
            const {data}=await axios(`${import.meta.env.VITE_API_URL}/scholarship/${scholarshipId}`)
            return data
        },
        initialData:[]
        
    })
    const {scholarshipName,universityName}=data
    return (
        <>
            <tr>
        <td>{scholarshipName}</td>
        <td>{universityName}</td>
        <td>{review}</td>
        <td>{reviewDate}</td>
        <td>{rating}</td>
        <th>
            <button onClick={() => handleEditClick(review)} className="btn  btn-xs">Edit</button>
            <button onClick={()=>handleDelete(_id)} className="btn  btn-xs">Cancel</button>
        </th>
      </tr>
      <ReviewEditModal
      isOpen={editModalOpen}
         onClose={() => setEditModalOpen(false)}
        currentReview={currentReview}
        onUpdate={handleUpdateReview}
      >

      </ReviewEditModal>
        </>
    );
};

export default MyReviewRow;