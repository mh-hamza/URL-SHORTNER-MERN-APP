import React from "react";
import { FaCopy, FaTrash, FaCalendarAlt, FaClock } from "react-icons/fa";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";

const ListCard = ({
  title,
  qrValue,
  link,
  originalUrl,
  createdAt,
  onCopy,
  onDelete,
  navigateLink,
}) => {
  // Extract date and time from the createdAt field
  const date = new Date(createdAt).toLocaleDateString();
  const time = new Date(createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4 w-full">
      <div className="flex flex-row items-center justify-between gap-1 md:gap-4">
        <Link
          to={navigateLink}
          className="flex flex-row flex-1 gap-4 cursor-pointer"
        >
          {/* QR CODE */}
          <div className="flex justify-center md:justify-start">
            <div className="w-[4rem] h-[4rem] md:w-[8rem] md:h-[8rem]">
              <QRCode
                fgColor="#222222"
                value={qrValue}
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col gap-1 md:gap-2 text-left">
            <h3 className="text-[12px] md:text-lg font-semibold text-gray-800">
              {title}
            </h3>
            <p
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-[10px] md:text-lg truncate"
            >
              {link}
            </p>
            <p className="text-[10px] md:text-[15px] text-gray-700 break-all">
              {originalUrl}
            </p>
            <div className="flex items-center text-[10px] md:text-sm text-gray-500 gap-2">
              <FaCalendarAlt className="text-[12px] md:text-[16px] text-gray-400" />
              <span>{date}</span>
              <FaClock className="text-[12px] md:text-[16px] text-gray-400 " />
              <span>{time}</span>
            </div>
          </div>
        </Link>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onCopy}
            className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-2"
          >
            <FaCopy />
            <span className="hidden md:block">Copy</span>
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 flex items-center gap-2"
          >
            <FaTrash />
            <span className="hidden md:block">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
