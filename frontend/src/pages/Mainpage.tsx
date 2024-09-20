import React from "react";
import { useNavigate } from "react-router-dom";
import { Blogs } from "./Blogs";
import toast, { Toaster } from "react-hot-toast";

export const Mainpage: React.FC = () => {
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successfully");
    setTimeout(() => {
      navigate("/signin");
    }, 2000);
  };

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/signin");
  }
  return (
    <div>
      <button
        onClick={handlelogout}
        className="absolute px-2 py-1 text-white bg-blue-500 rounded top-4 right-4"
      >
        Logout
      </button>
      <Toaster />

      <button
        className="absolute px-2 py-1 text-white bg-blue-500 rounded top-4 left-4"
        onClick={() => navigate("/newblog")}
      >
        Create a Blog
      </button>
      <Blogs />
    </div>
  );
};
