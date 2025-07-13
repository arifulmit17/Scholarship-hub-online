import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import AllScholarshipRow from './AllScholarshipRow';

const AllScholarshipDashboard = () => {
    const {data,isLoading,refetch}=useQuery({
        queryKey:['scholarship'],
        queryFn:async ()=>{
            const {data}=await axios(`${import.meta.env.VITE_API_URL}/scholarship`)
            return data
        },
        initialData:[]
        
    })
    console.log(data);
    return (
        <div>
            <table className="table">
    {/* head */}
    <thead>
      <tr className='dark:text-white'>
        <th>Scholarship name</th>
        <th>University Name</th>
        <th>Subject Category</th>
        <th>Degree</th>
        <th>Application Fees</th>

      </tr>
    </thead>
    <tbody>
        {/* row */}
      {
        data.map(scholarship=><AllScholarshipRow key={scholarship._id} scholarship={scholarship}></AllScholarshipRow>)
      }
    </tbody>
    
  </table>
        </div>
    );
};

export default AllScholarshipDashboard;