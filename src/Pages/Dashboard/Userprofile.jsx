import React, { use } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';

const Userprofile = () => {
    const {user}=use(AuthContext)
    return (
        <div>
            <img src={user.photoURL} alt="" />
            <h1>Name: {user.displayName}</h1>
            <h2>Email: {user.email}</h2>
        </div>
    );
};

export default Userprofile;