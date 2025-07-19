import React, { use, useState } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { NavLink, useParams } from 'react-router';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const ScholarshipDetails = () => {
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
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
    const {data: reviews}=useQuery({
        queryKey:['review'],
        queryFn:async ()=>{
            const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/reviews/${param.id}`)
            return data
        },
        initialData:[]
        
    })
  
    
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
      <div>
        <div>
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
        <p><strong>Application Deadline:</strong> {applicationDeadline}</p>
        <p><strong>Application Fees:</strong> {applicationFees}</p>
        <p><strong>Service Charge:</strong> {serviceCharge}</p>
        <p><strong>Post Date:</strong> {postDate}</p>
        <div className="card-actions justify-end mt-3">
            <NavLink to={'/payment'} state={{ scholarship: {scholarship_id:{_id}, name: {universityName}, scholarship_category:{scholarshipCategory},subject_category:{subjectCategory},applicationDeadline:{applicationDeadline} } }}>
<button  className="btn btn-primary btn-sm">Apply Scholarship</button>
            </NavLink>
          
        </div>
      </div>
    </div>
        </div>
        <div>
          {reviews.length > 0 && (
  <div className="mt-8">
    <h3 className="text-xl font-semibold mb-4">Scholarship Reviews</h3>
    
    <div className="relative w-1/2 overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() =>
            setCurrentReviewIndex((prev) =>
              prev === 0 ? reviews.length - 1 : prev - 1
            )
          }
          className="btn btn-sm"
        >
          ❮
        </button>

        <div className="flex-1 text-center px-4">
          <div>
            <img src={reviews[currentReviewIndex]?.userImage} alt="" />
          </div>
          <h1>Reviewer Name : {reviews[currentReviewIndex]?.userName}</h1>
          <p className="italic text-sm">“{reviews[currentReviewIndex]?.review}”</p>
          <p className="text-xs text-gray-500 mt-2">
            Rating: ⭐ {reviews[currentReviewIndex]?.rating}
          </p>
          <h4>Date: {reviews[currentReviewIndex]?.reviewDate}</h4>
        </div>

        <button
          onClick={() =>
            setCurrentReviewIndex((prev) =>
              prev === reviews.length - 1 ? 0 : prev + 1
            )
          }
          className="btn btn-sm"
        >
          ❯
        </button>
      </div>
    </div>
  </div>
)}
        </div>
      </div>
        
    );
};

export default ScholarshipDetails;