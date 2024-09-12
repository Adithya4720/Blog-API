import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Mainpage: React.FC = () => {
  const handlelogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

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
          setUser(userResponse.data.name);
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
            className="absolute top-4 right-4 bg-blue-500 text-white py-1 px-2 rounded"
        >
            Logout
        </button>
        <div className="text-3xl font-semibold text-center">Welcome to the Main Page</div>
        <div className="text-sm font-medium text-center mt-2">
            <div className="text-2xl font-semibold text-center">User: {user}</div>
            <div className="text-2xl font-semibold text-center">Email: {email}</div>
        <button className="absolute top-4 left-4 bg-blue-500 text-white py-1 px-2 rounded" onClick={() => navigate("/newblog")}>
            Create a Blog    
        </button>
    </div>
    </div>
);
};
