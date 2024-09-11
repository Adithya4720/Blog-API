import { InputBox } from "../components/InputBox";
import { useState } from "react";
import { Quote } from "../components/Quote";

export const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const printthem = () => {
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
  };

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
            <h2 className="text-3xl font-bold mb-6 text-center ">
              Sign In
            </h2>

            <InputBox
              field="Username"
              holder="Enter your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputBox
              field="Email"
              holder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputBox
              field="Password"
              holder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded mt-4 w-full hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onClick={() => printthem()}
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
