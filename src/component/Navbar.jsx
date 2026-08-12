import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <nav className="navbar container">

        <Link to="/" className="logo">
          CareerAI
        </Link>

        <ul className={menuOpen ? "nav-links active" : "nav-links"}>

          <li>
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              onClick={() => setMenuOpen(false)}
            >
              About
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/register"
              className="register-btn"
              onClick={() => setMenuOpen(false)}
            >
              Register
            </NavLink>
          </li>
          <li>

          <NavLink to="/login" className="login-link">
             Login
            </NavLink>
          </li>
           
        </ul>

        <div
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

      </nav>
    </header>
  );
};

export default Navbar;