import { useEffect, useState } from "react";
import "./AdminHeader.css";

import {
  FaSearch,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";

import { getProfile } from "../../../api/authApi";
import { getAllUsers } from "../../../api/adminApi";

const AdminHeader = () => {

  const [admin, setAdmin] = useState(null);

  const [students, setStudents] = useState([]);

  const [search, setSearch] = useState("");

  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {

    fetchAdmin();

    fetchStudents();

  }, []);

  // ==========================
  // Fetch Admin
  // ==========================

  const fetchAdmin = async () => {

    try {

      const res = await getProfile();

      setAdmin(res.data.user);

    } catch (error) {

      console.log(error);

    }

  };

  // ==========================
  // Fetch Students
  // ==========================

  const fetchStudents = async () => {

    try {

      const response = await getAllUsers();

      setStudents(response.users);

    } catch (error) {

      console.log(error);

    }

  };

  // ==========================
  // Pending Students
  // ==========================

  const pendingStudents = students.filter(
    (student) => !student.isVerified
  );

  // ==========================
  // Search
  // ==========================

  const filteredStudents = students.filter((student) => {

    const keyword = search.toLowerCase();

    return (

      student.fullName?.toLowerCase().includes(keyword) ||

      student.email?.toLowerCase().includes(keyword) ||

      student.university?.toLowerCase().includes(keyword)

    );

  });

  return (

    <header className="admin-header">

      {/* Left */}

      <div className="admin-header-left">

        <h2>Admin Dashboard</h2>

        <p>

          Welcome back

          {admin ? `, ${admin.fullName}` : ""} 👋

        </p>

      </div>

      {/* Right */}

      <div className="admin-header-right">

        {/* Search */}

        <div className="admin-search">

          <FaSearch />

          <input
            type="text"
            placeholder="Search Student..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          {search && (

            <div className="search-dropdown">

              {filteredStudents.length > 0 ? (

                filteredStudents.map((student) => (

                  <div
                    className="search-item"
                    key={student._id}
                  >

                    <strong>
                      {student.fullName}
                    </strong>

                    <p>{student.email}</p>

                  </div>

                ))

              ) : (

                <div className="search-item">

                  No Student Found

                </div>

              )}

            </div>

          )}

        </div>

        {/* Notification */}

        <div className="notification-wrapper">

          <button
            className="admin-notification"
            onClick={() =>
              setShowNotification(!showNotification)
            }
          >

            <FaBell />

            <span>

              {pendingStudents.length}

            </span>

          </button>

          {showNotification && (

            <div className="notification-dropdown">

              <h4>

                Pending Students

              </h4>

              {pendingStudents.length > 0 ? (

                pendingStudents.map((student) => (

                  <div
                    key={student._id}
                    className="notification-item"
                  >

                    <strong>

                      {student.fullName}

                    </strong>

                    <p>

                      Waiting For Approval

                    </p>

                  </div>

                ))

              ) : (

                <div className="notification-item">

                  No Notifications

                </div>

              )}

            </div>

          )}

        </div>

        {/* Profile */}

        <div className="admin-profile">

          {admin?.profileImage ? (

            <img
              src={admin.profileImage}
              alt={admin.fullName}
              className="admin-avatar"
            />

          ) : (

            <FaUserCircle className="admin-avatar-icon" />

          )}

          <div>

            <h4>

              {admin?.fullName || "Loading..."}

            </h4>

            <p>

              {admin?.role === "Admin"

                ? "Super Admin"

                : "Student"}

            </p>

          </div>

        </div>

      </div>

    </header>

  );

};

export default AdminHeader;