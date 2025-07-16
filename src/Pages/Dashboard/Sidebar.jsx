import React, { use } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext';
import useRole from '../../hooks/useRole';


const Sidebar = () => {
  const {user}=use(AuthContext)
  const role=useRole()
    return (
        <div className=" lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <label htmlFor="my-drawer-2" className="btn btn-primary border-none bg-green-300 text-black drawer-button lg:hidden">
      Open drawer
    </label>
  
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-green-200 text-base-content min-h-full w-50 p-4">
      {/* Sidebar content here */}
       <li><Link to={'/'}>Home</Link></li>
      {role=='user' && <><li><Link to={'myapplication'}>My Applications </Link></li></>}
      {role=='user' && <><li><Link to={'myreviews'}>My Reviews </Link></li></>}
      {role=='admin' && <><li><Link to={'addscholarship'}>Add Scholarship </Link></li></>}
      {role=='admin' && <><li><Link to={'managescholarship'}>Manage Scholarship </Link></li></>}
      {role=='admin' && <><li><Link to={'manageappliedapplication'}>Manage Applied Application </Link></li></>}
      {role=='admin' && <><li><Link to={'manageusers'}>Manage Users</Link></li></>}
      {role=='admin' && <><li><Link to={'managereview'}>Manage Review </Link></li></>}
      {role=='moderator' && <><li><Link to={'addscholarship'}>Add Scholarship </Link></li></>}
      {role=='moderator' && <><li><Link to={'managescholarship'}>Manage Scholarship </Link></li></>}
      {role=='moderator' && <><li><Link to={'manageappliedapplication'}>Manage Applied Application  </Link></li></>}
      {role=='moderator' && <><li><Link to={'managereview'}>All Reviews </Link></li></>}
    </ul>
  </div>
</div>
    );
};

export default Sidebar;