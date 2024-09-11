import { InputBox } from "../components/InputBox";
import { useState, useEffect } from "react";
import { Quote } from "../components/Quote";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin: React.FC = () => {
  const [emailorname, setEmailorname] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const timer = setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [navigate]);

  const handlesignup = async () => {
    try {
      const response = await axios.post("http://localhost:8787/api/v1/user/signin", {
        email: emailorname,
        password: password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.jwt);
        navigate("/dashboard");
      }
    } catch (e) {
      console.error("Sign-in error: ", e);
    }
  };

  if (localStorage.getItem("token")) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-400">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="relative h-screen flex items-center justify-center bg-gray-800">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-50 blur-2xl"></div>

      <div className="relative flex flex-col md:flex-row h-[80vh] w-[90vw] max-w-6xl border border-gray-700 rounded-3xl overflow-hidden shadow-xl">
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 p-8">
          <div className="text-white text-center max-w-md">
            <Quote />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center bg-gray-900 p-8">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>

            <InputBox
              field="Email or Username"
              holder="Enter your Email or Username"
              value={emailorname}
              onChange={(e) => setEmailorname(e.target.value)}
            />
            <InputBox
              field="Password"
              holder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded mt-4 w-full hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onClick={handlesignup}
            >
              Sign In
            </button>
            <button
              className="mt-4 text-white font-semibold w-full hover:underline"
              onClick={() => console.log("Create Account clicked")}
            >
              Create Account?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
