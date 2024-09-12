import React from "react";
import { useNavigate } from "react-router-dom";
import { Blogs } from "./Blogs";

export const Mainpage: React.FC = () => {
  const handlelogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/signin";
  }
  return (
    <div>
      <button
        onClick={handlelogout}
        className="absolute top-4 right-4 bg-blue-500 text-white py-1 px-2 rounded"
      >
        Logout
      </button>

      <button
        className="absolute top-4 left-4 bg-blue-500 text-white py-1 px-2 rounded"
        onClick={() => navigate("/newblog")}
      >
        Create a Blog
      </button>
      <Blogs />
    </div>
  );
};
