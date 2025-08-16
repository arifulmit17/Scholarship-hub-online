
import { CheckCircle } from "lucide-react"; // optional: for nice icons
import { NavLink } from "react-router";

export default function Members() {
  return (
    <section className="w-11/12 mx-auto py-16">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Left Image */}
        <div className="flex-1 flex justify-center">
          <img
            className="w-64 md:w-80 rounded-full shadow-lg"
            src="https://i.postimg.cc/0Qzm235s/member.png"
            alt="Member Benefits"
          />
        </div>

        {/* Right Content */}
        <div className="flex-1 space-y-6">
          {/* Heading */}
          <h1 className="text-3xl font-bold text-secondary">
            Member’s Benefits
          </h1>
          <p className="text-base md:text-lg text-base-content/80">
            Join our platform and unlock exclusive benefits designed to help
            students achieve their educational dreams.
          </p>

          {/* Benefit List */}
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <CheckCircle className="text-secondary w-6 h-6 mt-1" />
              <span>Find scholarships from a wide range of universities.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-secondary w-6 h-6 mt-1" />
              <span>Apply easily to as many scholarships as you want.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-secondary w-6 h-6 mt-1" />
              <span>
                Share valuable feedback on specific scholarships when needed.
              </span>
            </li>
          </ul>

          {/* CTA Button */}
          <div className="pt-4">
            <NavLink to="/register">
              <button className="btn btn-secondary btn-wide transition duration-300 ease-in-out transform hover:scale-105 hover:bg-primary-focus rounded-2xl">
                Register Now
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}
