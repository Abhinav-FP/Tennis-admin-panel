import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Details from "./api/Details";
import AuthLayout from "../pages/AuthLayout"
import { useNavigate } from "react-router-dom";
import Api from "./api/Api";

export default function AddRanking() {
    const [loading, setLoading] = useState(false);
    const [btnText, setBtnText] = useState("Submit");
    const[text,setText]=useState("");
    const [formData, setFormData] = useState({
      category: "",
      group: "",
      date: "",
    });

  const gcat = {
    G: "girl",
    B: "boy",
    M: "men",
    W: "women",
    S: "s",
    D: "d",
  };
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Function to delete the token
  const deleteToken = () => {
    localStorage.removeItem('token');
    setToken(null); // Update state if necessary
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  async function handlesubmit(e) {
    e.preventDefault();
    if (loading) {
      return;
    }
    if (formData.category === "") {
      toast.error("Please select Category!!");
      return;
    }
    if (formData.group === "") {
      toast.error("Please select Group!!");
      return;
    }
    setLoading(true);
    // console.log("formData", formData);
    setBtnText("Converting data...");
  
    const urldata = new FormData();
    let url = `https://aitatennis.com/management/upload/ranking/${formData.date}_${formData.category}${formData.group}.pdf`;
    // console.log("link", url);
    urldata.append("url", url);
    urldata.append(
      "sub_category",
      formData?.group.replace("-", "_").toLowerCase()
    );
    urldata.append("category", formData?.category);
    try {
      const main = new Details();
      const response = await main.DataConvert(urldata);
      // console.log("response", response);
  
      if (response.data.status=="false") {
        toast.error(response.data.message);
        setLoading(false);
        setBtnText("Submit");
        return;
      }  
      const json_data = response.data.data.data;
      setBtnText("Uploading data");
      // console.log("json", json_data); 
      let token = localStorage.getItem("token");
      const record = new FormData();
      record.append("date", formData?.date);
      record.append("category", gcat[formData?.category]);
      record.append(
        "sub_category",
        formData?.group.replace("-", "_").toLowerCase()
      );
      record.append("token", token);
      record.append("rank", JSON.stringify(json_data));
  
      // for (let pair of record.entries()) {
      //   console.log(pair[0], pair[1]);
      // }
  
      const resp = await main.AddRanking(record);
      if (resp && resp?.data && resp?.data?.status) {
        toast.success("Data Uploaded Successfully");
        setBtnText("Submit");
        setText(`Last data added for ${formData?.category}-${formData?.group} for ${formData?.date}`);
        setFormData({
          category: "",
          group: "",
          date: "",
        });
        setLoading(false);
      } else {
        toast.error("Failed to update data");
        setLoading(false);
        setBtnText("Submit");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setLoading(false);
      setBtnText("Submit");
    }
  }

  const handleLogout = async () => {
    try {
      const logoutData = new FormData();
      logoutData.append("token",token);
      const response = await Api.post("/api/extract/logout",logoutData);
      // console.log("response",response);
      // if (response?.data?.data?.success === true) {
        deleteToken();
        // console.log("Token Removed");
        toast.success("Logout Successful");
        navigate("/login");
    //   } else {
    //     console.error("Logout request failed");
    //     toast.error("Failed to logout. Please try again.");
    //   }
    } catch (error) {
      deleteToken();
      // console.log("Token Removed");
      toast.success("Logout Successful");
      navigate("/login");
    }
  };
  

  return (
    <AuthLayout>
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      <form
        onSubmit={handlesubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-xl font-bold mb-6 text-center">Update Ranking</h1>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-100 mb-2"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData?.category}
            onChange={handleChange}
            className="bg-gray-700 border border-gray-600 text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">Select Category </option>
            <option value="B">Boys </option>
            <option value="G">Girls </option>
            <option value="M">Mens </option>
            <option value="W">Womens </option>
          </select>
        </div>

        {formData.category === "M" || formData.category === "W" ? (
          <div className="mb-4">
            <label
              htmlFor="group"
              className="block text-sm font-medium text-gray-100 mb-2"
            >
              Group
            </label>
            <select
              id="group"
              name="group"
              value={formData?.group}
              onChange={handleChange}
              className="bg-gray-700 border border-gray-600 text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="">Select group </option>
              <option value="S">Singles</option>
              <option value="D">Doubles</option>
            </select>
          </div>
        ) : (
          <div className="mb-4">
            <label
              htmlFor="group"
              className="block text-sm font-medium text-gray-100 mb-2"
            >
              Group
            </label>
            <select
              id="group"
              name="group"
              value={formData?.group}
              onChange={handleChange}
              className="bg-gray-700 border border-gray-600 text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="">Select group </option>
              <option value="U-12">U-12</option>
              <option value="U-14">U-14</option>
              <option value="U-16">U-16</option>
              <option value="U-18">U-18</option>
            </select>
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-100 mb-2"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData?.date}
            onChange={handleChange}
            className="bg-gray-700 border border-gray-600 text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <button
          type="submit"
          className="bg-[#008f70] w-full rounded-full py-2 px-4 text-white font-medium"
        >
          {btnText}
        </button>
      </form>
      {text && text.length>0?
      <p className="mt-6">{text}</p>
      : null
    }
    <button
          type="submit"
          className="absolute bottom-2.5 right-2.5 max-w-fit bg-[#008f70] w-full rounded-full py-2 px-4 text-white font-medium"
          onClick={handleLogout}
        >
          Logout
        </button>
    </div> 
    </AuthLayout>
  );
}
