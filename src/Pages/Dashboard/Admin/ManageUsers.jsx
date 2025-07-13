import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import UserRow from './UserRow';

const ManageUsers = () => {
    const {data,isLoading,refetch}=useQuery({
            queryKey:['user'],
            queryFn:async ()=>{
                const {data}=await axios(`${import.meta.env.VITE_API_URL}/user`)
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
        <th>Image</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
        {/* row */}
      {
        data.map(user=><UserRow key={user._id} user={user}></UserRow>)
      }
    </tbody>
    
  </table>
         </div>
    );
};

export default ManageUsers;