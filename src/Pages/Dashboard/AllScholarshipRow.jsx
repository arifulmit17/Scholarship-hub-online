import React from 'react';
import { NavLink } from 'react-router';

const AllScholarshipRow = ({scholarship}) => {
    console.log(scholarship);
    return (
        <>
            <tr>
        <td>{scholarship?.name}</td>
        <td>{scholarship?.University_Name}</td>
        <td>{scholarship?.Subject_category}</td>
        <td>{scholarship?.degree}</td>
        <td>{scholarship?.Application_Fees}</td>
        

    
        
        <th>
            <NavLink to={`/dashboard/applicationdetails/${scholarship?._id}`}>
<button className="btn btn-xs">Details</button>
        </NavLink>
            <button  className="btn  btn-xs">Edit</button>
            <button  className="btn  btn-xs">Delete</button>
        
            
          
        </th>
      </tr>
        </>
    );
};

export default AllScholarshipRow;