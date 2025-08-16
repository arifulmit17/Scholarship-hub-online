import React from 'react';
import Banner from '../Components/Banner';
import { NavLink } from 'react-router';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import SchoarshipCard from '../Components/ScholarshipCard';
import Newsletter from '../Components/Newsletter';

const Home = () => {
    const { data = [], isLoading } = useQuery({
    queryKey: ['scholarship'],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/scholarship`);
      return res.data;
    },
    initialData: [],
  });
  const topScholarships = [...data]
  .sort((a, b) => {
    
    if (a.applicationFees !== b.applicationFees) {
      return a.applicationFees - b.applicationFees;
    }

    
    return new Date(b.submittedAt) - new Date(a.submittedAt);
  })
  .slice(0, 6);
  
    return (
        <div>
           <section className='w-full'>
                <Banner></Banner>
            </section>
            <section>
                <h1 className='font-bold text-5xl text-center my-10'>Top scholarships</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {
                        topScholarships.map(scholarship=><SchoarshipCard key={scholarship._id} scholarship={scholarship}></SchoarshipCard>)
                    }
                </div>
                <div className='flex my-10 items-center justify-center'>
                        <NavLink to={'/allscholarship'}><button className='btn btn-primary'>All scholarships</button></NavLink>
                </div>
                
            </section>

            <section className='dark:text-white'>

                <h1 className='font-bold text-5xl text-center my-10'>Members Only</h1>
                <div  className='w-11/12 mx-auto lg:flex'>
                <div className='w-5/12  '>
                    <img className='md:w-[300px] ml-30 rounded-2xl' src="https://i.postimg.cc/0Qzm235s/member.png" alt="" />
                </div>
                <div className='w-full lg:w-7/12 mx-5 mb-5'>
                    <h1 className='text-lg md:text-xl lg:text-2xl font-semibold'>Member's Benefit</h1>
                    <p className='text-base md:text-lg lg:text-xl '>Our site focuses on a platform for students for following benefits</p>
                    <ol className='h-1/2 mt-3 flex flex-col justify-between'>
                      <li>1. Find scholarship from a wide range of universities. </li>

                      <li>2. Apply easily to as many scholarships as you want</li>

                      <li>3. Give your valuable feedback on specific scholarship if needed</li>
                    </ol>
                    <NavLink to={'/register'}>
                     <button className='text-white ml-15 lg:ml-40 rounded-2xl btn btn-primary btn-wide'>Register Now</button>
                     </NavLink>
                </div>
            </div>
            </section>
            <section className='dark:text-white '>
              <h1 className='font-bold text-5xl text-center my-10'>Newsletter</h1>
              <Newsletter></Newsletter>
            </section>
            <section className='dark:text-white '>
                <h1 className='font-bold text-5xl text-center my-10'>F.A.Q</h1>
                <div className="collapse dark:text-green-800 collapse-arrow bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-2" defaultChecked />
  <div className="collapse-title  font-semibold">How do I get the opportunities?</div>
  <div className="collapse-content text-sm">Click the "Register" button in the navbar and follow the registration process.</div>
</div>
<div className="collapse dark:text-green-800 collapse-arrow bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-2" />
  <div className="collapse-title font-semibold">I cannot find the logout button , where is it?</div>
  <div className="collapse-content text-sm">Check on the top right corner, then click on logout button</div>
</div>
<div className="collapse dark:text-green-800 collapse-arrow bg-base-100 border border-base-300">
  <input type="radio" name="my-accordion-2" />
  <div className="collapse-title font-semibold">How do I give my reviews?</div>
  <div className="collapse-content text-sm">Go to myapplications section and click review button, then review will be added to the particular scholarship.</div>
</div>
            </section>

        </div>
    );
};

export default Home;