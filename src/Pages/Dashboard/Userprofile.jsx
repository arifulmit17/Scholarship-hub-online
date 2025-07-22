import React, { use } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import useRole from '../../hooks/useRole';

const Userprofile = () => {
    const {user}=use(AuthContext)
    const role=useRole()
    
    return (
        <div>
            <img src={user.photoURL} alt="" />
            <h1>Name: {user.displayName}</h1>
            <h2>Email: {user.email}</h2>
            <h2>Role: {role}</h2>

        </div>
    );
};

export default Userprofile;