import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function registerUser(ev) {
    ev.preventDefault();
    setError(null);

    // Basic validation
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);

    try {
      await axios.post("/api/register", { name, email, password });
      toast.success("Registration successful. Now you can log in.");
    } catch (e) {
      toast.error("Registration failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-300 to-purple-500">
      <div className="mb-16 w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-4xl text-center mb-6 font-bold text-gray-800">
          Create Account
        </h1>
        <form onSubmit={registerUser} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            disabled={loading}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            disabled={loading}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            disabled={loading}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : "Register"}
          </button>
          {error && (
            <div className="text-red-500 text-center mt-2 font-medium">
              {error}
            </div>
          )}
          <div className="text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="underline text-indigo-600 hover:text-indigo-800"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
