// import React, { use } from 'react';
// import { AuthContext } from '../../Contexts/AuthContext';
// import useRole from '../../hooks/useRole';

// const Userprofile = () => {
//     const {user}=use(AuthContext)
//     const role=useRole()
    
//     return (
//         <div>
//             <img className='w-[200px]' src={user.photoURL} alt="" />
//             <h1>Name: {user.displayName}</h1>
//             <h2>Email: {user.email}</h2>
//             <h2>Role: {role}</h2>

//         </div>
//     );
// };

// export default Userprofile;
import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import useRole from '../../hooks/useRole';

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const role = useRole();

  return (
    <div className="max-w-sm mx-auto mt-12 p-6 bg-base-100 rounded-2xl shadow-lg text-center">
      {/* Avatar */}
      <img
        className="w-32 h-32 mx-auto rounded-full border-4 border-primary shadow-md"
        src={user.photoURL}
        alt={user.displayName}
      />

      {/* Name */}
      <h1 className="mt-4 text-2xl font-bold text-primary">{user.displayName}</h1>

      {/* Email */}
      <p className="mt-2 text-base-content/80">{user.email}</p>

      {/* Role Badge */}
      <span className="inline-block mt-3 px-4 py-1 text-sm font-semibold rounded-full bg-secondary text-white">
        {role}
      </span>

    </div>
  );
};

export default UserProfile;
