import React, { use } from 'react';
import { AuthContext } from '../../../Contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import MyReviewRow from './MyReviewRow';

const MyReviews = () => {
    const {user}=use(AuthContext)
        const {data,isLoading,refetch}=useQuery({
            queryKey:['review',user?.email],
            queryFn:async ()=>{
                const {data}=await axios(`${import.meta.env.VITE_API_URL}/review/${user?.email}`)
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
        
        <th>Scholarship Name</th>
        <th>University Name</th>
        <th>Review Comment</th>
        <th>Review Date</th>
        <th>Rating</th>
      </tr>
    </thead>
    <tbody>
        {/* row */}
      {
        data.map(rev=><MyReviewRow key={rev._id} rev={rev} user={user}></MyReviewRow>)
      }
    </tbody>
    
  </table>
        </div>
    );
};

export default MyReviews;