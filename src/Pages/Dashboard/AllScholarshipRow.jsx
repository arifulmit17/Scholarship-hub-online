import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { NavLink } from 'react-router';
import Swal from 'sweetalert2';
import UpdateScholarshipModal from '../../Modals/UpdateScholarshipModal';

const AllScholarshipRow = ({scholarship}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedScholarship, setSelectedScholarship] = useState(null);

    const handleEdit = (scholarship) => {
     setSelectedScholarship(scholarship);
     setModalOpen(true);
    };
    const queryClient = useQueryClient();

const deleteMutation = useMutation({
  mutationFn: async (id) => {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/deletescholarship/${id}`);
    return res.data;
  },
  onSuccess: (data) => {
    if (data.deletedCount) {
      Swal.fire("Deleted!", "scholarship has been deleted.", "success");
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

    const {_id}=scholarship
    return (
        <>
            <tr>
        <td>{scholarship?.scholarshipName}</td>
        <td>{scholarship?.universityName}</td>
        <td>{scholarship?.subjectCategory}</td>
        <td>{scholarship?.degree}</td>
        <td>{scholarship?.applicationFees}</td>
        <th>
            <NavLink to={`/scholarshipdetails/${scholarship?._id}`}>
<button className="btn btn-xs">Details</button>
        </NavLink>
            <button onClick={() => handleEdit(scholarship)} className="btn  btn-xs">Edit</button>
            <button onClick={()=>handleDelete(_id)} className="btn  btn-xs">Delete</button>
        
            
          
        </th>
      </tr>
      <UpdateScholarshipModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        scholarship={selectedScholarship}
        />
        </>
    );
};

export default AllScholarshipRow;