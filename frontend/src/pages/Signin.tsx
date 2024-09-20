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
        <div className="w-16 h-16 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gray-800 md:flex-row">
      <div className="absolute inset-0 opacity-50 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 blur-2xl"></div>

      <div className="relative flex flex-col md:flex-row h-auto md:h-[80vh] w-[90vw] max-w-6xl border border-gray-700 rounded-3xl overflow-hidden shadow-xl">
        <div className="flex items-center justify-center flex-1 p-8 bg-gradient-to-br from-purple-600 to-indigo-600 md:basis-1/2">
          <div className="max-w-md text-center text-white">
            <Quote />
          </div>
        </div>

        <div className="flex items-center justify-center flex-1 p-4 bg-gray-900 md:p-8 md:basis-1/2">
          <div className="w-full max-w-sm p-8 transition-transform duration-300 bg-white rounded-lg shadow-lg hover:scale-110">
            <h2 className="mb-6 text-3xl font-bold text-center">Sign In</h2>

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

            {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

            <button
              className="w-full px-4 py-2 mt-4 font-semibold text-white bg-indigo-500 rounded"
              onClick={handlesignup}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Sign In"}
            </button>
            <button
              className="w-full mt-4 font-semibold text-slate-800 hover:underline"
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
