import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./AdminDashboard.css";

import AdminSidebar from "./AdminSidebar/AdminSidebar";
import AdminHeader from "./AdminHeader/AdminHeader";

import AdminDashboardHome from "./AdminDashboardHome/AdminDashboardHome";
import AdminStudents from "./AdminStudents/AdminStudents";
import AdminAssessmentManagement from "./AdminAssessmentManagement/AdminAssessmentManagement";
import AdminCareerManagement from "./AdminCareerManagement/AdminCareerManagement";
import AdminRoadmapManagement from "./AdminRoadmapManagement/AdminRoadmapManagement";
import AdminAIRecommendations from "./AdminAIRecommendations/AdminAIRecommendations";
import AdminSettings from "./AdminSattings/AdminSattings";


const AdminDashboard = () => {

  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("dashboard");

  // Sidebar Menu Click

  const handleMenuClick = (page) => {

  setActivePage(page);

};

// Render Pages


const renderPage = () => {

  switch (activePage) {

    case "dashboard":
      return (
        <AdminDashboardHome
          setActivePage={setActivePage}
        />
      );

    case "students":
      return <AdminStudents />;

    case "assessment":
      return <AdminAssessmentManagement />;

    case "career":
      return <AdminCareerManagement />;

    case "roadmap":
      return <AdminRoadmapManagement />;

    case "recommendation":
      return <AdminAIRecommendations />;

    case "settings":
      return <AdminSettings />;

    default:
      return (
        <AdminDashboardHome
          setActivePage={setActivePage}
        />
      );

  }

};
  return (

    <div className="admin-dashboard-container">

      <AdminSidebar
        activePage={activePage}
        setActivePage={handleMenuClick}
      />

      <div className="admin-dashboard-main">

        <AdminHeader />

        <div className="admin-dashboard-content">

          {renderPage()}

        </div>

      </div>

     
    </div>

  );

};

export default AdminDashboard;