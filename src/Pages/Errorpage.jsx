import React from 'react';
import { NavLink } from 'react-router';

const ErrorPage = () => {
    return (
        <div className='w-full gap-5 h-[100vh] flex flex-col justify-center items-center'>
            <h1 className='text-7xl'><span className='text-blue-600'>404</span></h1>
            <h1 className='text-4xl'>Page not found</h1>
            <NavLink to={'/'}> <button className='btn bg-blue-400 text-white'>Home Page</button> </NavLink>
        </div>
    );
};

export default ErrorPage;