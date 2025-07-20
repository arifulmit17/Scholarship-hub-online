import React from 'react';
import Sidebar from '../Pages/Dashboard/Sidebar';
import { Outlet } from 'react-router';

const DashboardLayout = () => {
    return (
        <div className='relative min-h-screen md:flex '>
        
      {/* Left Side: Sidebar Component */}
      <Sidebar></Sidebar>
      {/* Right Side: Dashboard Dynamic Content */}
      <div className='w-full '>
        <div className='p-5'>
          
          <Outlet/>
        </div>
      </div>
    </div>
    );
};

export default DashboardLayout;