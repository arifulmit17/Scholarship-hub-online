import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import SchoarshipCard from '../Components/ScholarshipCard';

const AllScholarship = () => {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const { data = [], isLoading } = useQuery({
    queryKey: ['scholarship'],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/scholarship`);
      return res.data;
    },
    initialData: [],
  });
  
  // Filtered by search input
  const filteredScholarships = data.filter((item) =>
    [item.scholarshipName, item.universityName, item.degree]
      .some((field) =>
        field?.toLowerCase().includes(searchText.toLowerCase())
      )
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredScholarships.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedScholarships = filteredScholarships.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reset to page 1 on new search
  };

  return (
    <div>
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Scholarship, University, or Degree"
          className="input input-bordered w-full max-w-md"
          value={searchText}
          onChange={handleSearch}
        />
      </div>

      {/* Display Scholarships or Empty Message */}
      {paginatedScholarships.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No scholarship available
        </div>
      ) : (
        paginatedScholarships.map((scholarship) => (
    
          <SchoarshipCard key={scholarship._id} scholarship={scholarship}></SchoarshipCard>
        ))
      )}

      {/* Pagination Buttons */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`btn btn-sm ${currentPage === index + 1 ? 'btn-primary' : 'btn-outline'}`}
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
