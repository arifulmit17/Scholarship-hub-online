import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { use, useState } from 'react';
import { NavLink } from 'react-router';
import ReviewModal from '../../../Modals/ReviewModal';
import { AuthContext } from '../../../Contexts/AuthContext';
import Swal from 'sweetalert2';
import UpdateApplicationModal from '../../../Modals/UpdateApplicationModal';

const MyApplicationRow = ({app}) => {
    const {user}=use(AuthContext)
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedApp, setSelectedApp] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    
    
    const {scholarshipId,degree,applicationStatus,_id}=app

    const queryClient = useQueryClient();

const deleteMutation = useMutation({
  mutationFn: async (id) => {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/deleteapplication/${id}`);
    return res.data;
  },
  onSuccess: (data) => {
    if (data.deletedCount) {
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
      queryClient.invalidateQueries(['myapplication']); // Refresh the list
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


    const {data,isLoading,refetch}=useQuery({
        queryKey:['scholarship',scholarshipId],
        queryFn:async ()=>{
            const {data}=await axios(`${import.meta.env.VITE_API_URL}/scholarship/${scholarshipId}`)
            return data
        },
        initialData:[]
        
    })

    const {universityName,universityCity,scholarshipName,scholarshipCategory,subjectCategory,applicationFees,serviceCharge}=data || {}
    const handleAddReview =async (reviewData) => {
    const fullReview = {
      ...reviewData,
      scholarshipId,
      scholarshipName:scholarshipName,
      universityName:universityName,
      userName:user.displayName,
      userEmail:user.email
    };


    await axios.post(
            `${import.meta.env.VITE_API_URL}/add-review`,fullReview).then(res=>{console.log(res.data);
                        if(res.data.insertedId){
                            Swal.fire({
                                    title: "Review added successfully!",
                                    icon: "success",
                                    draggable: true
                    });
                        }
                    }).catch(error=>{
                        console.log(error);
                    })
    
      };

    // Submit to your backend here
    // await axios.post('/api/reviews', fullReview);
    
      const handleEdit = () => {
    if (applicationStatus === 'pending') {
      setSelectedApp(app);
        setModalOpen(true);
    } else {
      
      Swal.fire({
        icon: 'warning',
        title: 'Cannot Edit',
        text: 'The application is past pending stage. Editing is not allowed.',
        confirmButtonColor: '#3085d6',
      });
    }
  };
    
    
    
    return (
        <>
            <tr>
        <td>{universityName}</td>
        <td>{universityCity}</td>
        {/* <td>{Application_Feedback}</td> */}
        <td>{subjectCategory}</td>
        <td>{degree}</td>
        <td>{applicationFees}</td>
        <td>{serviceCharge}</td>
        <td>{applicationStatus}</td>

    
        
        <th>
            <NavLink to={`/dashboard/applicationdetails/${scholarshipId}`}>
<button className="btn btn-xs">Details</button>
        </NavLink>
            <button onClick={handleEdit} className="btn  btn-xs">Edit</button>
            <button onClick={()=>handleDelete(_id)} className="btn  btn-xs">Cancel</button>
            <button onClick={() => setIsModalOpen(true)} className="btn  btn-xs">Add Review</button>
        
            
          
        </th>
      </tr>
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitReview={handleAddReview}
      />
      {modalOpen && (
        <UpdateApplicationModal
         isOpen={modalOpen}
         onClose={() => setModalOpen(false)}
        application={selectedApp}
        universityName={universityName}
        subjectCategory={subjectCategory}
        scholarshipCategory={scholarshipCategory}
         />
)}
        </>
    );
};

export default MyApplicationRow;