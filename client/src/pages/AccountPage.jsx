import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext.jsx";
import axios from "axios";
import { Link, Navigate, useParams } from "react-router-dom";

export const AccountPage = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  // Function to generate dynamic link classes
  const linkClasses = (type) => {
    let classes =
      "py-3 px-6 text-sm font-medium rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 ";
    if (type === subpage || (subpage === "profile" && type === "profile")) {
      classes +=
        "bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg";
    } else {
      classes += "bg-gray-100 text-gray-700 hover:bg-gray-200";
    }
    return classes;
  };

  if (!ready) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (ready && !user && !redirect) {
    return <Navigate to="/login" />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  const logout = async () => {
    try {
      await axios.post("/logout");
      setRedirect("/");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Navigation Tabs */}
        <nav className="bg-white rounded-xl shadow-sm p-2 mb-8 flex justify-center gap-2">
          <Link className={linkClasses("profile")} to="/account">
            Мой профиль
          </Link>
        </nav>

        {/* Profile Content */}
        {subpage === "profile" && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8 text-center">
              {/* User Avatar */}
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 p-1">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-12 h-12 text-indigo-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {/* User Info */}
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {user.name}
              </h2>
              <p className="text-gray-600 mb-6">{user.email}</p>

              {/* Logout Button */}
              <button
                onClick={logout}
                className="w-full max-w-xs mx-auto py-3 px-6 bg-gradient-to-r from-indigo-600 to-pink-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Выход из системы
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
