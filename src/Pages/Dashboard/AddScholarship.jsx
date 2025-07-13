import { useForm } from 'react-hook-form';
import { use, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';

const AddScholarship = () => {
    const {user}=use(AuthContext)
  const { register, handleSubmit, reset } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = async (data) => {
    console.log(data);

    // Here you'd upload image to imgbb and get the URL, then submit everything to your backend
    // Example: const imgUrl = await uploadToImgBB(data.universityImage[0]);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
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
        <input {...register("applicationFees", { required: true })} type="text" placeholder="Application Fees" className="input input-bordered w-full" />
        <input {...register("serviceCharge", { required: true })} type="text" placeholder="Service Charge" className="input input-bordered w-full" />
        <input {...register("applicationDeadline", { required: true })} type="date" placeholder="Application Deadline" className="input input-bordered w-full" />
        <input {...register("postDate", { required: true })} type="date" placeholder="Post Date" className="input input-bordered w-full" />
        <input {...register("postedByEmail", { required: true })} type="email" defaultValue={user?.email} placeholder="Posted User Email" className="input input-bordered w-full" />
      </div>

      <button className="btn btn-primary w-full">Submit Scholarship</button>
    </form>
  );
};

export default AddScholarship;
