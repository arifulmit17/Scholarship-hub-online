import React, { use } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { NavLink, useParams } from 'react-router';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const ScholarshipDetails = () => {
    const {user}=use(AuthContext)
    const param=useParams()
    const {data,isLoading,refetch}=useQuery({
        queryKey:['scholarship',param.id],
        queryFn:async ()=>{
            const {data}=await axios(`${import.meta.env.VITE_API_URL}/scholarship/${param.id}`)
            return data
        },
        initialData:[]
        
    })
    console.log(data);
    
    const  {_id,universityName,
universityImage,
scholarshipCategory,
universityCity,
applicationDeadline,
subjectCategory,
Subject_name,
Scholarship_Description,
Stipend,
applicationFees,
serviceCharge,
postDate,
Rating
} = data

    return (
        <div className="card bg-base-100 shadow-xl w-full max-w-md">
      <figure>
        <img
          src={universityImage}
          alt={universityName}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body text-sm space-y-1">
        <h2 className="card-title text-lg">{universityName}</h2>
        <p><strong>Location:</strong> {universityCity}</p>
        <p><strong>Rating:</strong> ⭐ {Rating}</p>
        <p><strong>Scholarship:</strong> {scholarshipCategory}</p>
        <p><strong>Subject:</strong> {Subject_name} ({subjectCategory})</p>
        <p><strong>Description:</strong> {Scholarship_Description}</p>
        <p><strong>Stipend:</strong> {Stipend}</p>
        <p><strong>Application Deadline:</strong> {applicationDeadline}</p>
        <p><strong>Application Fees:</strong> {applicationFees}</p>
        <p><strong>Service Charge:</strong> {serviceCharge}</p>
        <p><strong>Post Date:</strong> {postDate}</p>
        <div className="card-actions justify-end mt-3">
            <NavLink to={'/payment'} state={{ scholarship: {scholarship_id:{_id}, name: {universityName}, scholarship_category:{scholarshipCategory},subject_category:{subjectCategory} } }}>
<button  className="btn btn-primary btn-sm">Apply Scholarship</button>
            </NavLink>
          
        </div>
      </div>
    </div>
    );
};

export default ScholarshipDetails;