// import { Elements } from '@stripe/react-stripe-js';
// import React from 'react';
// import { NavLink } from 'react-router';



// const SchoarshipCard = ({scholarship}) => {
//   const  {_id,universityName,
//     scholarshipName,
// universityImage,
// scholarshipCategory,
// universityCity,
// universityCountry,
// applicationDeadline,
// subjectCategory,
// applicationFees,
// Rating
// }=scholarship
//     return (
//         <div className="card w-full bg-base-100 shadow-xl">
//       <figure>
//         <img src={universityImage} alt={universityName} className="h-[400px] w-full object-cover" />
//       </figure>
//       <div className="card-body">
//         <h2 className="card-title text-xl font-semibold">{universityName}</h2>

//         <div className="text-sm">
//           <p><strong>Scholarship:</strong> {scholarshipName}</p>
//           <p><strong>Location:</strong> {universityCity}</p>
//           <p><strong>Deadline:</strong> {applicationDeadline}</p>
//           <p><strong>Subject:</strong> {subjectCategory}</p>
//           <p><strong>Application Fees:</strong> {applicationFees}</p>
//           <p><strong>Rating:</strong> ⭐ {Rating}</p>
//         </div>

//         <div className="card-actions justify-end mt-4">
//           <NavLink to={`/scholarshipdetails/${_id}`}>
// <button className="btn btn-primary">Details</button>
//         </NavLink>
//         </div>
        
//       </div>
//     </div>
//     );
// };

// export default SchoarshipCard;
import React from "react";

import { MapPin, Calendar, BookOpen, DollarSign, Star } from "lucide-react";
import { NavLink } from "react-router";

const ScholarshipCard = ({ scholarship }) => {
  const {
    _id,
    universityName,
    scholarshipName,
    universityImage,
    scholarshipCategory,
    universityCity,
    universityCountry,
    applicationDeadline,
    subjectCategory,
    applicationFees,
    Rating,
  } = scholarship;

  return (
    <div className="group relative bg-base-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105">
      {/* Image with gradient overlay */}
      <div className="relative">
        <img
          src={universityImage}
          alt={universityName}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <span className="absolute top-4 left-4 badge badge-secondary px-4 py-2 shadow-md">
          {scholarshipCategory}
        </span>
      </div>

      {/* Card Content */}
      <div className="p-6 space-y-3">
        {/* University Name */}
        <h2 className="text-xl font-bold text-primary group-hover:text-secondary transition">
          {universityName}
        </h2>
        {/* Scholarship Name */}
        <p className="text-sm text-base-content/70 italic">{scholarshipName}</p>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-base-content/80 mt-2">
          <p className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-secondary" />
            {universityCity}, {universityCountry}
          </p>
          <p className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-secondary" />
            Deadline: {applicationDeadline}
          </p>
          <p className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-secondary" />
            Subject: {subjectCategory}
          </p>
          <p className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-secondary" />
            Fees: {applicationFees}
          </p>
          <p className="flex items-center gap-2 col-span-full">
            <Star className="w-4 h-4 text-yellow-400" />
            Rating: {Rating}
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-4 flex justify-end">
          <NavLink to={`/scholarshipdetails/${_id}`}>
            <button className="btn btn-gradient btn-wide rounded-full bg-gradient-to-r from-primary to-secondary text-white transition transform hover:scale-105">
              View Details
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;
