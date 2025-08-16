export default function Review() {
  const reviews = [
    {
      name: "Amina Rahman",
      role: "Bachelor Student, Canada",
      review:
        "Scholarship - Hub helped me discover multiple opportunities I never knew existed. I secured a partial scholarship and it changed my life!",
      avatar: "https://i.pravatar.cc/100?img=5",
    },
    {
      name: "David Kim",
      role: "Master's Student, South Korea",
      review:
        "The platform is simple to use, and the personalized filters saved me so much time. Highly recommend it to any student searching for funding.",
      avatar: "https://i.pravatar.cc/100?img=15",
    },
    {
      name: "Sophia Martins",
      role: "PhD Candidate, Germany",
      review:
        "I subscribed to the newsletter and always stayed updated. Thanks to Scholarship Hub, I found my dream scholarship in Europe.",
      avatar: "https://i.pravatar.cc/100?img=30",
    },
  ];

  return (
    <section className="bg-base-200 py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
          What Students Say
        </h2>
        <p className="text-base md:text-lg text-base-content/80 mb-12">
          Hear from students who found their opportunities through Scholarship
          Hub.
        </p>

        {/* Reviews Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="card bg-base-200 shadow-md rounded-2xl p-6 text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full border-2 border-primary"
                />
                <div>
                  <h3 className="font-semibold text-base-content">
                    {review.name}
                  </h3>
                  <p className="text-sm text-base-content/70">{review.role}</p>
                </div>
              </div>
              <p className="text-base-content/80 italic">“{review.review}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
