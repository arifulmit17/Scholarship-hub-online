import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import ApplicationRow from './ApplicationRow';

const ManageApplications = () => {
    const [selectedAppliedDate, setSelectedAppliedDate] = useState('');
    const [selectedDeadline, setSelectedDeadline] = useState('');
    const {data,isLoading,refetch}=useQuery({
        queryKey:['applications'],
        queryFn:async ()=>{
            const {data}=await axios(`${import.meta.env.VITE_API_URL}/applications/`)
            return data
        },
        initialData:[]
        
    })
    const appliedDates = [...new Set(data.map(app => app.date?.slice(0, 10)))];
  const applicationDeadlines = [...new Set(data.map(app => app.applicationDeadline?.slice(0, 10)))];
    
  const filteredData = data.filter(app => {
    const matchesAppliedDate = selectedAppliedDate ? app.date?.startsWith(selectedAppliedDate) : true;
    const matchesDeadline = selectedDeadline ? app.applicationDeadline?.startsWith(selectedDeadline) : true;
    return matchesAppliedDate && matchesDeadline;
  });
    return (
        <div>
            <select
          value={selectedAppliedDate}
          onChange={(e) => setSelectedAppliedDate(e.target.value)}
          className="select select-bordered"
        >
          <option value="">Filter by Applied Date</option>
          {appliedDates.map(date => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>

        <select
          value={selectedDeadline}
          onChange={(e) => setSelectedDeadline(e.target.value)}
          className="select select-bordered"
        >
          <option value="">Filter by Application Deadline</option>
          {applicationDeadlines.map(date => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>
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
        filteredData.map(app=><ApplicationRow key={app._id} app={app}></ApplicationRow>)
      }
    </tbody>
    
  </table>
        </div>
    );
};

export default ManageApplications;