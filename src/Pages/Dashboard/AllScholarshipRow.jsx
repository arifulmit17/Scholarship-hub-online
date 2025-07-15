import React from 'react';
import { NavLink } from 'react-router';

const AllScholarshipRow = ({scholarship}) => {
    console.log(scholarship);
    return (
        <>
            <tr>
        <td>{scholarship?.scholarshipName}</td>
        <td>{scholarship?.universityName}</td>
        <td>{scholarship?.subjectCategory}</td>
        <td>{scholarship?.degree}</td>
        <td>{scholarship?.applicationFees}</td>
        

    
        
        <th>
            <NavLink to={`/scholarshipdetails/${scholarship?._id}`}>
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