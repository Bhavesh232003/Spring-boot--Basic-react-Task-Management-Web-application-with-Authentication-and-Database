import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "/image1.png";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="w-full sticky top-0 z-50 bg-white/30 backdrop-blur-md border-b border-white/40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo with Image */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl sm:text-2xl font-serif font-bold text-gray-900 drop-shadow-sm hover:text-purple-700 transition"
        >
          <img src="image1.png" alt="Todo Icon" className="w-8 h-8" />
          TODO App
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4 text-sm font-medium">
          {user ? (
            <>
              <Link
                to="/reviews"
                className="px-4 py-1.5 rounded-md text-gray-800 hover:text-purple-700 transition"
              >
                Reviews
              </Link>
              <span className="text-gray-800">
                Welcome,{" "}
                <span className="font-semibold text-purple-700">
                  {user.username}
                </span>
              </span>
              <button
                onClick={logout}
                className="px-4 py-1.5 rounded-md bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 transition shadow-md hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-1.5 rounded-md bg-white/80 text-gray-800 hover:bg-white shadow hover:scale-105 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2.5 rounded-md bg-black/80 text-white font-semibold hover:bg-black transition shadow hover:scale-105 hover:shadow-lg"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
