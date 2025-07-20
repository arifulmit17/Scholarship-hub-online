import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import ManageReviewRow from './ManageReviewRow';

const ManageReview = () => {
    const {data,isLoading,refetch}=useQuery({
            queryKey:['review'],
            queryFn:async ()=>{
                const {data}=await axios(`${import.meta.env.VITE_API_URL}/review`)
                return data
            },
            initialData:[]
            
        })


    return (
        <div>
             <table className="table">
    {/* head */}
    <thead>
      <tr className='dark:text-white'>
        
        <th>University Name</th>
        <th>Subject category</th>
        <th>Reviewer Name</th>
        <th>Review Date</th>
        <th>Review Comment</th>
        <th>Rating point</th>
      </tr>
    </thead>
    <tbody>
        {/* row */}
      {
                data.map(rev=><ManageReviewRow key={rev._id} rev={rev}></ManageReviewRow>)
            }
    </tbody>
    
  </table>
            
        </div>
    );
};

export default ManageReview;