import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Payment = () => {
    const {user}=use(AuthContext)

    console.log(user?.email);
    const {
    data: userdata,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['user', user?.email],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/user/${user?.email}`
      )
      return data
    },
  })
  
  console.log(userdata);
  const { name, _id,  image } = userdata || {}
  
  

    const location=useLocation()
   
    const scholarship = location.state?.scholarship;
    
    const universityName=scholarship?.name?.University_Name
    const scholarshipCategory=scholarship?.scholarship_category?.Scholarship_category
    const scholarship_id=scholarship?.scholarship_id?._id
    const subjectCategory=scholarship?.subject_category?.Subject_Category
    const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log("Application Data:", data);
    // You can send data to backend here
    const submissionData = {
        address:data.address,
      photo: data.photo,
      degree:data.degree,
      gender:data.gender,
      hscResult:data.hscResult,
      sscResult:data.sscResult,
      phone:data.phone,
      studyGap:data.studyGap,
      userName: user.displayName,
      userEmail: user.email,
      userId:_id,
      scholarshipId: scholarship_id,
      date: new Date().toISOString(), // current date/time in ISO format
    };
    console.log(submissionData);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto p-6 bg-base-100 rounded-xl shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold">Scholarship Application</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          {...register("phone", { required: true })}
          type="tel"
          placeholder="Applicant's Phone Number"
          className="input input-bordered w-full"
        />

        <input
          {...register("photo", { required: true })}
          type="text"
          placeholder="Applicant image"
          className="input input-bordered w-full"
        />

        <input
          {...register("address", { required: true })}
          type="text"
          placeholder="Applicant Address (Village, District, Country)"
          className="input input-bordered w-full"
        />

        <select
          {...register("gender", { required: true })}
          className="select select-bordered w-full"
        >
          <option disabled selected>Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <select
          {...register("degree", { required: true })}
          className="select select-bordered w-full"
        >
          <option disabled selected>Applying Degree</option>
          <option>Diploma</option>
          <option>Bachelor</option>
          <option>Masters</option>
        </select>

        <input
          {...register("sscResult", { required: true })}
          type="text"
          placeholder="SSC Result"
          className="input input-bordered w-full"
        />

        <input
          {...register("hscResult", { required: true })}
          type="text"
          placeholder="HSC Result"
          className="input input-bordered w-full"
        />

        <select
          {...register("studyGap")}
          className="select select-bordered w-full"
        >
          <option value="">Any Study Gap?</option>
          <option>Yes</option>
          <option>No</option>
        </select>

        <input
          type="text"
          className="input input-bordered w-full"
          readOnly
          value={universityName || "Example University"}
        />

        <input
          type="text"
          className="input input-bordered w-full"
          readOnly
          value={scholarshipCategory || "Full Fund"}
        />

        <input
          type="text"
          className="input input-bordered w-full"
          readOnly
          value={subjectCategory || "Engineering"}
        />

      </div>

      <button className="btn btn-primary w-full mt-4">Submit Application</button>
    </form>
  );
};

export default Payment;