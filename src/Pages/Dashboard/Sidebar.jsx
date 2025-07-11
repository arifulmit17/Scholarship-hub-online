import React, { use } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../Contexts/AuthContext';


const Sidebar = () => {
  const {user}=use(AuthContext)
    return (
        <div className=" lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <label htmlFor="my-drawer-2" className="btn btn-primary border-none bg-green-300 text-black drawer-button lg:hidden">
      Open drawer
    </label>
  
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-green-200 text-base-content min-h-full w-80 p-4">
      {/* Sidebar content here */}
       <li><Link to={'/'}>Home</Link></li>
      {user && <><li><Link to={'myprofile'}>My Profile </Link></li></>}
      {user && <><li><Link to={'myapplication'}>My Applications </Link></li></>}
      {user && <><li><Link to={'myreviews'}>My Reviews </Link></li></>}
    </ul>
  </div>
</div>
    );
};

export default Sidebar;