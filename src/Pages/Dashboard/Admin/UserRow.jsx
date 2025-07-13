import { useQueryClient, useMutation} from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const UserRow = ({user}) => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async role => {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/user/role/update/${user.email}`,
        { role }
      )
      return data
    },
    onSuccess: data => {
      console.log(data)
      // refetch()
      // invalidate query
      queryClient.invalidateQueries(['users'])
    },
    onError: error => {
      console.log(error)
    },
  })
    const handleChange=e=>{
      
      const changedRole=e.target.value;
      console.log(changedRole);
      mutation.mutate(changedRole)

    }
    return (
        
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

        <td className='w-[150px]'><select onChange={handleChange} defaultValue={user?.role} className="select select-sm">
          {/* <option disabled={true}>User</option> */}
          <option value={"user"}>User</option>
          <option value={"moderator"}>Moderator</option>
            <option value={"admin"}>Admin</option>
          </select></td>
        
        <th>
            <button  className="btn text-white bg-green-600 btn-xs">Delete</button>
        
            
          
        </th>
      </tr>
        </>
        
    );
};

export default UserRow;