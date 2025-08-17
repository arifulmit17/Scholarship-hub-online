import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './Banner.css'
import { Link } from 'react-router';
const Banner = () => {
    return (
        <div>
        <Carousel showThumbs={false} infiniteLoop autoPlay>
      <div>
        <img className='h-[400px] bg-black' src="https://i.postimg.cc/RFqw8kxt/images-17.jpg" alt="Slide 1" />
        <div className="custom-text-overlay flex flex-col lg:ml-10 items-center md:items-start lg:items-start  relative">
          <h2 className="text-white text-4xl mb-3 font-bold">Apply for scholarship now</h2>
          <Link to={'/register'}>
          <button className='btn btn-secondary'>Apply now</button>
          </Link>
          
        </div>
      </div>
      <div >
        <img className='h-[400px] bg-gradient-to-t from-black/80 to-transparent' src="https://i.postimg.cc/QNySc0kn/DHEO-Scholarships-Portal-scaled.jpg" alt="Slide 2" />
        <div className="custom-text-overlay flex flex-col lg:ml-10 items-center md:items-start lg:items-start relative">
          <h2 className="text-white text-4xl mb-3 font-bold">Apply for scholarship now</h2>
          <Link to={'/register'}>
          <button className='btn btn-secondary'>Apply now</button>
          </Link>
        </div>
      </div>
      <div>
        <img className='h-[400px] bg-cover' src="https://i.postimg.cc/JhMsyCyV/images-15.jpg" alt="Slide 3" />
        <div className="custom-text-overlay flex flex-col lg:ml-10 items-center md:items-start lg:items-start relative">
          <h2 className="text-white text-4xl mb-3 font-bold">Apply for scholarship now</h2>
          <Link to={'/register'}>
          <button className='btn btn-secondary'>Apply now</button>
          </Link>
        </div>
      </div>
    </Carousel>
        </div>
    );
};

export default Banner;