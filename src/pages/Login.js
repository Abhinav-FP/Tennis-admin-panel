import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Details from "./api/Details";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  async function handlesubmit(e) {
    e.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const logindata = new FormData();
      logindata.append("username", formData?.username);
      logindata.append("password", formData?.password);
      const main = new Details();
      const response = await main.login(logindata); // Await the response
      // console.log("response",response);
      if (response.data.data.success) {
        toast.success(response?.data?.data?.message);
        localStorage.setItem("token", response?.data?.data?.token);
        navigate("/");
      } else {
        toast.error(response?.data?.data?.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        toast.error(error.response.data.message || "Validation error");
      } else {
        toast.error("Invalid login details");
      }
    } finally {
      setLoading(false); 
    }
  }

  return (
    <div className="bg-gray-900 text-gray-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-gray-800 rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-100 md:text-2xl">
              Login
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handlesubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-100"
                >
                  Your Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData?.username}
                  onChange={handleChange}
                  className="bg-gray-700 border border-gray-600 text-gray-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-100"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData?.password}
                  onChange={handleChange}
                  className="bg-gray-700 border border-gray-600 text-gray-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-[#008f70] w-full rounded-full py-2 px-4"
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
