import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative w-full h-96 bg-gradient-to-r from-blue-500 to-teal-500">
      <div className="absolute inset-0 bg-opacity-40 bg-blue-300"></div>
      <div className="relative z-10 flex items-center justify-center text-center text-white h-full">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Simplify Your Links with Powerful Analytics
          </h1>
          <p className="text-lg sm:text-xl mb-8 opacity-80">
            Create short links, track clicks, analyze device types, and more in real-time.
          </p>
          <Link
            to="/login"
            className="px-6 py-3 text-lg bg-white text-blue-500 rounded-lg hover:bg-blue-100 transition-all duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
      <svg
        className="absolute bottom-0 left-0 w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#ffffff"
          fillOpacity="0.6"
          d="M0,256L48,240C96,224,192,192,288,160C384,128,480,96,576,112C672,128,768,192,864,202.7C960,213,1056,171,1152,144C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </section>
  );
}

export default Hero;
