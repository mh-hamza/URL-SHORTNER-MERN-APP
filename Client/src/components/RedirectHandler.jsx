import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { SyncLoader } from "react-spinners";
// import logo from "../assets/logo.jpeg";

const RedirectHandler = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRedirectUrl = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/url/redirect/${id}`
        );

        if (response.data.success) {
          const { redirectUrl } = response.data;

          setLoading(false);
          window.location.href = redirectUrl;
        } else {
          console.error("Short URL not found");
          setLoading(false);
          navigate("/not-found");
        }
      } catch (error) {
        console.error("Error fetching URL:", error);
        setLoading(false);
        navigate("/ErrorPage");
      }
    };

    fetchRedirectUrl();
  }, [id, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-100 fixed top-0 left-0">
      {loading ? (
        <div className="flex flex-col items-center">
          {/* Logo and Loading Spinner */}
          {/* <img src={logo} alt="Logo" className="mb-4 w-32" /> */}
          <SyncLoader size={15} color="#00bcd4" loading={loading} />
          <p className="text-lg mt-4 text-gray-600">
            Please wait while we redirect you...
          </p>
        </div>
      ) : (
        <p className="text-lg text-gray-700">Redirecting...</p>
      )}
    </div>
  );
};

export default RedirectHandler;
