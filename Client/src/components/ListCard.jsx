import React from "react";
import { FaCopy, FaTrash } from "react-icons/fa";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";

const ListCard = ({ title, qrValue, link, originalUrl, createdAt, onCopy, onDelete, navigateLink }) => {
  // Extract date and time from the createdAt field
  const date = new Date(createdAt).toLocaleDateString(); // e.g., "11/19/2024"
  const time = new Date(createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }); // e.g., "14:30"

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Wrap QR Code and Content Section with Link */}
        <Link to={navigateLink}className="flex flex-col md:flex-row flex-1 gap-4 cursor-pointer">
          {/* QR Code */}
          <div className="flex justify-center md:justify-start">
            <QRCode fgColor={"#222222"} size={90} value={qrValue} className="text-gray-600" />
          </div>

          {/* Content Section */}
          <div className="flex-1 flex flex-col gap-1 text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline break-all"
            >
              {link}
            </p>
            <p className="text-sm text-gray-700 break-words">{originalUrl}</p>
            <p className="text-sm text-gray-500">
              {date} | {time}
            </p>
          </div>
        </Link>

        {/* Buttons */}
        <div className="flex justify-center md:justify-end gap-4">
          <button
            onClick={onCopy}
            className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-2"
          >
            <FaCopy />
            Copy
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 flex items-center gap-2"
          >
            <FaTrash />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
