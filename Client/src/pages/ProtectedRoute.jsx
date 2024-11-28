import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = () => {
  const [isLoading, setIsLoading] = useState(true); 
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token"); // Get token from storage
        if (!token) {
          setIsLoading(false);
          setIsVerified(false);
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/verifyUser`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the headers
          },
        });

        if (response.data.success) {
          setIsVerified(true); // Set verification as successful
          console.log("Response from Protected"+response)
        } else {
          setIsVerified(false);
        }
      } catch (error) {
        console.error("Verification failed:", error);
        setIsVerified(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading state while verifying
  }

  return isVerified ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
