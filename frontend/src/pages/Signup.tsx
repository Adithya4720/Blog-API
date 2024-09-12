import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handlesignup = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await axios.post("https://backend.hegdeadithyak.workers.dev/api/v1/user/signup", {
                email: email,
                password: password,
                name: name,
            });

            if (response.status === 200) {
                localStorage.setItem("token", response.data.jwt);
                navigate("/");
            }
        } catch (e) {
            console.error("Sign-up error: ", e);
            setError("Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="w-96 bg-white shadow-lg rounded-lg p-6">
                <div className="text-3xl font-semibold text-center">Sign up</div>
                <div className="text-sm font-medium text-center mt-2">
                    Already have an account? <a href="/signin" className="text-blue-500">Sign in</a>
                </div>
                <div className="mt-4">
                    <div className="text-sm font-medium text-left py-2">
                        <label className="block mb-1">Full Name</label>
                        <input
                            type="text"
                            className="w-full px-2 py-1 border rounded border-slate-400"
                            placeholder="Enter your full name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="text-sm font-medium text-left py-2">
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-2 py-1 border rounded border-slate-400"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="text-sm font-medium text-left py-2">
                        <label className="block mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-2 py-1 border rounded border-slate-400"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="text-sm font-medium text-left py-2">
                        <button className="w-full bg-blue-500 text-white py-1 rounded" onClick={handlesignup}>
                            {loading ? "Signing up..." : "Sign up"}
                        </button>
                    </div>
                    {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                </div>
            </div>
        </div>
    );
};