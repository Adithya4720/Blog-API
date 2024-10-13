import { InputBox } from "../components/InputBox";
import { useState, useEffect } from "react";
import { Quote } from "../components/Quote";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin: React.FC = () => {
  const [emailorname, setEmailorname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  const handlesignup = async () => {
    setLoading(true);
    setError("");

    if (!emailorname || !password) {
      setError("Please fill in both Email/Username and Password.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8787/api/v1/user/signin",
        {
          email: emailorname,
          password: password,
        }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.jwt);
        navigate("/");
      }
    } catch (e) {
      console.error("Sign-in error: ", e);
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (localStorage.getItem("token")) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-400">
        <div className="w-16 h-16 border-t-4 border-b-4 border-gray-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gray-800 md:flex-row overflow-hidden">
      {/* Background Black and White Gradient */}
      <div className="absolute inset-0 opacity-50 bg-gradient-to-br from-black via-gray-600 to-white blur-xl animate-pulse"></div>

      {/* Sign-in Container */}
      <div className="relative flex flex-col md:flex-row h-auto md:h-[80vh] w-[90vw] max-w-6xl border border-gray-700 rounded-3xl overflow-hidden shadow-xl transition-transform duration-500 ease-in-out transform hover:scale-105">
        {/* Left Section with Quote */}
        <div className="flex items-center justify-center flex-1 p-8 bg-gradient-to-br from-black via-gray-700 to-white md:basis-1/2">
          <div className="max-w-md text-center text-white animate-fade-in-up">
            <Quote />
          </div>
        </div>

        {/* Sign-in Form Section */}
        <div className="flex items-center justify-center flex-1 p-4 bg-gray-900 md:p-8 md:basis-1/2">
          <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-110">
            <h2 className="mb-6 text-3xl font-bold text-center text-gray-800 animate-bounce">
              Sign In
            </h2>

            <InputBox
              field="Email or Username"
              holder="Enter your Email or Username"
              value={emailorname}
              types="email"
              onChange={(e) => setEmailorname(e.target.value)}
            />
            <InputBox
              field="Password"
              holder="Enter your Password"
              value={password}
              types="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p className="mb-4 text-sm text-red-500 animate-pulse">{error}</p>
            )}

            <button
              className={`w-full px-4 py-2 mt-4 font-semibold text-white bg-gray-500 rounded transition-all duration-200 hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handlesignup}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Sign In"}
            </button>

            <button
              className="w-full mt-4 font-semibold text-gray-800 hover:underline transition-all duration-200"
              onClick={() => navigate("/signup")}
            >
              Create Account?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
