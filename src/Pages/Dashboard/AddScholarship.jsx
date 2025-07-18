import { useForm } from 'react-hook-form';
import { use, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddScholarship = () => {
    const {user}=use(AuthContext)
  const { register, handleSubmit, reset } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = async (data) => {
    console.log(data);

    // Here you'd upload image to imgbb and get the URL, then submit everything to your backend
    // Example: const imgUrl = await uploadToImgBB(data.universityImage[0]);

    const imageFile = data.universityImage[0];

  console.log('Image File:', imageFile);

  // Example: uploading to ImgBB or Cloudinary
  const formData = new FormData();
  formData.append('image', imageFile);

  // If you're using imgbb
  
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, {
    method: 'POST',
    body: formData,
  });

  const result = await res.json();
  const universityImage = result.data.display_url;

  const fulldata={
    ...data,
    universityImage,
    applicationFees:parseInt(data.applicationFees),
    serviceCharge:parseInt(data.serviceCharge),
    userName: user.displayName,
    userEmail: user.email,
    submittedAt: new Date().toISOString(),
  }
  console.log(fulldata);

  await axios.post(
        `${import.meta.env.VITE_API_URL}/add-scholarship`,fulldata).then(res=>{console.log(res.data);
                    if(res.data.insertedId){
                        Swal.fire({
                                title: "Scholarship added successfully!",
                                icon: "success",
                                draggable: true
                });
                    }
                }).catch(error=>{
                    console.log(error);
                })

  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    if (image) {
      setImagePreview(URL.createObjectURL(image));
    }

  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6 bg-base-100 shadow-xl rounded-xl max-w-4xl mx-auto">

      <h2 className="text-2xl font-bold">Add Scholarship</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input {...register("scholarshipName", { required: true })} type="text" placeholder="Scholarship Name" className="input input-bordered w-full" />
        <input {...register("universityName", { required: true })} type="text" placeholder="University Name" className="input input-bordered w-full" />
        
        <div>
          <input {...register("universityImage", { required: true })} type="file" accept="image/*" onChange={handleImageChange} className="file-input file-input-bordered w-full" />
          {imagePreview && <img src={imagePreview} alt="Preview" className="w-24 h-24 mt-2 object-cover rounded-md" />}
        </div>

        <input {...register("universityCountry", { required: true })} type="text" placeholder="University Country" className="input input-bordered w-full" />
        <input {...register("universityCity", { required: true })} type="text" placeholder="University City" className="input input-bordered w-full" />
        <input {...register("universityRank", { required: true })} type="number" placeholder="University World Rank" className="input input-bordered w-full" />

        <select {...register("subjectCategory", { required: true })} className="select select-bordered w-full">
          <option disabled selected>Subject Category</option>
          <option>Agriculture</option>
          <option>Engineering</option>
          <option>Doctor</option>
        </select>

        <select {...register("scholarshipCategory", { required: true })} className="select select-bordered w-full">
          <option disabled selected>Scholarship Category</option>
          <option>Full fund</option>
          <option>Partial</option>
          <option>Self-fund</option>
        </select>

        <select {...register("degree", { required: true })} className="select select-bordered w-full">
          <option disabled selected>Degree</option>
          <option>Diploma</option>
          <option>Bachelor</option>
          <option>Masters</option>
        </select>

        <input {...register("tuitionFees")} type="text" placeholder="Tuition Fees (Optional)" className="input input-bordered w-full" />
        <input {...register("applicationFees", { required: true })} type="number" placeholder="Application Fees" className="input input-bordered w-full" />
        <input {...register("serviceCharge", { required: true })} type="number" placeholder="Service Charge" className="input input-bordered w-full" />
        <input {...register("applicationDeadline", { required: true })} type="date" placeholder="Application Deadline" className="input input-bordered w-full" />
        <input {...register("postDate", { required: true })} type="date" placeholder="Post Date" className="input input-bordered w-full" />
        <input {...register("postedByEmail", { required: true })} type="email" defaultValue={user?.email} placeholder="Posted User Email" className="input input-bordered w-full" />
      </div>

      <button className="btn btn-primary w-full">Submit Scholarship</button>
    </form>
  );
};

export default AddScholarship;
