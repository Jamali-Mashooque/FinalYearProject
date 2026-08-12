import { useEffect, useState } from "react";

import "./AdminAIRecommendations.css";

import {
  FaRobot,
  FaSearch,
  FaEye,
  FaTrash,
  FaBullseye,
  FaCode,
} from "react-icons/fa";

import {
  getAllRecommendations,
  deleteRecommendation,
} from "../../../api/adminApi";

import ViewRecommendationModal from "./ViewRecommendationModal";

const AdminAIRecommendations = () => {

  const [recommendations, setRecommendations] = useState([]);

  const [filteredRecommendations, setFilteredRecommendations] = useState([]);

  const [search, setSearch] = useState("");

  const [selectedRecommendation, setSelectedRecommendation] = useState(null);

  const [showViewModal, setShowViewModal] = useState(false);

  // =====================================
  // Fetch Recommendations
  // =====================================

  const fetchRecommendations = async () => {

    try {

      const res = await getAllRecommendations();
console.log(res.recommendations);
      setRecommendations(res.recommendations);

      setFilteredRecommendations(res.recommendations);

    } catch (error) {

      console.log(error);

      alert("Failed to load recommendations.");

    }

  };

  useEffect(() => {

    fetchRecommendations();

  }, []);

  // =====================================
  // Search
  // =====================================

  // =====================================
// Search
// =====================================

useEffect(() => {

  const filtered = recommendations.filter((item) =>

    item.student?.fullName
      ?.toLowerCase()
      .includes(search.toLowerCase())

  );

  setFilteredRecommendations(filtered);

}, [search, recommendations]);

  // =====================================
  // Delete
  // =====================================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this recommendation?"
    );

    if (!confirmDelete) return;

    try {

      const res = await deleteRecommendation(id);

      alert(res.message);

      fetchRecommendations();

    } catch (error) {

      console.log(error);

      alert("Delete Failed");

    }

  };

  // =====================================
  // Statistics
  // =====================================

  const totalRecommendations = recommendations.length;

  const averageMatch =
    recommendations.length > 0
      ? Math.round(
          recommendations.reduce(
            (sum, item) => sum + item.matchScore,
            0
          ) / recommendations.length
        )
      : 0;

  const aiOnline = "Online";
    return (

    <div className="recommendation-page">

      {/* ======================================
            Header
      ====================================== */}

      <div className="recommendation-header">

        <div>

          <h1>

            AI Recommendations

          </h1>

          <p>

            Monitor AI generated career recommendations.

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

      {/* ======================================
              Statistics
      ====================================== */}

      <div className="recommendation-stats">

        <div className="recommendation-stat-card">

          <FaRobot />

          <div>

            <h2>

              {totalRecommendations}

            </h2>

            <span>

              Recommendations

            </span>

          </div>

        </div>

        <div className="recommendation-stat-card">

          <FaBullseye />

          <div>

            <h2>

              {averageMatch}%

            </h2>

            <span>

              Average Match

            </span>

          </div>

        </div>

        <div className="recommendation-stat-card">

          <FaCode />

          <div>

            <h2>

              {aiOnline}

            </h2>

            <span>

              AI Engine

            </span>

          </div>

        </div>

      </div>

      {/* ======================================
              Table
      ====================================== */}

      <div className="recommendation-table">

        <table>

          <thead>

            <tr>

              <th>

                Student

              </th>

              <th>

                Career

              </th>

              <th>

                Match

              </th>

              <th>

                Current Skill

              </th>

              <th>

                Progress

              </th>

              <th>

                Actions

              </th>

            </tr>

          </thead>

          <tbody>

            {

              filteredRecommendations.length > 0 ?

              (

                filteredRecommendations.map((item) => (

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

                      {

                        item.recommendedCareer

                      }

                    </td>

                    <td>

                      <span className="match-badge">

                        {

                          item.matchScore

                        }%

                      </span>

                    </td>

                    <td>

                      {

                        item.currentTechnology ||

                        "Not Started"

                      }

                    </td>

                    <td>

                      <span className="progress-badge">

                        {

                          item.overallProgress

                        }%

                      </span>

                    </td>

                    <td>

                      <div className="action-buttons">

                        <button

                          className="view-btn"

                          onClick={() => {

                            setSelectedRecommendation(item);

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

                    No Recommendations Found

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

          <ViewRecommendationModal

            recommendation={selectedRecommendation}

            onClose={() =>

              setShowViewModal(false)

            }

          />

        )

      }

    </div>

  );

};

export default AdminAIRecommendations;  