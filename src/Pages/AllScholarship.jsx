import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import ScholarshipCard from '../Components/ScholarshipCard';

const AllScholarship = () => {
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
        <div >
            {
                data.map(scholarship=><ScholarshipCard  scholarship={scholarship}></ScholarshipCard>)
            }
        </div>
    );
};

export default AllScholarship;