import { useState, useRef, useEffect } from "react";
import "./Header.css";

import {
  FaBars,
  FaChevronDown,
} from "react-icons/fa";

import { useUser } from "../../../context/UserContext";

const Header = ({
  setSidebarOpen,
  setActivePage,
  onLogout,
}) => {

  const { user } = useUser();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {

    const closeMenu = (e) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }

    };

    document.addEventListener(
      "mousedown",
      closeMenu
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        closeMenu
      );

  }, []);

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17)
    greeting = "Good Afternoon";

  const today = new Date().toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
    }
  );

  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((i) => i[0])
        .join("")
        .toUpperCase()
    : "U";

  return (

    <header className="dashboard-header">

      <div className="header-left">

        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars />
        </button>

        <div className="header-title">

          <h2>

            {greeting}

            {user?.fullName
              ? `, ${user.fullName.split(" ")[0]}`
              : ""}

            
          </h2>

          <p>{today}</p>

        </div>

      </div>

      <div
        className="header-profile"
        ref={dropdownRef}
      >

        <div
          className="profile-trigger"
          onClick={() =>
            setOpen(!open)
          }
        >

          <div className="profile-avatar">

            {initials}

          </div>

          <div className="profile-text">

            <h4>

              {user?.fullName}

            </h4>

            <span>

              {user?.department || "Student"}

            </span>

          </div>

          <FaChevronDown
            className={`arrow ${
              open ? "rotate" : ""
            }`}
          />

        </div>

        {open && (

          <div className="profile-dropdown">

            <div className="dropdown-header">

              <h3>

                {user?.fullName}

              </h3>

              <p>

                {user?.email}

              </p>

            </div>

            <button
              onClick={() => {

                setActivePage("profile");

                setOpen(false);

              }}
            >
              My Profile
            </button>
            <button
              className="logout-btn"
              onClick={onLogout}
            >
              Logout
            </button>

          </div>

        )}

      </div>

    </header>

  );

};

export default Header;