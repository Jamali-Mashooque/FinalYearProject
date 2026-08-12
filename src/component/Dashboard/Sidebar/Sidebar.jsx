import "./Sidebar.css";

import {
  FaHome,
  FaRobot,
  FaUser,
  FaCompass,
  FaRoute,
  FaCalendarAlt,
FaGraduationCap,
  FaSignOutAlt,

} from "react-icons/fa";

const Sidebar = ({
  activePage,
  setActivePage,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const menus = [
    {
      id: "dashboard",
      name: "Dashboard",
      icon: <FaHome />,
    },
    {
      id: "mentor",
      name: "AI Mentor",
      icon: <FaRobot />,
    },
    {
      id: "profile",
      name: "My Profile",
      icon: <FaUser />,
    },
    {
      id: "career",
      name: "Career Recommendation",
      icon: <FaCompass />,
    },
    {
      id: "roadmap",
      name: "Career Roadmap",
      icon: <FaRoute />,
    },
    {
      id: "planner",
      name: "Study Planner",
      icon: <FaCalendarAlt />,
    },
  
  
    {
      id: "logout",
      name: "Logout",
      icon: <FaSignOutAlt />,
    },
  ];

  const handleClick = (page) => {
    setActivePage(page);

    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <aside
      className={`sidebar ${
        sidebarOpen ? "sidebar-open" : ""
      }`}
    >
      <div className="sidebar-logo">
        <div className="logo-icon">
          <FaGraduationCap />
        </div>

        <div>
          <h2>AI Career</h2>
          <span>Study Growth Platform</span>
        </div>
      </div>

      <div className="sidebar-menu">
        {menus.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`sidebar-item ${
              activePage === item.id
                ? "active"
                : ""
            } ${
              item.id === "logout"
                ? "logout"
                : ""
            }`}
          >
            <div className="sidebar-icon">
              {item.icon}
            </div>

            <span>{item.name}</span>
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <p>AI Career & Study Growth Platform</p>

        <small>Version 1.0</small>
      </div>
    </aside>
  );
};

export default Sidebar;