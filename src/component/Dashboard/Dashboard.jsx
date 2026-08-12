import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Dashboard.css";

import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";

import DashboardHome from "./DashboardHome/DashboardHome";
import Profile from "./Profile/Profile";
import CareerRecommendation from "./CareerRecommendation/CareerRecommendation";
import StudyPlanner from "./StudyPlanner/StudyPlanner";


import LogoutModal from "./LogoutModal/LogoutModal";

import FloatingAIButton from "../AICareerMentor/FloatingAIButton";
import AICareerMentor from "../AICareerMentor/AICareerMentor";

import { logoutUser } from "../../api/authApi";
import Roadmap from "./Roadmap/Roadmap";

const Dashboard = () => {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("dashboard");
  const [showLogout, setShowLogout] = useState(false);

  // Mobile Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = (page) => {
    if (page === "logout") {
      setShowLogout(true);
      return;
    }

    setActivePage(page);

    // Auto close sidebar on mobile
    setSidebarOpen(false);
  };

  const handleLogout = async () => {
    try {
      const res = await logoutUser();

      alert(res.data.message);

      setShowLogout(false);

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Logout Failed"
      );
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <DashboardHome
            setActivePage={setActivePage}
          />
        );

      case "mentor":
        return (
          <AICareerMentor
            onClose={() =>
              setActivePage("dashboard")
            }
          />
        );

      case "profile":
        return <Profile />;

      case "career":
        return (
          <CareerRecommendation
            setActivePage={setActivePage}
          />
        );

      case "roadmap":
        return (
          <Roadmap
            setActivePage={setActivePage}
          />
        );

      case "planner":
        return <StudyPlanner />;


    

      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="dashboard-container">

      {/* Overlay */}
      {sidebarOpen && activePage !== "mentor" && (
        <div
          className="sidebar-overlay"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      {/* Outer app sidebar — hidden while AI Mentor's own
          chat sidebar is showing, to avoid two sidebars
          competing for space. Back arrow returns here. */}
      {activePage !== "mentor" && (
        <Sidebar
          activePage={activePage}
          setActivePage={handleMenuClick}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      )}

      <div className="dashboard-main">

        {activePage !== "mentor" && (
         <Header
             setSidebarOpen={setSidebarOpen}
             setActivePage={setActivePage}
             onLogout={() => setShowLogout(true)}
           />
        )}

        <div
          className={`dashboard-content ${
            activePage === "mentor"
              ? "mentor-page"
              : ""
          }`}
        >
          {renderPage()}
        </div>

      </div>

      {showLogout && (
        <LogoutModal
          onCancel={() =>
            setShowLogout(false)
          }
          onLogout={handleLogout}
        />
      )}

      {/* Floating AI Button */}
      {activePage !== "mentor" && (
        <FloatingAIButton
          onClick={() =>
            setActivePage("mentor")
          }
        />
      )}

    </div>
  );
};

export default Dashboard;