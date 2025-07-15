import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import UserRow from './UserRow';

const ManageUsers = () => {
    const [selectedRole, setSelectedRole] = useState('all');
    const {data,isLoading,refetch}=useQuery({
            queryKey:['user'],
            queryFn:async ()=>{
                const {data}=await axios(`${import.meta.env.VITE_API_URL}/user`)
                return data
            },
            initialData:[]
            
        })
        const filteredData =
    selectedRole === 'all'
      ? data
      : data.filter((user) => user.role === selectedRole);
        
    return (
         <div>
            <div className="flex justify-end mb-4">
  <select
    value={selectedRole}
    onChange={(e) => setSelectedRole(e.target.value)}
    className="p-2 border rounded"
  >
    <option value="all">All Roles</option>
    <option value="admin">Admin</option>
    <option value="user">User</option>
    <option value="moderator">Moderator</option>
  </select>
</div>
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
        filteredData.map(user=><UserRow key={user._id} user={user}></UserRow>)
      }
    </tbody>
    
  </table>
         </div>
    );
};

export default ManageUsers;