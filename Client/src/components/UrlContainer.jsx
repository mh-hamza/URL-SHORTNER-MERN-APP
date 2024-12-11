import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const UrlContainer = ({ onUrlAdded }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const [originalUrl, setOriginalUrl] = useState("");
  const [title, setTitle] = useState("");
  const [customUrl, setCustomUrl] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/url/addUrl`,
        { originalUrl, title, customUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        // console.log(response);
        toast.success(response.data.message);
        setIsPopupOpen(false);
      }
      // for Real time update
      if (onUrlAdded) {
        onUrlAdded();
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Something went wrong!");
      } else {
        toast.error("Unable to connect to the server!");
      }
      console.log(error);
    }
  };

  return (
    <div>
      <button
        onClick={togglePopup}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Create New Link
      </button>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <form onSubmit={handleSubmit}>
            <div className=" max-w-lg md:max-w-xl w-full p-6 bg-white rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Create Short Link
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="short-link-title"
                  className="block text-gray-500 mb-1"
                >
                  Short Link Title
                </label>
                <input
                  type="text"
                  id="short-link-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a title"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="long-url" className="block text-gray-500 mb-1">
                  Enter a Long URL
                </label>
                <div className="flex items-center text-gray-400 border rounded-md">
                  <input
                    type="URL"
                    id="long-url"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    placeholder="http://www.example.com"
                    className="w-full p-2 bg-transparent outline-none"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="custom-url"
                  className="block text-gray-500 mb-1"
                >
                  Custom URL (Optional)
                </label>
                <input
                  type="text"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  id="custom-url"
                  placeholder="Enter a custom URL"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={togglePopup}
                  className="px-4 py-2 bg-gray-300 rounded-md text-gray-700"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UrlContainer;
