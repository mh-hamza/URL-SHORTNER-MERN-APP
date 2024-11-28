import React, { useEffect, useState } from "react";
import UrlContainer from "../components/UrlContainer";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import ListCard from "../components/ListCard.jsx";
function Dashboard() {

  const [allUrls, setAllUrls] = useState([]);
  const handleFetchAllUrl = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/url/fetchUrl`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check if the response is successful
      if (response.data.success) {
        console.log("Fetched URLs:", response.data.data);
        setAllUrls(response.data.data);
      } else {
        console.log("Failed to fetch URLs:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching URLs:", error);
    }
  };

  useEffect(() => {
    handleFetchAllUrl();
  }, []);
  const handleCopy = (link) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        console.log("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy the link: ", err);
      });
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return;
      }
  
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/url/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.success) {
        setAllUrls((prevUrls) => prevUrls.filter((url) => url._id !== id));
        toast.success("URL deleted successfully");
      } else {
        toast.error("Failed to delete URL:", response.data.message);
      }
    } catch (error) {
      toast.error("Error deleting URL:", error);
    }
  };
  return (
    <div>
      <div className="max-w-screen-xl mx-auto flex justify-between px-4 py-5">
        <div className="flex-1 bg-blue-50 rounded-lg shadow p-4 mr-2">
          <h3 className="text-lg font-semibold text-gray-700">Links Created</h3>
          <p className="text-2xl font-bold text-blue-600">{allUrls.length}</p>
        </div>

        <div className="flex-1 bg-green-50 rounded-lg shadow p-4 ml-2">
          <h3 className="text-lg font-semibold text-gray-700">Total Clicks</h3>
          <p className="text-2xl font-bold text-green-600">456</p>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto flex justify-between px-4 py-5">
        <h1 className="font-bold text-2xl">My Links</h1>
        <UrlContainer />
      </div>
      <div className="max-w-screen-xl mx-auto flex justify-between px-4 py-5">
        <div className="w-full bg-gray-100 py-5">
          <div className="max-w-screen-xl mx-auto flex items-center bg-white shadow rounded-lg">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 p-2 text-gray-700 outline-none rounded-l-lg"
            />
            <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-r-lg hover:bg-blue-700 flex items-center justify-center">
              <FaSearch className="text-white text-lg" />
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto flex flex-col justify-between px-4 py-5">
        {allUrls.map((url) => (
          <ListCard
          key={url._id}
            title={url.title}
            qrValue={`http://localhost:5173/${url.shortUrl}`}
            link={`http://localhost:5173/${url.shortUrl}`}
            originalUrl={url.redirectUrl}
            createdAt={url.createdAt}
            onCopy={() => handleCopy(`http://localhost:5173/${url.shortUrl}`)}
            onDelete={()=>handleDelete(url._id)}
            navigateLink={`/url/${url.shortUrl}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
