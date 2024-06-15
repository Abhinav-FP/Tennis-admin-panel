import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ApiDev from "./api/ApiDev"; // Adjust path as needed

export default function AuthLayout({ children }) {
  const navigate = useNavigate();
  const [content, setContent] = useState([]);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await ApiDev.get("api/self");
        console.log("login check", response.data); // Log the response data for debugging

        if (response.data.success == "false") {
          navigate("/login");
          toast.error("Please log in first.");
        } else {
          setContent(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching authentication:", error);
        navigate("/login");
        toast.error("Please log in first.");
      }
    };

    checkAuthentication();
  }, [navigate]); // Depend on navigate to update useEffect on route change

  return (
    <>
      <main>{children}</main>
    </>
  );
}
