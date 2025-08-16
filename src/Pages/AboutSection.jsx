export default function AboutSection() {
  return (
    <section className="bg-base-100 py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold mb-6 text-secondary">
          About Scholarship Hub
        </h2>

        {/* Intro */}
        <p className="text-lg text-base-content/80 leading-relaxed mb-10">
          At <span className="font-semibold">Scholarship - Hub</span>, we believe
          financial barriers should never stand in the way of education. Our
          mission is to connect students with the right opportunities, making
          scholarships and grants more accessible worldwide.
        </p>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="card bg-base-200 shadow-md rounded-2xl">
            <div className="card-body items-center text-center">
              <h3 className="card-title text-secondary">📌 Listings</h3>
              <p className="text-sm">
                Verified scholarships for high school, undergraduate, and
                postgraduate students.
              </p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-md rounded-2xl">
            <div className="card-body items-center text-center">
              <h3 className="card-title text-secondary">🎯 Search</h3>
              <p className="text-sm">
                Personalized scholarship search by degree, field of study, or
                location.
              </p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-md rounded-2xl">
            <div className="card-body items-center text-center">
              <h3 className="card-title text-secondary">📖 Resources</h3>
              <p className="text-sm">
                Step-by-step guidance on eligibility, deadlines, and
                applications.
              </p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-md rounded-2xl">
            <div className="card-body items-center text-center">
              <h3 className="card-title text-secondary">🌍 Community</h3>
              <p className="text-sm">
                Inspiring tips, articles, and success stories from real
                students.
              </p>
            </div>
          </div>
        </div>

        {/* Vision / Mission */}
        <div className="mt-12 space-y-6">
          <h3 className="text-2xl font-semibold text-secondary">Our Vision</h3>
          <p className="text-base text-base-content/80 max-w-3xl mx-auto">
            To build a world where education is accessible to everyone,
            regardless of background or financial status.
          </p>

          <h3 className="text-2xl font-semibold text-secondary">Our Mission</h3>
          <p className="text-base text-base-content/80 max-w-3xl mx-auto">
            Empowering students by providing easy access to scholarships and
            resources that help them achieve their academic and career goals.
          </p>
        </div>
      </div>
    </section>
  );
}
