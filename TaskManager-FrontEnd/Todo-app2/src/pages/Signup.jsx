import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignupPage() {
  const [userData, setUserData] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userPayload = {
      username: userData.username.trim(),
      email: userData.email.trim(),
      password: userData.password.trim(),
    };

    setLoading(true);
    setError("");

    try {
      await signup(userPayload);
      navigate("/login");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-400 via-purple-400 to-sky-400 px-4">
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
          Create Account ✨
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
            value={userData.username}
            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white/90 text-gray-800"
          />

          <input
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white/90 text-gray-800"
          />

          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            required
            minLength={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white/90 text-gray-800"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-5 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-black hover:text-white font-semibold py-2.5 rounded-md transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] ${
            loading ? "opacity-80 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Signing up..." : "Sign Up 📝"}
        </button>

        <p className="text-center text-sm text-black mt-6">
          Already have an account?{" "}
          <Link className="font-semibold underline text-blue hover:text-sky-700" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

