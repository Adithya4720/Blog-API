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

    try {
      const response = await axios.post(
        "https://backend.hegdeadithyak.workers.dev/api/v1/user/signin",
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
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="relative h-screen flex flex-col md:flex-row items-center justify-center bg-gray-800">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-50 blur-2xl"></div>

      <div className="relative flex flex-col md:flex-row h-auto md:h-[80vh] w-[90vw] max-w-6xl border border-gray-700 rounded-3xl overflow-hidden shadow-xl">
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 p-8 md:basis-1/2">
          <div className="text-white text-center max-w-md">
            <Quote />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center bg-gray-900 p-4 md:p-8 md:basis-1/2">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full hover:scale-110 transition-transform duration-300">
            <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>

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

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded mt-4 w-full"
              onClick={handlesignup}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Sign In"}
            </button>
            <button
              className="mt-4 text-slate-800 font-semibold w-full hover:underline"
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
