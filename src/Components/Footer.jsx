import React, { use } from 'react';
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
const Footer = () => {
  const {user}=use(AuthContext)
    return (
        <footer className="footer footer-horizontal footer-center dark:text-white bg-gray-50 text-base-content rounded p-10">
  <nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <li><NavLink to={'/allscholarship'}>All Scholarships</NavLink></li>
        <li><NavLink to={'/dashboard'}>Dashboard</NavLink></li>
        <li><Link to={'/register'}>Register</Link></li>
    
  </nav>
  <nav>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a target='blank' href='https://x.com/i/flow/login'>
          <FaTwitter size={30} />
    
          </a>
          <a target='blank' href='https://www.facebook.com/'>
          <FaFacebook size={30} />
    
          </a>
          <a target='blank' href='https://www.youtube.com/'>
          <FaYoutube size={30} />
    
          </a>
        </div>
    </nav>
            <aside>
              <p>Copyright © {new Date().getFullYear()} - All right reserved by Scholarship Hub  Ltd</p>
            </aside>
    </footer>
    );
};

export default Footer;