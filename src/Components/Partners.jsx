import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const partners = [
  {
    id: 1,
    name: "RUET",
    logo: "https://res.cloudinary.com/dfhlm4cyw/image/upload/v1755412785/ruet-1686992768_ofqa0g.jpg",
  },
  {
    id: 2,
    name: "KUET",
    logo: "https://res.cloudinary.com/dfhlm4cyw/image/upload/v1755412785/kuet-new-logo_mh5iga.jpg",
  },
  {
    id: 3,
    name: "BUET",
    logo: "https://res.cloudinary.com/dfhlm4cyw/image/upload/v1755412785/images_13_vt11bo.jpg",
  },
  {
    id: 4,
    name: "CUET",
    logo: "https://res.cloudinary.com/dfhlm4cyw/image/upload/v1755412785/images_12_vycrli.jpg",
  },
  {
    id: 5,
    name: "BAU",
    logo: "https://res.cloudinary.com/dfhlm4cyw/image/upload/v1755412785/images_18_wijo1r.jpg",
  },
  {
    id: 6,
    name: "Rajshahi University",
    logo: "https://res.cloudinary.com/dfhlm4cyw/image/upload/v1755413294/rajshahi-university-logo-png_seeklogo-611732_j97rmz.png",
  },
];

const Partners = () => {
  return (
    <section className="w-11/12 mx-auto bg-base-200 rounded-2xl shadow-sm py-12 text-center">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-secondary">
        Our Trusted Partners
      </h2>
      <p className="max-w-2xl mx-auto text-base-content/70 mb-12">
        We collaborate with top universities and organizations nationwide to
        bring you the best scholarship opportunities.
      </p>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={2}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        loop={true}
        className="flex items-center"
      >
        {partners.map((partner) => (
          <SwiperSlide key={partner.id}>
            <div className="p-4 bg-base-100 rounded-xl shadow hover:shadow-lg transition-transform duration-300 hover:scale-105 flex flex-col items-center justify-center">
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-20 rounded-full object-contain mb-3"
              />
              <p className="text-sm font-medium text-base-content">{partner.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Partners;
