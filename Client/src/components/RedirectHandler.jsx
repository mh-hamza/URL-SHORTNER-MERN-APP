import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RedirectHandler = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRedirectUrl = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/url/redirect/${id}`
        );

        if (response.data.success) {
          const { redirectUrl } = response.data;
          
          window.location.href = redirectUrl;
        } else {
          console.error("Short URL not found");
          navigate("/not-found"); 
        }
      } catch (error) {
        console.error("Error fetching URL:", error);
        navigate("/not-found"); 
      }
    };

    fetchRedirectUrl();
  }, [id, navigate]);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
};

export default RedirectHandler;
