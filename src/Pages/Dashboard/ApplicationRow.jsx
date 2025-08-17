import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { NavLink } from 'react-router';
import FeedbackModal from '../../Modals/FeedbackModal';

const ApplicationRow = ({app}) => {
    const [isOpen, setIsOpen] = useState(false)
    const {_id,userName,applicationStatus,degree,hscResult,sscResult,studyGap,scholarshipId}=app
    const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async status => {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/application/status/update/${_id}`,
        { status }
      )
      return data
    },
    onSuccess: data => {
      // refetch()
      // invalidate query
      queryClient.invalidateQueries(['users'])
    },
    onError: error => {
      console.log(error)
    },
  })

    const handleStatus=()=>{
        const changedStatus="rejected"
        mutation.mutate(changedStatus)
    }
    const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    mutation.mutate(selectedStatus);
  };

    
    
    return (
       
            <>
    <tr>
        <td>{userName}</td>
        <td>{applicationStatus}</td>
        <td>
          <select
            className="select select-bordered select-sm"
            value={applicationStatus}
            onChange={handleStatusChange}
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </td>
        <td>{degree}</td>
        <td>{hscResult}</td>
        <td>{sscResult}</td>
        <td>{studyGap}</td>
      <th>
        
           <NavLink to={`/dashboard/applicationdetails/${scholarshipId}`}>
<button className="btn btn-secondary my-1 btn-xs">Details</button>
        </NavLink>
            <button onClick={() => setIsOpen(true)} className="btn my-1 btn-secondary btn-xs">Feedback</button>
            <button onClick={()=>handleStatus()} className="btn btn-secondary btn-xs">Cancel</button>
         
        </th>
      
      
      </tr>
        <FeedbackModal _id={_id} isOpen={isOpen} setIsOpen={setIsOpen}></FeedbackModal>
        </>
        
    );
};

export default ApplicationRow;