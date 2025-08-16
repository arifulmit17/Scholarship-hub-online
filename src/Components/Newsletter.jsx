export default function Newsletter() {
  return (
    <section className="bg-base-200 py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Stay Updated with Scholarship Hub
        </h2>

        {/* Description */}
        <p className="text-base md:text-lg text-base-content/80 mb-8">
          Get the latest scholarships, application tips, and study opportunities
          delivered straight to your inbox. Join thousands of students who never
          miss an update!
        </p>

        {/* Newsletter Form */}
        <form
          className="flex flex-col sm:flex-row items-center gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full sm:flex-1"
            required
          />
          <button className="btn btn-primary w-full sm:w-auto">
            Subscribe
          </button>
        </form>

        {/* Disclaimer */}
        <p className="mt-4 text-xs text-base-content/70">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
