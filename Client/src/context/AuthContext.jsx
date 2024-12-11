import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found.");
        setUser(null);
        return;
      }

      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/verifyUser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.success) {
          // console.log(res)
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log("Verification error:", error);
        setUser(null);  // Agar error ho toh user ko null set karenge
      }
    };
    verifyUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => useContext(AuthContext);

export { useAuth };
