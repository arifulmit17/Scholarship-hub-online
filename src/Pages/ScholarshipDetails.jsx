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
    const  {_id,University_Name,
University_Image,
Scholarship_category,
University_location,
Application_Deadline,
Subject_Category,
Subject_name,
Scholarship_Description,
Stipend,
Application_Fees,
Service_Charge,
Post_Date,
Rating
} = data

    return (
        <div className="card bg-base-100 shadow-xl w-full max-w-md">
      <figure>
        <img
          src={University_Image}
          alt={University_Name}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body text-sm space-y-1">
        <h2 className="card-title text-lg">{University_Name}</h2>
        <p><strong>Location:</strong> {}</p>
        <p><strong>Rating:</strong> ⭐ {Rating}</p>
        <p><strong>Scholarship:</strong> {Scholarship_category}</p>
        <p><strong>Subject:</strong> {Subject_name} ({Subject_Category})</p>
        <p><strong>Description:</strong> {Scholarship_Description}</p>
        <p><strong>Stipend:</strong> {Stipend}</p>
        <p><strong>Application Deadline:</strong> {Application_Deadline}</p>
        <p><strong>Application Fees:</strong> {Application_Fees}</p>
        <p><strong>Service Charge:</strong> {Service_Charge}</p>
        <p><strong>Post Date:</strong> {Post_Date}</p>
        <div className="card-actions justify-end mt-3">
            <NavLink to={'/payment'} state={{ scholarship: {scholarship_id:{_id}, name: {University_Name}, scholarship_category:{Scholarship_category},subject_category:{Subject_Category} } }}>
<button  className="btn btn-primary btn-sm">Apply Scholarship</button>
            </NavLink>
          
        </div>
      </div>
    </div>
    );
};

export default ScholarshipDetails;