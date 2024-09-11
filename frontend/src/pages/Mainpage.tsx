import React, { useEffect } from "react";
import axios from "axios";

export const Mainpage: React.FC = () => {
  const handlelogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

useEffect(() => {
    const fetch_data = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/signin";
        } else {
            try {
                const userResponse = await axios.get("http://localhost:8787/api/v1/user/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(userResponse.data.email);
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
    </div>
  );
};
