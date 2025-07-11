import React from 'react';
import { NavLink } from 'react-router';

const SchoarshipCard = ({scholarship}) => {
    console.log(scholarship);
  const  {_id,University_Name,
University_Image,
Scholarship_category,
University_location,
Application_Deadline,
Subject_Category,
Application_Fees,
Rating
}=scholarship
    return (
        <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <img src={University_Image} alt={University_Name} className="h-48 w-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xl font-semibold">{University_Name}</h2>

        <div className="text-sm">
          <p><strong>Scholarship:</strong> {Scholarship_category}</p>
          <p><strong>Location:</strong> {}</p>
          <p><strong>Deadline:</strong> {Application_Deadline}</p>
          <p><strong>Subject:</strong> {Subject_Category}</p>
          <p><strong>Application Fees:</strong> {Application_Fees}</p>
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