// import { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import SchoarshipCard from '../Components/ScholarshipCard';

// const AllScholarship = () => {
//   const [searchText, setSearchText] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 2;

//   const { data = [], isLoading } = useQuery({
//     queryKey: ['scholarship'],
//     queryFn: async () => {
//       const res = await axios(`${import.meta.env.VITE_API_URL}/scholarship`);
//       return res.data;
//     },
//     initialData: [],
//   });
  
  
//   const filteredScholarships = data.filter((item) =>
//     [item.scholarshipName, item.universityName, item.degree]
//       .some((field) =>
//         field?.toLowerCase().includes(searchText.toLowerCase())
//       )
//   );

  
//   const totalPages = Math.ceil(filteredScholarships.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedScholarships = filteredScholarships.slice(startIndex, startIndex + itemsPerPage);

//   const handleSearch = (e) => {
//     setSearchText(e.target.value);
//     setCurrentPage(1); 
//   };

//   return (
//     <div>
      
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search by Scholarship, University, or Degree"
//           className="input input-bordered w-full max-w-md"
//           value={searchText}
//           onChange={handleSearch}
//         />
//       </div>

      
//       {paginatedScholarships.length === 0 ? (
//         <div className="text-center text-gray-500 mt-10">
//           No scholarship available
//         </div>
//       ) : (
//         paginatedScholarships.map((scholarship) => (
//           <div className='w-1/3 mx-auto my-5'>
//             <SchoarshipCard key={scholarship._id} scholarship={scholarship}></SchoarshipCard>
//           </div>
          
//         ))
//       )}

      
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-6 space-x-2">
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentPage(index + 1)}
//               className={`btn btn-sm ${currentPage === index + 1 ? 'btn-primary' : 'btn-outline'}`}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllScholarship;
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import SchoarshipCard from '../Components/ScholarshipCard';

const AllScholarship = () => {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState(''); // '' | 'asc' | 'desc'
  const itemsPerPage = 2;

  const { data = [], isLoading } = useQuery({
    queryKey: ['scholarship'],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/scholarship`);
      return res.data;
    },
    initialData: [],
  });

  // 🔍 Search filter
  const filteredScholarships = data.filter((item) =>
    [item.scholarshipName, item.universityName, item.degree].some((field) =>
      field?.toLowerCase().includes(searchText.toLowerCase())
    )
  );

  // 🔽 Sort based on applicationFees
  const sortedScholarships = [...filteredScholarships].sort((a, b) => {
    const feeA = Number(a.applicationFees) || 0;
    const feeB = Number(b.applicationFees) || 0;

    if (sortOrder === 'asc') return feeA - feeB;
    if (sortOrder === 'desc') return feeB - feeA;
    return 0; // default (no sort)
  });

  // 📄 Pagination
  const totalPages = Math.ceil(sortedScholarships.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedScholarships = sortedScholarships.slice(startIndex, startIndex + itemsPerPage);

  // Handlers
  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  return (
    <div>
      
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:space-x-4">
        <input
          type="text"
          placeholder="Search by Scholarship, University, or Degree"
          className="input input-bordered w-full max-w-md"
          value={searchText}
          onChange={handleSearch}
        />

        
        <div className="mt-3 md:mt-0 flex space-x-2">
          <button
            onClick={() => handleSort('asc')}
            className={`btn btn-sm ${sortOrder === 'asc' ? 'btn-secondary' : 'btn-outline'}`}
          >
            Fee: Low → High
          </button>
          <button
            onClick={() => handleSort('desc')}
            className={`btn btn-sm ${sortOrder === 'desc' ? 'btn-secondary' : 'btn-outline'}`}
          >
            Fee: High → Low
          </button>
        </div>
      </div>

      {paginatedScholarships.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">No scholarship available</div>
      ) : (
        paginatedScholarships.map((scholarship) => (
          <div key={scholarship._id} className="w-1/3 mx-auto my-5">
            <SchoarshipCard scholarship={scholarship} />
          </div>
        ))
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`btn btn-sm ${currentPage === index + 1 ? 'btn-secondary' : 'btn-outline'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllScholarship;
