import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/api/login", { email, password });
      setUser(data);
      toast.success("Login successful"); // Show success notification
      setTimeout(() => setRedirect(true), 1000); // Delay redirection by 1 second
    } catch (e) {
      toast.error("Login failed"); // Show error notification
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-green-200 to-blue-300">
      <div className="mb-16 w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-4xl text-center mb-6 font-bold text-gray-800">
          Login
        </h1>
        <form className="space-y-4" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
          />
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Login
          </button>
          <div className="text-center py-2 text-gray-600">
            Don't have an account yet?{" "}
            <Link
              className="underline text-green-600 hover:text-green-800"
              to={"/register"}
            >
              Register now
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer /> {/* Container for toast notifications */}
    </div>
  );
};

export default LoginPage;
