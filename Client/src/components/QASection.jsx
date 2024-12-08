import React, { useState } from "react";
import { FaQuestionCircle, FaArrowDown } from "react-icons/fa";

function QASection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const questionsAndAnswers = [
    {
      question: "What is a URL shortener?",
      answer:
        "A URL shortener is a tool that converts long URLs into shorter, more manageable ones, making them easier to share.",
    },
    {
      question: "How does URL tracking work?",
      answer:
        "URL tracking allows you to see how many clicks your shortened link receives, the location of your users, the devices they use, and other analytics in real-time.",
    },
    {
      question: "Can I customize my short URLs?",
      answer:
        "Yes, you can create custom short URLs to make them more recognizable and relevant to your audience.",
    },
    {
      question: "Is it free to use the URL shortener?",
      answer:
        "Yes, our URL shortener is free to use for basic functionality. Premium features are available for advanced analytics.",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-100 to-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {questionsAndAnswers.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 m-2 rounded-lg shadow-md cursor-pointer transform transition-transform duration-200 hover:shadow-lg"
              onClick={() => toggleAnswer(index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FaQuestionCircle className="text-blue-500 text-2xl" />
                  <h3 className="text-lg font-semibold text-gray-800">{item.question}</h3>
                </div>
                <div className="text-xl">
                  {/* Single Arrow that rotates */}
                  <div
                    className={`transition-transform duration-200 transform ${
                      activeIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <FaArrowDown className="text-blue-500" />
                  </div>
                </div>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  activeIndex === index ? "max-h-screen opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
                }`}
              >
                {activeIndex === index && (
                  <p className="text-gray-600">{item.answer}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default QASection;
