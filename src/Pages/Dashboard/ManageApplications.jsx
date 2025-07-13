import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import ApplicationRow from './ApplicationRow';

const ManageApplications = () => {
    const {data,isLoading,refetch}=useQuery({
        queryKey:['applications'],
        queryFn:async ()=>{
            const {data}=await axios(`${import.meta.env.VITE_API_URL}/applications/`)
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
        <th>Applicant Name</th>
        <th>Application status</th>
        <th>Degree</th>
        <th>Hsc Result</th>
        <th>Ssc Result</th>
        <th>Study Gap</th>
      </tr>
    </thead>
    <tbody>
        {/* row */}
      {
        data.map(app=><ApplicationRow key={app._id} app={app}></ApplicationRow>)
      }
    </tbody>
    
  </table>
        </div>
    );
};

export default ManageApplications;