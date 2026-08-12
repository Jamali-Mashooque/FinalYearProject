import { useEffect, useMemo, useState } from "react";
import "./AdminRoadmapManagement.css";

import {
  FaSearch,
  FaEye,
  FaRoute,
  FaClock,
  FaBookOpen,
  FaArrowLeft,
  FaLayerGroup,
} from "react-icons/fa";

import { getAllRoadmaps } from "../../../api/adminApi";

import ViewRoadmapModal from "./ViewRoadmapModal";

const AdminRoadmapManagement = () => {

  const [roadmaps, setRoadmaps] = useState([]);
  const [search, setSearch] = useState("");

  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);

  // Selected career (null = show career list)
  const [selectedCareer, setSelectedCareer] = useState(null);

  // ===========================
  // Fetch Roadmaps
  // ===========================

  const fetchRoadmaps = async () => {

    try {

      const response = await getAllRoadmaps();

      setRoadmaps(response.roadmaps || []);

    } catch (error) {

      console.log(error);

      alert("Failed to load roadmaps.");

    }

  };

  useEffect(() => {

    fetchRoadmaps();

  }, []);

  // ===========================
  // Group Roadmap Steps By Career
  // (Only careers that actually have a
  // generated roadmap show up here)
  // ===========================

  const careerGroups = useMemo(() => {

    const groups = {};

    roadmaps.forEach((roadmap) => {

      const careerId = roadmap.career?._id || "unknown";

      if (!groups[careerId]) {

        groups[careerId] = {
          career: roadmap.career,
          steps: [],
        };

      }

      groups[careerId].steps.push(roadmap);

    });

    return Object.values(groups);

  }, [roadmaps]);

  // ===========================
  // Search
  // ===========================

  const filteredCareerGroups = careerGroups.filter((group) =>
    (group.career?.title || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const filteredSteps = (selectedCareer?.steps || []).filter(
    (roadmap) =>
      roadmap.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenCareer = (group) => {
    setSelectedCareer(group);
    setSearch("");
  };

  const handleBackToCareers = () => {
    setSelectedCareer(null);
    setSearch("");
  };

  return (

    <div className="roadmap-management">

      {/* Header */}

      <div className="roadmap-header">

        <div>

          {selectedCareer ? (

            <>
              <h2>{selectedCareer.career?.title || "Roadmap"}</h2>
              <p>Roadmap steps generated for this career.</p>
            </>

          ) : (

            <>
              <h2>Roadmap Review</h2>
              <p>Review AI-generated career learning roadmaps.</p>
            </>

          )}

        </div>

        {selectedCareer && (

          <button
            className="back-btn"
            onClick={handleBackToCareers}
          >
            <FaArrowLeft />
            Back to Careers
          </button>

        )}

      </div>

      {/* Search */}

      <div className="roadmap-search">

        <FaSearch />

        <input
          type="text"
          placeholder={
            selectedCareer
              ? "Search roadmap step..."
              : "Search career..."
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* Career List View */}

      {!selectedCareer && (

        <div className="roadmap-grid">

          {filteredCareerGroups.length > 0 ? (

            filteredCareerGroups.map((group) => (

              <div
                className="roadmap-card"
                key={group.career?._id || group.career?.title}
              >

                <div className="roadmap-top">

                  <div className="roadmap-icon">
                    <FaLayerGroup />
                  </div>

                  <div className="roadmap-title">

                    <h3>{group.career?.title || "Untitled Career"}</h3>

                    <span className="level-badge">
                      {group.career?.category || "Career"}
                    </span>

                  </div>

                </div>

                <div className="roadmap-details">

                  <div className="detail-item">
                    <FaBookOpen />
                    <span>
                      {group.steps.length}{" "}
                      {group.steps.length === 1 ? "Step" : "Steps"} Generated
                    </span>
                  </div>

                  <div className="detail-item">
                    <FaClock />
                    <span>
                      {group.steps.reduce(
                        (total, s) => total + (s.duration || 0),
                        0
                      )}{" "}
                      Weeks Total
                    </span>
                  </div>

                </div>

                <div className="roadmap-actions single-action">

                  <button
                    className="view"
                    onClick={() => handleOpenCareer(group)}
                  >
                    <FaEye />
                    View {group.career?.title} Roadmap
                  </button>

                </div>

              </div>

            ))

          ) : (

            <div className="empty-roadmaps">

              <FaRoute />

              <h3>No Roadmaps Found</h3>

              <p>
                No career roadmaps have been generated by
                the AI Career system yet.
              </p>

            </div>

          )}

        </div>

      )}

      {/* Career Roadmap Steps View */}

      {selectedCareer && (

        <div className="roadmap-grid">

          {filteredSteps.length > 0 ? (

            filteredSteps.map((roadmap) => (

              <div
                className="roadmap-card"
                key={roadmap._id}
              >

                <div className="roadmap-top">

                  <div className="roadmap-icon">
                    <FaRoute />
                  </div>

                  <div className="roadmap-title">

                    <h3>{roadmap.title}</h3>

                    <span className="level-badge">
                      {roadmap.level || "Beginner"}
                    </span>

                  </div>

                </div>

                <div className="roadmap-details">

                  <div className="detail-item">
                    <FaBookOpen />
                    <span>
                      {roadmap.career?.title || "N/A"}
                    </span>
                  </div>

                  <div className="detail-item">
                    <FaClock />
                    <span>
                      {roadmap.duration} {roadmap.duration === 1 ? "Week" : "Weeks"}
                    </span>
                  </div>

                  <div className="detail-item">
                    📖
                    <span>
                      {roadmap.modules?.length || 0} Modules
                    </span>
                  </div>

                </div>

                <div className="roadmap-actions single-action">

                  <button
                    className="view"
                    onClick={() => {
                      setSelectedRoadmap(roadmap);
                      setShowViewModal(true);
                    }}
                  >
                    <FaEye />
                    View
                  </button>

                </div>

              </div>

            ))

          ) : (

            <div className="empty-roadmaps">

              <FaRoute />

              <h3>No Roadmap Steps Found</h3>

              <p>No steps match your search.</p>

            </div>

          )}

        </div>

      )}

      {/* View */}

      {showViewModal && (

        <ViewRoadmapModal
          roadmap={selectedRoadmap}
          onClose={() => setShowViewModal(false)}
        />

      )}

    </div>

  );

};

export default AdminRoadmapManagement;
