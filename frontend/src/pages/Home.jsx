import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Home = () => {
  const targetDate = new Date("2025-11-26T10:30:00").getTime();
  const [timeLeft, setTimeLeft] = useState("00:00:00:00");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft("00:00:00:00");
        clearInterval(timer); // ⏹ stop when time reached
      } else {
        const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(
          2,
          "0"
        );
        const hours = String(
          Math.floor((diff / (1000 * 60 * 60)) % 24)
        ).padStart(2, "0");
        const minutes = String(Math.floor((diff / 1000 / 60) % 60)).padStart(
          2,
          "0"
        );
        const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

        setTimeLeft(`${days}:${hours}:${minutes}:${seconds}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero Section with Video */}

      <div className="relative h-screen w-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover brightness-105"
        >
          <source src="/coding.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

        <div className="relative z-20 flex flex-col items-center justify-center text-center h-full px-4  ">
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-lg md:text-xl font-mono text-emerald-300 drop-shadow-[0_0_8px_rgba(0,255,180,0.6)]"
          >
            {timeLeft}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative text-5xl md:text-7xl font-extrabold drop-shadow-[0_0_15px_rgba(100,100,155,0.6)] overflow-hidden"
          >
            <motion.span
              className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-green-300 to-gray-200"
              animate={{ backgroundPositionX: ["-200%", "200%"] }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "linear",
              }}
              style={{ backgroundSize: "200% 100%" }}
            >
              HackStrom
            </motion.span>{" "}
            <span className="text-emerald-300">2025</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-lg md:text-2xl text-gray-300 mt-4 font-medium"
          >
            Dooars Academy of Technology & Management
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="w-32 h-1 bg-emerald-300/80 mt-6 origin-left rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)]"
          ></motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1 }}
          >
            <motion.div
              whileHover={{ scale: 1.08, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-block"
            >
              <Link
                to="/register"
                className="mt-10 inline-flex items-center gap-2 px-10 py-4 
      bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 
      text-gray-900 font-bold text-lg rounded-full shadow-xl 
      transition-all duration-300 
      relative overflow-hidden"
              >
                <span className="relative z-10">Register Now</span>

                {/* 🌟 Continuous Shine Effect (always active) */}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ x: ["-150%", "150%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "linear",
                  }}
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* About Section */}
      <section className="w-full flex flex-col items-center justify-center py-10">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl font-extrabold drop-shadow-[0_0_15px_rgba(100,100,155,0.6)] text-center mb-6"
        >
          <motion.span
            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-blue-700 to-gray-200"
            animate={{ backgroundPositionX: ["-200%", "200%"] }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "linear",
            }}
            style={{ backgroundSize: "200% 100%" }}
          >
            <Link to={"/about-datm"}>About</Link>
          </motion.span>
        </motion.h1>

        {/* Showcase Image */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full flex justify-center"
        >
          <img
            src="/hero.jpg"
            alt="Hackathon Showcase"
            className="rounded-2xl shadow-2xl max-w-5xl w-full object-cover"
          />
        </motion.div>
      </section>

      {/* Process Section */}
      <section className="py-20 from-gray-750 to-blue-900 text-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-12"
          >
            <span className="text-gray-400">How</span>{" "}
            <span className="text-emerald-400">HackStrom</span>{" "}
            <span className="text-gray-400">Works</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                step: "1",
                title: "Register Your Team",
                desc: "Sign up online with your team members and secure your entry into the hackathon.",
              },
              {
                step: "2",
                title: "Show Your Skills",
                desc: "Code, create, and perform in the hackathon to showcase your innovation, problem-solving, and teamwork. Stand out from the crowd to get rewarded and win exciting cash prizes🏆!",
              },
              {
                step: "3",
                title: "Hackathon Topic",
                desc: (
                  <>
                    Focus on building a <b>student productivity application</b>{" "}
                    to enhance learning and efficiency. As an extra bonus,
                    implement an AI chatbot for smart assistance and innovation.
                  </>
                ),
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: i * 0.3 }}
                viewport={{ once: true }}
                className="bg-gray-800/60 p-8 rounded-2xl shadow-xl border border-gray-700 hover:border-emerald-400 transition-all duration-300"
              >
                <div className="text-emerald-400 text-5xl font-extrabold mb-4">
                  {item.step}
                </div>
                <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 space-y-10">
        {/* Map Section */}
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

        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* College Logo */}
          <div className="flex items-center gap-3 w-full md:w-1/2 justify-center md:justify-start">
            <Link to={"/about-datm"}>
              <motion.img
                src="/datm.webp"
                alt="DATM Logo"
                whileHover={{ scale: 1.2, rotate: 0 }}
                transition={{ duration: 0.3 }}
                className="h-14 w-auto rounded-lg bg-white p-2 shadow-lg"
              />
            </Link>
            <div className="text-left max-w-xs">
              <h3 className="text-base md:text-lg font-semibold">
                Dooars Academy of Technology & Management
              </h3>
              <p className="text-sm text-gray-400">Alipurduar, West Bengal</p>
            </div>
          </div>

          {/* ISOAH Logo */}
          <div className="flex items-center gap-3 w-full md:w-1/2 justify-center md:justify-end">
            <Link to={"https://www.isoeh.com/"}>
              {" "}
              <motion.img
                src="/isoah.webp"
                alt="ISOAH Logo"
                whileHover={{ scale: 1.2, rotate: 0 }}
                transition={{ duration: 0.3 }}
                className="h-14 w-auto rounded-lg bg-white p-2 shadow-lg"
              />
            </Link>
            <div className="text-left max-w-xs">
              <h3 className="text-base md:text-lg font-semibold">
                ISOAH Data Security Pvt. Ltd.
              </h3>
              <p className="text-sm text-gray-400">Organizing Partner</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
