import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import BaseUrl from "../constant/Url";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BaseUrl}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("access_token", data.data.access_token);
      localStorage.setItem("role", data.data.role);
      Toastify({
        text: "Succeed Login",
        duration: 3000,
        gravity: "bottom",
        position: "right",
        style: { background: "#34D399", color: "black", borderRadius: "8px" },
      }).showToast();
      navigate("/app/home");
    } catch (error) {
      Toastify({
        text: error.response?.data?.message || "Login failed",
        duration: 3000,
        gravity: "bottom",
        position: "right",
        style: { background: "#F87171", color: "black", borderRadius: "8px" },
      }).showToast();
    }
  };

  async function handleGoogleLogin(credentialResponse) {
    try {
      const { data } = await axios.post(`${BaseUrl}/auth/google`, {
        googleToken: credentialResponse.credential,
      });
      localStorage.setItem("access_token", data.data.access_token);
      localStorage.setItem("role", data.data.role);
      Toastify({
        text: "Succeed Login with Google",
        duration: 3000,
        gravity: "bottom",
        position: "right",
        style: { background: "#34D399", color: "black", borderRadius: "8px" },
      }).showToast();
      navigate("/app/home");
    } catch (error) {
      Toastify({
        text: error.response?.data?.message || "Google Login failed",
        duration: 3000,
        gravity: "bottom",
        position: "right",
        style: { background: "#F87171", color: "black", borderRadius: "8px" },
      }).showToast();
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center mt-2">Login to your account</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Login
          </button>

          <div className="flex items-center gap-3 my-4">
            <hr className="flex-1 border-gray-300" />
            <span className="text-gray-400 text-sm">OR</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Google Login Button */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                Toastify({
                  text: "Google Login failed",
                  duration: 3000,
                  gravity: "bottom",
                  position: "right",
                  style: {
                    background: "#F87171",
                    color: "black",
                    borderRadius: "8px",
                  },
                }).showToast();
              }}
            />
          </div>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-green-600 font-semibold hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
