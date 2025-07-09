import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';


const Navbar = () => {
    const {user, LogOutUser}=use(AuthContext);

  
  
  const handleLogout=()=>{
      LogOutUser().then(()=>{

        console.log('signout successful');
      })
      .catch(error=>{
        console.log(error);
      })
    }
    const links=<>
      <li><Link to={'/'}>Home</Link></li>
      {/* <li><NavLink to={'/findtutors'}>All Tutors and Tutorials</NavLink></li>
      <li><Link to={'/addtutorials'}>Add Tutorials</Link></li>
      {user && <><li><Link to={`/mytutorials/${user?.email}`}>My Tutorials</Link></li></>}
      {user && <><li><Link to={`/mytutors/${user?.email}`}>My Tutors </Link></li></>} */}
      <li><Link to={'/register'}>Register</Link></li>
    </>
    return (
        <div className="navbar sticky top-0 z-[100] dark:text-white ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <a className="btn btn-ghost ml-7 text-xl"> <span className='text-green-500 '>Scholarship-</span>Hub</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  <div className="navbar-end">
    
      <input type="checkbox" value="night" className="mx-1 lg:mx-5 toggle theme-controller" />

    {user? <>
      
      <div className="w-10 mx-5">
      
          <img className='rounded-full myDIV'
            alt="Tailwind CSS Navbar component"
            
            src={`${user? user.photoURL: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'}`} />
        <div className="hide">{user.displayName}
        </div>
        
        </div>
      <a onClick={handleLogout} id='logout' className='btn btn-primary mr-10'>Log out</a>
    </> : <NavLink className='btn btn-primary mr-10'  to={'/login'}>Login</NavLink>}
  </div>
</div>
    );
};

export default Navbar;