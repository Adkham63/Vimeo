import { useState, useContext } from "react";
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

  function linkClasses(type) {
    let classes = "py-2 px-6 ";
    if (type === subpage || (subpage === "profile" && type === "profile")) {
      classes += "bg-primary text-white rounded-full";
    }
    return classes;
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-2">
        <Link className={linkClasses("profile")} to="/account">
          My profile
        </Link>
        {/* <Link className={linkClasses("bookings")} to="/account/bookings">
          My bookings
        </Link>
        <Link className={linkClasses("places")} to="/account/places">
          My accommodations
        </Link> */}
      </nav>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button className="primary max-w-sm mt-2" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
