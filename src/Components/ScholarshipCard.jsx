import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import { NavLink } from 'react-router';



const SchoarshipCard = ({scholarship}) => {
  const  {_id,universityName,
    scholarshipName,
universityImage,
scholarshipCategory,
universityCity,
universityCountry,
applicationDeadline,
subjectCategory,
applicationFees,
Rating
}=scholarship
    return (
        <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <img src={universityImage} alt={universityName} className="h-[400px] w-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xl font-semibold">{universityName}</h2>

        <div className="text-sm">
          <p><strong>Scholarship:</strong> {scholarshipName}</p>
          <p><strong>Location:</strong> {universityCity}</p>
          <p><strong>Deadline:</strong> {applicationDeadline}</p>
          <p><strong>Subject:</strong> {subjectCategory}</p>
          <p><strong>Application Fees:</strong> {applicationFees}</p>
          <p><strong>Rating:</strong> ⭐ {Rating}</p>
        </div>

        <div className="card-actions justify-end mt-4">
          <NavLink to={`/scholarshipdetails/${_id}`}>
<button className="btn btn-primary">Details</button>
        </NavLink>
        </div>
        
      </div>
    </div>
    );
};

export default SchoarshipCard;