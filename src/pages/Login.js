import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
    console.log("formData", formData);
    try {
      const logindata = new FormData();
      logindata.append("username", formData?.username);
      logindata.append("password", formData?.password);
      const response = await ApiLocal.post("/extract/login", logindata);
      // console.log("response", response);

      if (response.data.data.success) {
        toast.success(response?.data?.data?.message);
        setLoading(false);
        localStorage && localStorage.setItem("logintoken", response?.data?.data?.token);
        navigate("/player/add");
      } else {
        toast.error(response?.data?.data?.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
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
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
                >
                  Your Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData?.username}
                  onChange={handleChange}
                  className="bg-gray-700 border border-gray-600 text-gray-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-100 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData?.username}
                  onChange={handleChange}
                  className="bg-gray-700 border border-gray-600 text-gray-100 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <button
              onClick={handlesubmit}
                type="submit"
                className="bg-[#008f70] w-full rounded-full py-2 px-4"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
