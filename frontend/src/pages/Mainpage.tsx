import React, { useEffect, useState } from "react";
import axios from "axios";

export const Mainpage: React.FC = () => {
  const handlelogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetch_data = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/signin";
      } else {
        try {
          const userResponse = await axios.get(
            "http://localhost:8787/api/v1/user/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setEmail(userResponse.data.email);
          setUser(userResponse.data.    name);
        } catch (e) {
          console.error("User fetch error: ", e);
        }
      }
    };
    fetch_data();
  }, []);

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/signin";
  }

  return (
    <div>
      <button
        onClick={handlelogout}
        className="w-full bg-blue-500 text-white py-1 rounded"
      >
        Logout
      </button>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-96">
          <div className="text-3xl font-semibold text-center">Main Page</div>
          <div className="text-sm font-medium text-center mt-2">
            Welcome, {user}
          </div>
          <div className="text-sm font-medium text-center mt-2">{email}</div>
        </div>
      </div>
    </div>
  );
};
