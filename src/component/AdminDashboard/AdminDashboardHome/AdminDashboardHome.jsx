import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboardHome.css";

import {

  FaUsers,

  FaUserCheck,

  FaUserClock,

  FaRobot,

  FaCheckCircle,

  FaDatabase,

  FaServer,

  FaShieldAlt,

} from "react-icons/fa";

import { getAdminDashboard } from "../../../api/authApi";

const AdminDashboardHome = ({
  setActivePage,
}) => {
const navigate = useNavigate();
  const [dashboard, setDashboard] = useState({

    admin: {},

    stats: {

      totalStudents: 0,

      approvedStudents: 0,

      pendingStudents: 0,

    },

    recentStudents: [],

  });

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    try {

      const res = await getAdminDashboard();

      setDashboard({

        admin: res.data.admin,

        stats: res.data.stats,

        recentStudents: res.data.recentStudents,

      });

    } catch (error) {

      console.log(error);

    }

  };

  const {

    admin,

    stats,

    recentStudents,

  } = dashboard;

  return (

    <div className="dashboard-home">

      {/* ====================================== */}

      {/* Header */}

      {/* ====================================== */}

      <div className="dashboard-header">

        <div>

          <h1>

            Analytics Dashboard

          </h1>

          <p>

            Welcome back,

            <span>

              {admin?.fullName || "Admin"}

            </span>

          </p>

        </div>

        <div className="dashboard-filter">

          <button>

            7d

          </button>

          <button>

            30d

          </button>

          <button className="active">

            90d

          </button>

        </div>

      </div>

      {/* ====================================== */}

      {/* Statistics */}

      {/* ====================================== */}

      <div className="stats-grid">

        <div className="stat-card">

          <div className="stat-icon blue">

            <FaUsers />

          </div>

          <div className="stat-content">

            <small>

              Total Students

            </small>

            <h2>

              {stats.totalStudents}

            </h2>

            <p>

              Registered Students

            </p>

          </div>

        </div>

        <div className="stat-card">

          <div className="stat-icon green">

            <FaUserCheck />

          </div>

          <div className="stat-content">

            <small>

              Approved

            </small>

            <h2>

              {stats.approvedStudents}

            </h2>

            <p>

              Verified Accounts

            </p>

          </div>

        </div>

        <div className="stat-card">

          <div className="stat-icon orange">

            <FaUserClock />

          </div>

          <div className="stat-content">

            <small>

              Pending

            </small>

            <h2>

              {stats.pendingStudents}

            </h2>

            <p>

              Awaiting Approval

            </p>

          </div>

        </div>

        <div className="stat-card">

          <div className="stat-icon purple">

            <FaRobot />

          </div>

          <div className="stat-content">

            <small>

              AI Engine

            </small>

            <h2>

              Online

            </h2>

            <p>

              Gemini Connected

            </p>

          </div>

        </div>

      </div>

      {/* ====================================== */}

      {/* Middle Grid */}

      {/* ====================================== */}

      <div className="middle-grid">
                {/* ======================================
                Recent Students
        ====================================== */}

        <div className="dashboard-card recent-card">

          <div className="card-header">

            <div>

              <h3>

                Recent Students

              </h3>

              <p>

                Latest registered students

              </p>

            </div>

         <button

    className="view-all-btn"

    onClick={() => setActivePage("students")}

>

    View All

</button>
          </div>

          <div className="student-list">

            {

              recentStudents.length > 0 ?

              (

                recentStudents.map((student)=>(

                  <div
                    key={student._id}
                    className="student-item"
                  >

                    <div className="student-left">

                      <div className="student-avatar">

                        {

                          student.fullName

                          ?.charAt(0)

                          .toUpperCase()

                        }

                      </div>

                      <div>

                        <h4>

                          {student.fullName}

                        </h4>

                   <p>
  {student.educationLevel === "University"
    ? [
        student.department,
        student.university,
      ]
        .filter(Boolean)
        .join(" • ") || "University Student"
    : student.educationLevel === "Intermediate"
    ? student.intermediateCollege || "Intermediate Student"
    : student.matricSchool || "Matric Student"}
</p>

                      </div>

                    </div>

                    <div>

                      {

                        student.isVerified ?

                        (

                          <span className="badge approved">

                            Approved

                          </span>

                        )

                        :

                        (

                          <span className="badge pending">

                            Pending

                          </span>

                        )

                      }

                    </div>

                  </div>

                ))

              )

              :

              (

                <div className="empty-box">

                  No Students Found

                </div>

              )

            }

          </div>

        </div>

        {/* ======================================
                Platform Status
        ====================================== */}

        <div className="dashboard-card status-card">

          <div className="card-header">

            <div>

              <h3>

                Platform Status

              </h3>

              <p>

                Live System Health

              </p>

            </div>

          </div>

          <div className="status-list">

            <div className="status-row">

              <div className="status-left">

                <FaRobot />

                <div>

                  <h4>

                    AI Engine

                  </h4>

                  <p>

                    Gemini Connected

                  </p>

                </div>

              </div>

              <span className="online">

                Online

              </span>

            </div>

            <div className="status-row">

              <div className="status-left">

                <FaDatabase />

                <div>

                  <h4>

                    MongoDB

                  </h4>

                  <p>

                    Database Healthy

                  </p>

                </div>

              </div>

              <FaCheckCircle className="status-check"/>

            </div>

            <div className="status-row">

              <div className="status-left">

                <FaServer />

                <div>

                  <h4>

                    Backend

                  </h4>

                  <p>

                    Express Server

                  </p>

                </div>

              </div>

              <FaCheckCircle className="status-check"/>

            </div>

            <div className="status-row">

              <div className="status-left">

                <FaShieldAlt />

                <div>

                  <h4>

                    Authentication

                  </h4>

                  <p>

                    JWT Protected

                  </p>

                </div>

              </div>

              <FaCheckCircle className="status-check"/>

            </div>

          </div>

        </div>

      </div>

      {/* ======================================
              Bottom Grid
      ====================================== */}

      <div className="bottom-grid">
              {/* ======================================
              Latest Activity
      ====================================== */}

      <div className="dashboard-card">

        <div className="card-header">

          <div>

            <h3>

              Latest Activity

            </h3>

            <p>

              Recent platform updates

            </p>

          </div>

        </div>

        <div className="activity-list">

          <div className="activity-item">

            <div className="activity-dot blue"></div>

            <div className="activity-info">

              <h4>

                New Student Registrations

              </h4>

              <p>

                Total registered students

              </p>

            </div>

            <strong>

              {stats.totalStudents}

            </strong>

          </div>

          <div className="activity-item">

            <div className="activity-dot green"></div>

            <div className="activity-info">

              <h4>

                Approved Accounts

              </h4>

              <p>

                Successfully verified

              </p>

            </div>

            <strong>

              {stats.approvedStudents}

            </strong>

          </div>

          <div className="activity-item">

            <div className="activity-dot orange"></div>

            <div className="activity-info">

              <h4>

                Pending Approval

              </h4>

              <p>

                Waiting for verification

              </p>

            </div>

            <strong>

              {stats.pendingStudents}

            </strong>

          </div>

          <div className="activity-item">

            <div className="activity-dot purple"></div>

            <div className="activity-info">

              <h4>

                AI Recommendation

              </h4>

              <p>

                Gemini AI is running normally

              </p>

            </div>

            <span className="badge online">

              Online

            </span>

          </div>

        </div>

      </div>

      {/* ======================================
              Quick Overview
      ====================================== */}

      <div className="dashboard-card">

        <div className="card-header">

          <div>

            <h3>

              Quick Overview

            </h3>

            <p>

              Platform summary

            </p>

          </div>

        </div>

        <div className="overview-list">

          <div className="overview-item">

            <span>

              Total Students

            </span>

            <strong>

              {stats.totalStudents}

            </strong>

          </div>

          <div className="overview-item">

            <span>

              Approved Students

            </span>

            <strong>

              {stats.approvedStudents}

            </strong>

          </div>

          <div className="overview-item">

            <span>

              Pending Students

            </span>

            <strong>

              {stats.pendingStudents}

            </strong>

          </div>

          <div className="overview-item">

            <span>

              AI Engine

            </span>

            <strong className="online-text">

              Online

            </strong>

          </div>

          <div className="overview-item">

            <span>

              Backend

            </span>

            <strong className="online-text">

              Running

            </strong>

          </div>

          <div className="overview-item">

            <span>

              Database

            </span>

            <strong className="online-text">

              Healthy

            </strong>

          </div>

        </div>

      </div>

      </div>

    </div>

  );

};

export default AdminDashboardHome;
    