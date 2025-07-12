import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(credentials);
      navigate("/todos");
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center bg-gradient-to-br from-indigo-400 via-purple-400 to-sky-400 px-4 transition-all duration-500">
      <form
        onSubmit={handleSubmit}
        className="animate-fadeIn sm:w-[450px] w-[360px] shadow-xl py-8 sm:px-8 px-4 rounded-xl bg-white/40 backdrop-blur-lg border border-white/30 transition-all hover:scale-[1.02] duration-300"
      >
        <div className="flex justify-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
            alt="User Avatar"
            className="w-16 h-16 rounded-full border-2 border-white shadow"
          />
        </div>

        <h1 className="text-center font-serif text-black font-bold lg:text-3xl text-2xl drop-shadow-md">
          Welcome Back 👋
        </h1>

        <hr className="mt-2 mb-5 border-slate-200 opacity-30" />

        {error && (
          <p className="bg-red-200 text-red-800 px-4 py-2 rounded text-sm mb-4 text-center border border-red-300 shadow-sm">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all hover:shadow-md hover:-translate-y-[1px]"
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all hover:shadow-md hover:-translate-y-[1px]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-5 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-black hover:text-white font-semibold py-2.5 rounded-md transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] ${
            loading ? "opacity-80 cursor-not-allowed" : ""
          }`}
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
              />
            </svg>
          )}
          {loading ? "Logging in..." : "Login 🚀"}
        </button>

        <p className="text-center text-sm text-black  mt-6">
          Don’t have an account?{" "}
          <Link
            className="font-semibold underline text-blue hover:text-sky-700"
            to="/Signup"
          >
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
