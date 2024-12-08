import React from "react";
import { FaLink, FaLocationArrow, FaMobileAlt, FaChartLine } from "react-icons/fa";

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl p-6">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-blue-500 text-white rounded-full p-4">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function About() {
  return (
    <div className="max-w-screen-xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">About Our URL Shortener App</h1>
      <p className="text-lg text-gray-700 mb-8">
        Discover the powerful features of our URL Shortener app. Enhance your sharing experience with analytics and real-time tracking.
      </p>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          icon={<FaLink size={32} />}
          title="URL Shortening"
          description="Easily shorten your long URLs for convenient sharing and tracking."
        />
        <FeatureCard
          icon={<FaChartLine size={32} />}
          title="Click Tracking"
          description="Monitor the clicks your shortened links receive in real time."
        />
        <FeatureCard
          icon={<FaLocationArrow size={32} />}
          title="Location Tracking"
          description="Get detailed insights about the geographic location of your visitors."
        />
        <FeatureCard
          icon={<FaMobileAlt size={32} />}
          title="Device Tracking"
          description="Understand whether your audience is using mobile, desktop, or tablet devices."
        />
      </div>
    </div>
  );
}

export default About;
