// import React, { use, useState } from 'react';
// import { AuthContext } from '../Contexts/AuthContext';
// import { NavLink, useParams } from 'react-router';
// import axios from 'axios';
// import { useQuery } from '@tanstack/react-query';

// const ScholarshipDetails = () => {
//     const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
//     const {user}=use(AuthContext)
//     const param=useParams()
//     const {data,isLoading,refetch}=useQuery({
//         queryKey:['scholarship',param.id],
//         queryFn:async ()=>{
//             const {data}=await axios(`${import.meta.env.VITE_API_URL}/scholarship/${param.id}`)
//             return data
//         },
//         initialData:[]
        
//     })
//     const {data: reviews}=useQuery({
//         queryKey:['review'],
//         queryFn:async ()=>{
//             const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/reviews/${param.id}`)
//             return data
//         },
//         initialData:[]
        
//     })
  
    
//     const  {_id,universityName,
// universityImage,
// scholarshipCategory,
// universityCity,
// applicationDeadline,
// subjectCategory,
// Subject_name,
// description,
// Stipend,
// applicationFees,
// serviceCharge,
// postDate,
// Rating
// } = data

//     return (
//       <div>
//         <div>
// <div className="card bg-base-100 shadow-xl w-full max-w-md">
//       <figure>
//         <img
//           src={universityImage}
//           alt={universityName}
//           className="w-full h-48 object-cover"
//         />
//       </figure>
//       <div className="card-body text-sm space-y-1">
//         <h2 className="card-title text-lg">{universityName}</h2>
//         <p><strong>Location:</strong> {universityCity}</p>
//         <p><strong>Rating:</strong> ⭐ {Rating}</p>
//         <p><strong>Scholarship:</strong> {scholarshipCategory}</p>
//         <p><strong>Subject:</strong> {Subject_name} ({subjectCategory})</p>
//         <p><strong>Description:</strong> {description}</p>
//         <p><strong>Application Deadline:</strong> {applicationDeadline}</p>
//         <p><strong>Application Fees:</strong> {applicationFees}</p>
//         <p><strong>Service Charge:</strong> {serviceCharge}</p>
//         <p><strong>Post Date:</strong> {postDate}</p>
//         <div className="card-actions justify-end mt-3">
//             <NavLink to={'/payment'} state={{ scholarship: {scholarship_id:{_id}, name: {universityName}, scholarship_category:{scholarshipCategory},subject_category:{subjectCategory},applicationDeadline:{applicationDeadline},applicationFees:{applicationFees} } }}>
// <button  className="btn btn-primary btn-sm">Apply Scholarship</button>
//             </NavLink>
          
//         </div>
//       </div>
//     </div>
//         </div>
//         <div>
//           {reviews.length > 0 && (
//   <div className="mt-8">
//     <h3 className="text-xl font-semibold mb-4">Scholarship Reviews</h3>
    
//     <div className="relative w-1/2 overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg shadow p-6">
//       <div className="flex items-center justify-between">
//         <button
//           onClick={() =>
//             setCurrentReviewIndex((prev) =>
//               prev === 0 ? reviews.length - 1 : prev - 1
//             )
//           }
//           className="btn btn-sm"
//         >
//           ❮
//         </button>

//         <div className="flex-1 text-center px-4">
//           <div>
//             <img src={reviews[currentReviewIndex]?.userImage} alt="" />
//           </div>
//           <h1>Reviewer Name : {reviews[currentReviewIndex]?.userName}</h1>
//           <p className="italic text-sm">“{reviews[currentReviewIndex]?.review}”</p>
//           <p className="text-xs text-gray-500 mt-2">
//             Rating: ⭐ {reviews[currentReviewIndex]?.rating}
//           </p>
//           <h4>Date: {reviews[currentReviewIndex]?.reviewDate}</h4>
//         </div>

//         <button
//           onClick={() =>
//             setCurrentReviewIndex((prev) =>
//               prev === reviews.length - 1 ? 0 : prev + 1
//             )
//           }
//           className="btn btn-sm"
//         >
//           ❯
//         </button>
//       </div>
//     </div>
//   </div>
// )}
//         </div>
//       </div>
        
//     );
// };

// export default ScholarshipDetails;

