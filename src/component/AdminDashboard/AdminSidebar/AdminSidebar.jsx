import "./AdminSidebar.css";

import {
  FaHome,
  FaUsers,
  FaClipboardCheck,
  FaBriefcase,
  FaBookOpen,
  FaRobot,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../api/authApi";

const AdminSidebar = ({ activePage, setActivePage }) => {

  const navigate = useNavigate();

  // ===============================
  // Sidebar Menu
  // ===============================

  const menus = [

    {
      id: "dashboard",
      name: "Dashboard",
      icon: <FaHome />,
    },

    {
      id: "students",
      name: "Student Management",
      icon: <FaUsers />,
    },

    {
      id: "assessment",
      name: "Assessment Management",
      icon: <FaClipboardCheck />,
    },

    {
      id: "career",
      name: "Career Management",
      icon: <FaBriefcase />,
    },

    {
      id: "roadmap",
      name: "Roadmap Review",
      icon: <FaBookOpen />,
    },

    {
      id: "recommendation",
      name: "Recommendation Review",
      icon: <FaRobot />,
    },

    {
      id: "settings",
      name: "Settings",
      icon: <FaCog />,
    },

    {
      id: "logout",
      name: "Logout",
      icon: <FaSignOutAlt />,
    },

  ];

  // ===============================
  // Logout
  // ===============================

  const handleLogout = async () => {

    try {

      const response = await logoutUser();

      alert(response.data.message);

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Logout Failed"
      );

    }

  };

  return (

    <div className="admin-sidebar">

      <div className="admin-logo">
        AI Career Admin
      </div>

      <ul>

        {menus.map((item) => (

          <li
            key={item.id}
            className={
              item.id !== "logout" &&
              activePage === item.id
                ? "active"
                : ""
            }
            onClick={() => {

              if (item.id === "logout") {

                handleLogout();

              } else {

                setActivePage(item.id);

              }

            }}
          >

            {item.icon}

            <span>{item.name}</span>

          </li>

        ))}

      </ul>

    </div>

  );

};

export default AdminSidebar;