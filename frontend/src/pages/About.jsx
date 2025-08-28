import React from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const About = () => {
  const bannerImages = ["banner1.jpg", "banner2.jpg", "banner3.jpg"];

  const ugCourses = [
    "BCA Cyber Security",
    "BCA (H)",
    "BBA (H)",
    "BSc Medical Lab Technology",
    "BSc Hotel & Hospital Administration",
    "BBA in Hospital Management",
    "BSc in Media Science",
  ];

  const pgCourses = [
    "MSc in Computer Science",
    "MSc in Dietetics and Nutrition",
    "MSc in Clinical Psychology",
    "MSc in Medical Lab Technology",
    "Masters in Public Health",
  ];

  const galleryImages = [
    "gallery1.jpg",
    "gallery2.jpg",
    "gallery3.jpg",
    "gallery4.jpg",
    "gallery5.jpg",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    fade: true, // fade instead of slide
    cssEase: "linear",
  };

  return (
    <div className="min-h-screen mt-20 text-gray-800">
      {/* Banner Section */}
      <div className="w-full">
        <Slider {...settings}>
          {bannerImages.map((img, i) => (
            <div key={i}>
              <img
                src={img}
                alt={`Banner ${i}`}
                className="w-full h-90 md:h-96 object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Intro Paragraph */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-green-600 mb-8">
            Meet Our Director
          </h2>

          {/* Images */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Director Image */}
            <div className="w-full md:w-1/2">
              <img
                src="main.jpg" // replace with actual image path
                alt="College Director"
                className="rounded-xl shadow-lg mx-auto"
              />
              <h3 className="mt-4 text-2xl font-semibold text-red-500">
                Mr. Sumit Bhattacharya - College Director
              </h3>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto text-center my-12 px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-lg md:text-xl text-gray-500"
        >
          Welcome to our institution! We offer a range of cutting-edge
          undergraduate and postgraduate courses designed to equip you with the
          skills and knowledge to excel in your career.
        </motion.p>
      </div>

      {/* Courses Section */}
      <div className=" py-12 px-4 md:px-12">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-4xl font-bold text-center text-emerald-500 mb-8"
        >
          Our Courses
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* UG Courses */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-200 p-6 rounded-2xl shadow-lg border border-gray-200"
          >
            <h3 className="text-xl font-semibold mb-4 text-blue-600">
              UG Courses
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {ugCourses.map((course, i) => (
                <li key={i}>{course}</li>
              ))}
            </ul>
          </motion.div>

          {/* PG Courses */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-200 p-6 rounded-2xl shadow-lg border border-gray-200"
          >
            <h3 className="text-xl font-semibold mb-4 text-purple-600">
              PG Courses
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {pgCourses.map((course, i) => (
                <li key={i}>{course}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="py-12 px-4 md:px-12 ">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-emerald-500 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Courses Gallery
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1, rotate: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden rounded-xl shadow-lg"
            >
              <img
                src={img}
                alt={`Gallery ${i}`}
                className="w-full h-68 object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
      {/* Map Section */}
      <div className="max-w-6xl mx-auto px-4 space-y-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full h-[250px] md:h-[350px] lg:h-[400px]"
        >
          <iframe
            title="DATM Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5421.556988963394!2d89.53494910490006!3d26.488779681547285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e2576805709785%3A0x74670fd242930e87!2sDATM!5e1!3m2!1sen!2sin!4v1756402290469!5m2!1sen!2sin"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg border-0 shadow-xl w-full h-full"
          ></iframe>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
