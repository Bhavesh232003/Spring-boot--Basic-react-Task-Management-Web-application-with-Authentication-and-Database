import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Todos from "./pages/Todos";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import ReviewPage from "./pages/ReviewPage";
import Footer from "./components/Footer"; // ✅ Corrected path

import "./App.css";
import "./index.css";

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/todos"
              element={
                <PrivateRoute>
                  <Todos />
                </PrivateRoute>
              }
            />
            <Route
              path="/reviews"
              element={
                <PrivateRoute>
                  <ReviewPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <Footer /> {/* ✅ Always shows at bottom */}
      </div>
    </AuthProvider>
  );
}
