import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { NavLink } from 'react-router';

const MyApplicationRow = ({app}) => {
    console.log(app);
    const {scholarshipId,degree,applicationStatus}=app
    console.log(scholarshipId);

    const {data,isLoading,refetch}=useQuery({
        queryKey:['scholarship',scholarshipId],
        queryFn:async ()=>{
            const {data}=await axios(`${import.meta.env.VITE_API_URL}/scholarship/${scholarshipId}`)
            return data
        },
        initialData:[]
        
    })
    console.log(data);
    const {University_Name,University_location,Subject_category,Application_Fees,Service_Charge}=data || {}
    return (
        <>
            <tr>
        <td>{University_Name}</td>
        {/* <td>{University_location}</td> */}
        {/* <td>{Application_Feedback}</td> */}
        <td>{Subject_category}</td>
        <td>{degree}</td>
        <td>{Application_Fees}</td>
        <td>{Service_Charge}</td>
        <td>{applicationStatus}</td>

    
        
        <th>
            <NavLink to={`/dashboard/applicationdetails/${scholarshipId}`}>
<button className="btn btn-xs">Details</button>
        </NavLink>
            <button  className="btn  btn-xs">Edit</button>
            <button  className="btn  btn-xs">Delete</button>
            <button  className="btn  btn-xs">Add Review</button>
        
            
          
        </th>
      </tr>
        </>
    );
};

export default MyApplicationRow;