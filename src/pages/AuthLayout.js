import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ApiDev from "./api/ApiDev"; // Adjust path as needed

export default function AuthLayout({ children }) {
  const navigate = useNavigate();
  const [content, setContent] = useState([]);

  const checkAuthentication = async () => {
    try {
      const response = await ApiDev.get("api/self");
      // console.log("login check", response.data);
      if (response.data.success == "false") {
        navigate("/login");
        toast.error("Please log in first.");
      } else {
        setContent(response.data.data);
      }
    } catch (error) {
      // console.error("Error fetching authentication:", error);
      navigate("/login");
      toast.error("Please log in first.");
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    checkAuthentication();
    return () => controller.abort();
  }, []); 

  return (
    <>
      <main>{children}</main>
    </>
  );
}
