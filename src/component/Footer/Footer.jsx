import "./Footer.css";

import { Link } from "react-router-dom";

import {
  FaGraduationCap,
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  const quickLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About Us",
      path: "/about",
    },
    {
      name: "Contact",
      path: "/contact",
    },
    {
      name: "Login",
      path: "/login",
    },
  ];

  const features = [
    "AI Career Mentor",
    "Career Recommendation",
    "Career Roadmap",
    "Study Planner",
    "Learning Resources",
  ];

  return (
    <footer className="footer">

      <div className="footer-container">

        {/* =======================================
            About
        ======================================= */}

        <div className="footer-column footer-about">

          <div className="footer-logo">

            <FaGraduationCap />

            <h2>AI Career</h2>

          </div>

          <p>
            AI Career & Study Growth Platform helps
            students discover the right career path,
            improve technical skills, follow personalized
            roadmaps, and prepare for their future with
            AI-powered guidance.
          </p>

          <div className="footer-social">

            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaLinkedinIn />
            </a>

            <a href="#">
              <FaGithub />
            </a>

          </div>

        </div>

        {/* =======================================
            Quick Links
        ======================================= */}

        <div className="footer-column">

          <h3>Quick Links</h3>

          <ul>

            {quickLinks.map((item) => (

              <li key={item.name}>

                <Link to={item.path}>
                  {item.name}
                </Link>

              </li>

            ))}

          </ul>

        </div>

        {/* =======================================
            Features
        ======================================= */}

        <div className="footer-column">

          <h3>Platform Features</h3>

          <ul>

            {features.map((item) => (

              <li key={item}>
                {item}
              </li>

            ))}

          </ul>

        </div>

        {/* =======================================
            Contact
        ======================================= */}

        <div className="footer-column">

          <h3>Contact Us</h3>

          <ul className="contact-list">

            <li>

              <FaEnvelope />

              <span>
                jamalimashooq39@gmail.com
              </span>

            </li>

            <li>

              <FaPhoneAlt />

              <span>
                +92 3063949769
              </span>

            </li>

            <li>

              <FaMapMarkerAlt />

              <span>
                Hyderabad, Pakistan
              </span>

            </li>

          </ul>

        </div>

      </div>

      {/* =======================================
          Bottom
      ======================================= */}

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} AI Career &
          Study Growth Platform. All Rights Reserved.
        </p>

        <div className="footer-bottom-links">

          <Link to="/privacy">
            Privacy Policy
          </Link>

          <Link to="/terms">
            Terms & Conditions
          </Link>

          <Link to="/cookies">
            Cookies
          </Link>

        </div>

      </div>

    </footer>
  );
};

export default Footer;