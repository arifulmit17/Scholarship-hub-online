import { useQueryClient, useMutation} from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';

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
    const deleteMutation = useMutation({
  mutationFn: async (id) => {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/deleteuser/${id}`);
    return res.data;
  },
  onSuccess: (data) => {
    if (data.deletedCount) {
      Swal.fire("Deleted!", "user has been deleted.", "success");
      queryClient.invalidateQueries(['users']); 
    }
  },
  onError: () => {
    Swal.fire("Error!", "Something went wrong.", "error");
  },
});
    const handleDelete = (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteMutation.mutate(id);
        }
      });
    };
    
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
            <button onClick={()=>handleDelete(user._id)} className="btn text-white bg-green-600 btn-xs">Delete</button>
        
            
          
        </th>
      </tr>
        </>
        
    );
};

export default UserRow;