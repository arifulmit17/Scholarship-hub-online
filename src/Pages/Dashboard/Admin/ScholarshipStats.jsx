import React from "react";
import { FaUniversity, FaGlobe, FaUserGraduate, FaDollarSign } from "react-icons/fa";

const ScholarshipStats = ({ data }) => {
  // total scholarships
  const scholarships=data
  const totalScholarships = scholarships.length;

  // total universities (unique)
  const totalUniversities = new Set(scholarships.map(s => s.universityName)).size;

  // total countries (unique)
  const totalCountries = new Set(scholarships.map(s => s.universityCountry)).size;

  // average application fee
  const avgFees = (
    scholarships.reduce((sum, s) => sum + parseFloat(s.applicationFees || 0), 0) /
    totalScholarships
  ).toFixed(2);

  return (
    <section className="w-11/12 mx-auto py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-secondary">
        Scholarship Collection Stats
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="stat bg-base-100 rounded-2xl shadow-md hover:shadow-lg transition-transform hover:scale-105">
          <div className="stat-figure text-primary text-3xl">
            <FaUniversity />
          </div>
          <div className="stat-title">Total Scholarships</div>
          <div className="stat-value">{totalScholarships}</div>
        </div>

        {/* Card 2 */}
        <div className="stat bg-base-100 rounded-2xl shadow-md hover:shadow-lg transition-transform hover:scale-105">
          <div className="stat-figure text-secondary text-3xl">
            <FaGlobe />
          </div>
          <div className="stat-title">Countries</div>
          <div className="stat-value">{totalCountries}</div>
        </div>

        {/* Card 3 */}
        <div className="stat bg-base-100 rounded-2xl shadow-md hover:shadow-lg transition-transform hover:scale-105">
          <div className="stat-figure text-accent text-3xl">
            <FaUserGraduate />
          </div>
          <div className="stat-title">Universities</div>
          <div className="stat-value">{totalUniversities}</div>
        </div>

        {/* Card 4 */}
        <div className="stat bg-base-100 rounded-2xl shadow-md hover:shadow-lg transition-transform hover:scale-105">
          <div className="stat-figure text-success text-3xl">
            <FaDollarSign />
          </div>
          <div className="stat-title">Avg. Application Fee</div>
          <div className="stat-value">${avgFees}</div>
        </div>
      </div>
    </section>
  );
};

export default ScholarshipStats;
