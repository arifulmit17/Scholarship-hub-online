import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { use } from 'react';
import { AuthContext } from '../../../Contexts/AuthContext';
import MyApplicationRow from './MyApplicationRow';

const MyApplications = () => {
    const {user}=use(AuthContext)
    const token=localStorage.getItem('token')
    const {data,isLoading,refetch}=useQuery({
        queryKey:['application',user?.email],
        queryFn:async ()=>{
            const {data}=await axios(`${import.meta.env.VITE_API_URL}/application/${user?.email}`,
                {headers:{
                    Authorization: `Bearer ${token}`
                }}
            )
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
        <th>University Address</th>
        <th>Application Feedback</th>
        <th>Subject Category</th>
        <th>Applied Degree</th>
        <th>Application Fees</th>
        <th>Service Charge</th>
        <th>Application Status</th>
    


      </tr>
    </thead>
    <tbody>
        {/* row */}
      {
        data.map(app=><MyApplicationRow key={app._id} app={app}></MyApplicationRow>)
      }
    </tbody>
    
  </table>
        </div>
    );
};

export default MyApplications;