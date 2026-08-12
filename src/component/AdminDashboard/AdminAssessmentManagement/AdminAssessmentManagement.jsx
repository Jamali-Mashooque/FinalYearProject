import { useEffect, useState } from "react";

import "./AdminAssessmentManagement.css";

import {
  FaSearch,
  FaEye,
  FaTrash,
  FaClipboardCheck,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import {
  getAllAssessments,
  deleteAssessment,
} from "../../../api/adminApi";

import ViewAssessmentModal from "./ViewAssessmentModal";

const AdminAssessmentManagement = () => {

  const [assessments, setAssessments] = useState([]);

  const [filteredAssessments, setFilteredAssessments] = useState([]);

  const [search, setSearch] = useState("");

  const [selectedAssessment, setSelectedAssessment] =
    useState(null);

  const [showViewModal, setShowViewModal] =
    useState(false);

  // =====================================
  // Fetch Assessments
  // =====================================

  const fetchAssessments = async () => {

    try {

      const res = await getAllAssessments();

      setAssessments(res.assessments);

      setFilteredAssessments(res.assessments);

    } catch (error) {

      console.log(error);

      alert("Failed to load assessments.");

    }

  };

  useEffect(() => {

    fetchAssessments();

  }, []);

  // =====================================
  // Search
  // =====================================

  useEffect(() => {

    const filtered = assessments.filter((item) =>

      item.student?.fullName
        ?.toLowerCase()
        .includes(search.toLowerCase())

    );

    setFilteredAssessments(filtered);

  }, [search, assessments]);

  // =====================================
  // Delete
  // =====================================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this assessment?"
    );

    if (!confirmDelete) return;

    try {

      const res = await deleteAssessment(id);

      alert(res.message);

      fetchAssessments();

    } catch (error) {

      console.log(error);

      alert("Delete Failed");

    }

  };

  // =====================================
  // Statistics
  // =====================================

  const totalAssessments =
    assessments.length;

  const passed =
    assessments.filter(
      (item) => item.status === "Passed"
    ).length;

  const failed =
    assessments.filter(
      (item) => item.status === "Failed"
    ).length;
      const pending =
    assessments.filter(
      (item) => item.status === "Pending"
    ).length;

  return (

    <div className="assessment-page">

      {/* ================= Header ================= */}

      <div className="assessment-header">

        <div>

          <h1>

            Assessment Management

          </h1>

          <p>

            Monitor all student skill assessments.

          </p>

        </div>

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>

      {/* ================= Statistics ================= */}

      <div className="assessment-stats">

        <div className="assessment-stat-card">

          <FaClipboardCheck />

          <div>

            <h2>

              {totalAssessments}

            </h2>

            <span>

              Total Assessments

            </span>

          </div>

        </div>

        <div className="assessment-stat-card">

          <FaCheckCircle />

          <div>

            <h2>

              {passed}

            </h2>

            <span>

              Passed

            </span>

          </div>

        </div>

        <div className="assessment-stat-card">

          <FaTimesCircle />

          <div>

            <h2>

              {failed}

            </h2>

            <span>

              Failed

            </span>

          </div>

        </div>

        <div className="assessment-stat-card">

          <FaClipboardCheck />

          <div>

            <h2>

              {pending}

            </h2>

            <span>

              Pending

            </span>

          </div>

        </div>

      </div>

      {/* ================= Table ================= */}

      <div className="assessment-table">

        <table>

          <thead>

            <tr>

              <th>Student</th>

              <th>Technology</th>

              <th>Score</th>

              <th>Status</th>

              <th>Date</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {

              filteredAssessments.length > 0 ?

              (

                filteredAssessments.map((item) => (

                  <tr key={item._id}>

                    <td>

                      <div className="student-cell">

                        <div className="student-avatar">

                          {

                            item.student?.fullName
                              ?.charAt(0)
                              .toUpperCase()

                          }

                        </div>

                        <div>

                          <h4>

                            {

                              item.student?.fullName

                            }

                          </h4>

                          <p>

                            {

                              item.student?.email

                            }

                          </p>

                        </div>

                      </div>

                    </td>

                    <td>

                      {item.language}

                    </td>

                    <td>

                      {item.score}%

                    </td>

                    <td>

                      <span className={`status ${item.status.toLowerCase()}`}>

                        {item.status}

                      </span>

                    </td>

                    <td>

                      {

                        new Date(
                          item.createdAt
                        ).toLocaleDateString()

                      }

                    </td>

                    <td>

                      <div className="action-buttons">

                        <button
                          className="view-btn"
                          onClick={() => {

                            setSelectedAssessment(item);

                            setShowViewModal(true);

                          }}
                        >

                          <FaEye />

                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(item._id)
                          }
                        >

                          <FaTrash />

                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )

              :

              (

                <tr>

                  <td
                    colSpan="6"
                    className="empty-row"
                  >

                    No Assessments Found

                  </td>

                </tr>

              )

            }

          </tbody>

        </table>

      </div>
            {/* ======================================
              View Modal
      ====================================== */}

      {

        showViewModal && (

          <ViewAssessmentModal

            assessment={selectedAssessment}

            onClose={() =>
              setShowViewModal(false)
            }

          />

        )

      }

    </div>

  );

};

export default AdminAssessmentManagement;