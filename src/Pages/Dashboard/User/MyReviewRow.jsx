import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const MyReviewRow = ({rev}) => {
    const {review,reviewDate,scholarshipId}=rev || {}
    const {data,isLoading,refetch}=useQuery({
        queryKey:['scholarship',scholarshipId],
        queryFn:async ()=>{
            const {data}=await axios(`${import.meta.env.VITE_API_URL}/scholarship/${scholarshipId}`)
            return data
        },
        initialData:[]
        
    })
    const {scholarshipName,universityName}=data
    return (
        <>
            <tr>
        <td>{scholarshipName}</td>
        <td>{universityName}</td>
        <td>{review}</td>
        <td>{reviewDate}</td>
        <th>
            <button  className="btn  btn-xs">Edit</button>
            <button  className="btn  btn-xs">Cancel</button>
        </th>
      </tr>
        </>
    );
};

export default MyReviewRow;