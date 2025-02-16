import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import "./index.css";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <header className="flex justify-between items-center p-4 shadow-md">
      <Link to="/" className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>
        <span className="font-bold text-xl">Vimeo</span>
      </Link>

      <nav className="flex gap-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/tutorials" className="hover:underline">
          Tutorials
        </Link>
      </nav>

      <Link
        to={user ? "/account" : "/login"}
        className="flex items-center gap-2 hover:underline"
      >
        {user ? "Account" : "Login"}
      </Link>
    </header>
  );
};

export default Header;
