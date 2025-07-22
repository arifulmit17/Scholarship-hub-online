import React, { use } from 'react';

import { Navigate } from 'react-router';

import useRole from './../hooks/useRole';
import { AuthContext } from '../Contexts/AuthContext';

const ModeratorandAdminRoute = ({children}) => {
    const {user,loader}=use(AuthContext);
    const role=useRole()
    
    if(loader){
        return <span className="loading loading-bars loading-xl"></span>
    }
    if(role=='admin' || role=='moderator'){
        return children;
    }
    return <Navigate to='/'></Navigate>
    
};

export default ModeratorandAdminRoute;