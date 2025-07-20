import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';

const ManageReviewRow = ({rev}) => {
    const queryClient = useQueryClient();

const deleteTutorialMutation = useMutation({
  mutationFn: async (id) => {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/deletereview/${id}`);
    return res.data;
  },
  onSuccess: (data) => {
    if (data.deletedCount) {
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
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
      deleteTutorialMutation.mutate(id);
    }
  });
};
    const {reviewDate,userName,rating,review,scholarshipId,_id}=rev || {}
    const {data,isLoading,refetch}=useQuery({
        queryKey:['scholarship',scholarshipId],
        queryFn:async ()=>{
            const {data}=await axios(`${import.meta.env.VITE_API_URL}/scholarship/${scholarshipId}`)
            return data
        },
        initialData:[]
        
    })
    const {universityName,subjectCategory}=data
    return (
        <>
            <tr>
        <td>{universityName}</td>
        <td>{subjectCategory}</td>
        <td>{userName}</td>
        <td>{reviewDate}</td>
        <td>{review}</td>
        <td>{rating}</td>
        
        <th>
           
            <button onClick={()=>handleDelete(_id)}  className="btn  btn-xs">Delete</button>
        </th>
      </tr>
        </>
    );
};

export default ManageReviewRow;