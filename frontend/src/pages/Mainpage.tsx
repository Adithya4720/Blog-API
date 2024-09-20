import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Blogs } from "./Blogs";

import { FaUserCircle, FaBlog, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export const Mainpage: React.FC = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successful");
    setTimeout(() => {
      navigate("/signin");
    }, 2000);
  };

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/signin");
  }

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(
          "https://backend.hegdeadithyak.workers.dev/api/v1/user/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsername(response.data.name);
      } catch (error) {
        console.error("Failed to fetch username", error);
        setUsername("User"); // Fallback if username cannot be fetched
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchUsername();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <div className="relative flex items-center">
          <FaUserCircle
            className="text-4xl text-blue-500 cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
          <span className="ml-2 text-lg font-semibold text-gray-700">
            {username}
          </span>
          {isDropdownOpen && (
            <div className="absolute top-12 left-0 bg-white shadow-lg rounded-lg py-2 w-48">
              <button
                className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-200"
                onClick={() => {
                  setIsDropdownOpen(false);
                  navigate("/myblogs");
                }}
              >
                <FaBlog className="mr-2 text-blue-500" /> My Blogs
              </button>
              <button
                className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-200"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="mr-2 text-red-500" /> Logout
              </button>
            </div>
          )}
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
          onClick={() => navigate("/newblog")}
        >
          Create a Blog
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Blogs</h2>
        <Blogs />
      </div>

      <div>
        <button
          onClick={handleLogout}
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
    </div>
  );
};
