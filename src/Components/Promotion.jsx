import { NavLink } from "react-router";


export default function Promotion() {
  return (
    <section className="w-11/12 mx-auto ">
      <div className="hero bg-base-200 rounded-2xl shadow-lg border border-base-300">
        <div className="hero-content flex-col lg:flex-row-reverse gap-8 p-10 lg:p-16">
          {/* Image / Illustration */}
          <img
            src="https://i.postimg.cc/0Qzm235s/member.png"
            alt="Scholarship Hub Promotion"
            className="w-48 md:w-64 rounded-full shadow-2xl"
          />

          {/* Text + CTA */}
          <div className="text-center lg:text-left space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary">
              Unlock Your Scholarship Opportunities
            </h1>
            <p className="text-base md:text-lg md:ml-12 lg:ml-0 text-base-content/80 max-w-lg">
              Join <span className="font-semibold">Scholarship Hub</span> today
              and explore hundreds of scholarships, grants, and study programs
              tailored for students like you.
            </p>
            <NavLink to="/register">
              <button className="btn btn-secondary btn-wide rounded-2xl mt-4 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-primary-focus">
                Get Started Now
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}
