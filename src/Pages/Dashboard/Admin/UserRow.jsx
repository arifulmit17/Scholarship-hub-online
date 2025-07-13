import React from 'react';

const UserRow = ({user}) => {
    return (
        <div>
            <>
            <tr>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={user.image}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
          </div>
        </td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        
        <th>
            <button  className="btn text-white bg-green-600 btn-xs">Delete</button>
        
            
          
        </th>
      </tr>
        </>
        </div>
    );
};

export default UserRow;