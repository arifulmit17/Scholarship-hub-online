export default function FaqSection() {
  return (
    <section className="w-full mx-auto py-16">
      {/* Heading */}
      <h1 className="font-bold text-4xl md:text-5xl text-center mb-12 text-secondary">
        Frequently Asked Questions
      </h1>

      <div className="max-w-3xl mx-auto space-y-4">
        {/* Question 1 */}
        <div className="collapse collapse-arrow bg-base-200 border border-base-300">
          <input type="radio" name="faq-accordion" defaultChecked />
          <div className="collapse-title text-lg font-semibold">
            How do I get the opportunities?
          </div>
          <div className="collapse-content text-base-content/80">
            <p>
              Click the <span className="font-semibold">“Register”</span> button
              in the navbar and follow the registration process to access
              scholarships.
            </p>
          </div>
        </div>

        {/* Question 2 */}
        <div className="collapse collapse-arrow bg-base-200 border border-base-300">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title text-lg font-semibold">
            I cannot find the logout button, where is it?
          </div>
          <div className="collapse-content text-base-content/80">
            <p>
              Check the <span className="font-semibold">top right corner</span>{" "}
              of the page. You’ll find the{" "}
              <span className="font-semibold">Logout</span> button there.
            </p>
          </div>
        </div>

        {/* Question 3 */}
        <div className="collapse collapse-arrow bg-base-200 border border-base-300">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title text-lg font-semibold">
            How do I give my reviews?
          </div>
          <div className="collapse-content text-base-content/80">
            <p>
              Go to the <span className="font-semibold">My Applications</span>{" "}
              section, click the <span className="font-semibold">Review</span>{" "}
              button, and submit your feedback for the scholarship.
            </p>
          </div>
        </div>

        {/* Question 4 */}
        <div className="collapse collapse-arrow bg-base-200 border border-base-300">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title text-lg font-semibold">
            Can I apply for multiple scholarships?
          </div>
          <div className="collapse-content text-base-content/80">
            <p>
              Yes, you can apply to as many scholarships as you qualify for.
              Each application will be processed separately.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
