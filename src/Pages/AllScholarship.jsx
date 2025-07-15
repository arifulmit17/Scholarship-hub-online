import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import ScholarshipCard from '../Components/ScholarshipCard';

const AllScholarship = () => {
    const [searchText, setSearchText] = useState('');
    const {data,isLoading,refetch}=useQuery({
        queryKey:['scholarship'],
        queryFn:async ()=>{
            const {data}=await axios(`${import.meta.env.VITE_API_URL}/scholarship`)
            return data
        },
        initialData:[]
        
    })
    const filteredScholarships = data.filter((item) =>
    [item.scholarshipName, item.universityName, item.degree]
      .some((field) =>
        field?.toLowerCase().includes(searchText.toLowerCase())
      )
    );
    return (
        <div >
            <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Scholarship, University, or Degree"
          className="input input-bordered w-full max-w-md"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
            {filteredScholarships.length === 0 ? (
      <div className="text-center text-gray-500 mt-10">
        No scholarship available
      </div>
    ) : (
      filteredScholarships.map((scholarship) => (
        <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
      ))
    )}
        </div>
    );
};

export default AllScholarship;