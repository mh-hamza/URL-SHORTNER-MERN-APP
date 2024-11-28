import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LocationChart from "./LocationChart";
import DeviceChart from "./DeviceChart";
import QRCode from "react-qr-code";
import {
  FaLink,
  FaMapMarkerAlt,
  FaMobileAlt,
  FaEye,
  FaChartBar,
} from "react-icons/fa"; // Importing React Icons

function UrlTrackReport() {
  const { id } = useParams(); // Get the URL id from params
  const [urlData, setUrlData] = useState(null);
  const [accessLogs, setAccessLogs] = useState([]);
  const [deviceData, setDeviceData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch URL data and access logs
  const fetchUrlDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return;
      }
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/url/details/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        setUrlData(response.data.data);
        setAccessLogs(response.data.data.accessLogs || []); // Set accessLogs if available
        setDeviceData(response.data.data.deviceType);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching URL details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrlDetails();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (!urlData) {
    return (
      <p className="text-center text-red-500">No data found for this URL.</p>
    );
  }
  // console.log(deviceData);

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-between">
        {/* QR Code Section */}
        <div className="flex justify-center md:w-1/3">
          <QRCode
            size={200}
            value={urlData.shortUrl}
            className="shadow-md rounded-md"
          />
        </div>

        {/* URL Info Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 md:w-2/3">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <FaLink className="mr-2 text-indigo-500" /> URL Information
          </h2>
          <p className="text-gray-700 mb-2">
            <strong className="text-gray-900">Short URL: </strong>{" "}
            {urlData.shortUrl}
          </p>
          <p className="text-gray-700 mb-2">
            <strong className="text-gray-900">Original URL: </strong>{" "}
            {urlData.redirectUrl}
          </p>
          <p className="text-gray-700 mb-2 flex items-center">
            <strong className="text-gray-900">Total Clicks: </strong>{" "}
            {urlData.redirectCount}
            <FaEye className="ml-2 text-gray-500" />
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="bg-white shadow-lg rounded-lg ">
        <h4 className="text-lg font-medium text-gray-700 mb-4 text-center flex items-center justify-center">
          <FaChartBar className="mr-2 text-blue-500" /> Location & Device Charts
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Location Chart */}
          <div className="w-full bg-white shadow rounded-lg">
            <h5 className="text-gray-800 text-lg font-medium mb-4 text-center flex items-center justify-center">
              <FaMapMarkerAlt className="mr-2 text-blue-500" /> Location Chart
            </h5>
            <LocationChart accessLogs={accessLogs} />
          </div>

          {/* Device Chart */}
          <div className="w-full bg-white shadow rounded-lg p-4 h-[400px]">
            <h5 className="text-gray-800 text-lg font-medium mb-4 text-center flex items-center justify-center">
              <FaMobileAlt className="mr-2 text-orange-500" /> Device Chart
            </h5>
            <DeviceChart data={deviceData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UrlTrackReport;
