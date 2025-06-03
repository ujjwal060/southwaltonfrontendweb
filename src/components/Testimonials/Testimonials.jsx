import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Testimonials.scss";

const testimonials = [
  {
    name: "John Doe",
    feedback: "This service is amazing! Highly recommend to everyone.",
    image:
      "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg",
  },
  {
    name: "Jane Smith",
    feedback: "A fantastic experience from start to finish.",
    image:
      "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg",
  },
  {
    name: "Emily Johnson",
    feedback: "Great quality and excellent customer support.",
    image:
      "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg",
  },
  {
    name: "Michael Brown",
    feedback: "Top-notch service, very satisfied with the results!",
    image:
      "https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg",
  },
];

const Testimonials = () => {
  return (
    <>
      <div className="breadcrumb-container">
        <div className="breadcrumb-overlay">
          <h2>Clients Feedback</h2>
          <p>
            <Link to="/">Home</Link> / <span>Testimonials</span>
          </p>
        </div>
      </div>
      <div className="container">
        <h2 className="text-center">What Our Clients Say</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]} // Include Autoplay module
          spaceBetween={20}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000, // Auto-scroll every 3 seconds
            disableOnInteraction: false, // Keep autoplay active even when user interacts
          }}
          className="testimonials-slider"
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide
              key={index}
              className="card shadow-sm p-4 border-0 bg-light mb-5"
            >
              <div className="d-flex flex-column align-items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="rounded-circle mb-3 border border-primary"
                  style={{ width: "80px", height: "80px" }}
                />
                <h3 className="h5 text-dark">{testimonial.name}</h3>
                <p className="text-muted">"{testimonial.feedback}"</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Testimonials;
