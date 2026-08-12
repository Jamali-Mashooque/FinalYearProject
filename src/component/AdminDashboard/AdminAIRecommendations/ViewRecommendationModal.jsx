import { useEffect } from "react";
import "./ViewRecommendationModal.css";
import { FaTimes } from "react-icons/fa";

const ViewRecommendationModal = ({
  recommendation,
  onClose,
}) => {

  useEffect(() => {

    document.body.style.overflow = "hidden";

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEscape);
    };

  }, [onClose]);

  if (!recommendation) return null;

  return (

    <div
      className="view-recommendation-overlay"
      onClick={onClose}
    >

      <div
        className="view-recommendation-modal"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ================= Header ================= */}

        <div className="view-recommendation-header">

          <h2>

            AI Recommendation Details

          </h2>

          <button onClick={onClose}>

            <FaTimes />

          </button>

        </div>

        {/* ================= Body ================= */}

        <div className="view-recommendation-body">

          <div className="recommendation-grid">

            <div className="recommendation-item">
              <label>Student</label>
              <p>{recommendation.student?.fullName}</p>
            </div>

            <div className="recommendation-item">
              <label>Email</label>
              <p>{recommendation.student?.email}</p>
            </div>

            <div className="recommendation-item">
              <label>Recommended Career</label>
              <p>{recommendation.recommendedCareer}</p>
            </div>

            <div className="recommendation-item">
              <label>Match Score</label>
              <p>{recommendation.matchScore}%</p>
            </div>

            <div className="recommendation-item">
              <label>Current Technology</label>
              <p>
                {recommendation.currentTechnology || "Not Started"}
              </p>
            </div>

            <div className="recommendation-item">
              <label>Next Skill</label>
              <p>{recommendation.nextSkill || "-"}</p>
            </div>

            <div className="recommendation-item">
              <label>Overall Progress</label>
              <p>{recommendation.overallProgress}%</p>
            </div>

          </div>

          <div className="recommendation-item full-width">

            <label>AI Reason</label>

            <p>

              {recommendation.reason ||
                "No reason available."}

            </p>

          </div>

          <div className="recommendation-item full-width">

            <label>Strengths</label>

            <p>

              {recommendation.strengths?.length
                ? recommendation.strengths.join(", ")
                : "No strengths available."}

            </p>

          </div>

          <div className="recommendation-item full-width">

            <label>Weaknesses</label>

            <p>

              {recommendation.weaknesses?.length
                ? recommendation.weaknesses.join(", ")
                : "No weaknesses available."}

            </p>

          </div>

          <div className="recommendation-item full-width">

            <label>Generated On</label>

            <p>

              {new Date(
                recommendation.createdAt
              ).toLocaleDateString()}

            </p>

          </div>

        </div>

      </div>

    </div>

  );

};

export default ViewRecommendationModal;