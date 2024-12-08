import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineHeart } from "react-icons/hi";

function Footer() {
  return (
    <footer className="bg-gray-100 p-4 text-center border-t border-gray-300 bottom-0 w-full">
      <p className="text-gray-600 text-sm mb-2">
        Made with <HiOutlineHeart className="text-red-500 mx-1 inline-block" /> by
        <span className="font-bold text-gray-800"> Mohammad Hamza</span>
      </p>
      <div className="flex justify-center gap-4 mt-2">
        <a
          href="https://github.com/mh-hamza/URL-SHORTNER-MERN-APP"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 transition-colors duration-300 hover:text-blue-600"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/mh-hamza444"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 transition-colors duration-300 hover:text-blue-600"
        >
          <FaLinkedin size={24} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