import React, { use, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { NavLink, useParams } from "react-router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  MapPin,
  Star,
  BookOpen,
  Calendar,
  DollarSign,
  FileText,
} from "lucide-react";

const ScholarshipDetails = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const { user } = use(AuthContext);
  const param = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["scholarship", param.id],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/scholarship/${param.id}`
      );
      return data;
    },
    initialData: {},
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/reviews/${param.id}`
      );
      return data;
    },
    initialData: [],
  });

  const {
    _id,
    universityName,
    universityImage,
    scholarshipCategory,
    universityCity,
    applicationDeadline,
    subjectCategory,
    Subject_name,
    description,
    applicationFees,
    serviceCharge,
    postDate,
    Rating,
  } = data;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Scholarship Card */}
      <div className="card w-1/2 mx-auto bg-base-300 shadow-xl rounded-2xl border border-gray-200 hover:shadow-2xl transition duration-300">
        <figure className="relative">
          <img
            src={universityImage}
            alt={universityName}
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          <span className="absolute top-3 left-3 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow">
            {scholarshipCategory}
          </span>
        </figure>
        <div className="card-body space-y-3">
          <h2 className="text-2xl font-bold text-secondary">
            {universityName}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-secondary">
            <p className="flex items-center gap-2">
              <MapPin size={16} /> {universityCity}
            </p>
            <p className="flex items-center gap-2">
              <Star size={16} className="text-yellow-500" /> {Rating} / 5
            </p>
            <p className="flex items-center gap-2 text-secondary">
              <BookOpen size={16} /> {Subject_name} ({subjectCategory})
            </p>
            <p className="flex items-center gap-2 text-secondary">
              <Calendar size={16} /> Deadline: {applicationDeadline}
            </p>
            <p className="flex items-center gap-2 text-secondary">
              <DollarSign size={16} /> Fees: ${applicationFees}
            </p>
            <p className="flex items-center gap-2 text-secondary">
              <DollarSign size={16} /> Service: ${serviceCharge}
            </p>
            <p className="flex items-center gap-2 col-span-2 text-secondary">
              <FileText size={16} /> Post Date: {postDate}
            </p>
          </div>

          <p className="text-secondary leading-relaxed">{description}</p>

          <div className="card-actions justify-end mt-4">
            <NavLink
              to={"/payment"}
              state={{
                scholarship: {
                  scholarship_id: _id,
                  name: universityName,
                  scholarship_category: scholarshipCategory,
                  subject_category: subjectCategory,
                  applicationDeadline,
                  applicationFees,
                },
              }}
            >
              <button className="btn btn-secondary btn-sm px-6 rounded-full shadow hover:scale-105 transition duration-300">
                Apply Now 🚀
              </button>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <div className="bg-base-100 p-6 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-center">Scholarship Reviews</h3>
          <div className="relative flex items-center">
            {/* Prev button */}
            <button
              onClick={() =>
                setCurrentReviewIndex((prev) =>
                  prev === 0 ? reviews.length - 1 : prev - 1
                )
              }
              className="btn btn-circle btn-outline absolute left-0"
            >
              ❮
            </button>

            {/* Review Card */}
            <div className="mx-auto w-full lg:w-2/3 bg-white shadow-md rounded-xl p-6 text-center">
              <div className="flex flex-col items-center space-y-3">
                <img
                  src={reviews[currentReviewIndex]?.userImage}
                  alt="Reviewer"
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <h4 className="font-semibold">{reviews[currentReviewIndex]?.userName}</h4>
                <p className="italic text-gray-600">
                  “{reviews[currentReviewIndex]?.review}”
                </p>
                <p className="text-sm text-gray-500">
                  ⭐ {reviews[currentReviewIndex]?.rating} | {reviews[currentReviewIndex]?.reviewDate}
                </p>
              </div>
            </div>

            {/* Next button */}
            <button
              onClick={() =>
                setCurrentReviewIndex((prev) =>
                  prev === reviews.length - 1 ? 0 : prev + 1
                )
              }
              className="btn btn-circle btn-outline absolute right-0"
            >
              ❯
            </button>
          </div>
        </div>
      )}
            
    </div>
  );
};

export default ScholarshipDetails;
