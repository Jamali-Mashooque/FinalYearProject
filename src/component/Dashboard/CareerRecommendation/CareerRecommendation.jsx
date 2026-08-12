import { useEffect, useState } from "react";
import "./CareerRecommendation.css";

import {
  FaRobot,
  FaArrowRight,
  FaLaptopCode,
  FaCheckCircle,
  FaExclamationTriangle,
  FaBrain,
  FaRoad,
  FaBullseye,
  FaRedo,
  FaGraduationCap,
  FaChartLine,
  FaCalendarAlt,
} from "react-icons/fa";

import {
  generateRecommendation,
  getRecommendationHistory,
} from "../../../api/recommendationApi";

const CareerRecommendation = ({
  setActivePage,
}) => {

  // =====================================
  // States
  // =====================================

  const [recommendation, setRecommendation] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // =====================================
  // Load Recommendation
  // =====================================

  const loadRecommendation = async () => {

    try {

      let res =
        await getRecommendationHistory();

      if (
        res.success &&
        res.history &&
        res.history.length > 0
      ) {

        setRecommendation(
          res.history[0]
        );

      } else {

        const ai =
          await generateRecommendation();

        if (ai.success) {

          setRecommendation(
            ai.recommendation
          );

        }

      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadRecommendation();

  }, []);

  // =====================================
  // Helpers
  // =====================================

  const career =
    recommendation?.recommendedCareer ||
    "Not Available";

  const matchScore =
    recommendation?.matchScore || 0;

  const currentLevel =
    recommendation?.currentLevel ||
    "Beginner";

  const nextSkill =
    recommendation?.nextSkill ||
    recommendation?.roadmap?.find(
      (item) =>
        item.status ===
        "In Progress"
    )?.language ||
    recommendation?.roadmap?.[0]
      ?.language ||
    "Not Available";

  const reason =
    recommendation?.reason ||
    "No AI explanation available.";

  const strengths =
    recommendation?.strengths || [];

  const weaknesses =
    recommendation?.weaknesses || [];

  const roadmap =
    recommendation?.roadmap || [];

  // =====================================
  // Loading
  // =====================================

  if (loading) {

    return (

      <div className="career-loading">

        <FaRobot className="loading-icon" />

        <h2>

          AI is analyzing your profile...

        </h2>

        <p>

          Please wait while we generate your
          personalized career recommendation.

        </p>

      </div>

    );

  }

  // =====================================
  // Empty State
  // =====================================

  if (!recommendation) {

    return (

      <div className="career-loading">

        <FaRobot className="loading-icon" />

        <h2>

          No AI recommendation found.

        </h2>

        <p>

          Complete your assessment to generate
          your personalized recommendation.

        </p>

        <button
          className="generate-btn"
          onClick={loadRecommendation}
        >

          <FaRedo />

          Generate Recommendation

        </button>

      </div>

    );

  }

  return (

    <div className="career-page">

      {/* =====================================
          Hero Banner
      ===================================== */}

      <div className="career-banner">

        <div>

          <h2>

            <FaRobot />

            AI Career Recommendation

          </h2>

          <p>

            Personalized recommendation based
            on your profile, assessments,
            learning progress and AI analysis.

          </p>

        </div>

        <div className="ai-badge">

          <FaRobot />

          <span>

            AI Generated

          </span>

        </div>

      </div>

      {/* =====================================
          Summary Cards
      ===================================== */}

      <div className="career-summary">

        <div className="summary-card">

          <FaLaptopCode />

          <h3>

            {career}

          </h3>

          <p>

            Recommended Career

          </p>

        </div>

        <div className="summary-card">

          <FaBullseye />

          <h3>

            {matchScore}%

          </h3>

          <p>

            Career Match

          </p>

        </div>

        <div className="summary-card">

          <FaRoad />

          <h3>

            {nextSkill}

          </h3>

          <p>

            Current Technology

          </p>

        </div>

        <div className="summary-card">

          <FaGraduationCap />

          <h3>

            {currentLevel}

          </h3>

          <p>

            Current Level

          </p>

        </div>

      </div>

      {/* =====================================
          Main Card
      ===================================== */}

      <div className="career-card">
                {/* =====================================
            AI Confidence
        ===================================== */}

        <div className="career-progress">

          <div className="progress-title">

            <span>

              AI Career Match Confidence

            </span>

            <strong>

              {matchScore}%

            </strong>

          </div>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${matchScore}%`,
              }}
            />

          </div>

          <p className="progress-text">

            Based on your profile, assessment
            results, learning progress and
            AI analysis.

          </p>

        </div>

        {/* =====================================
            Generated Date
        ===================================== */}

        {

          recommendation.createdAt && (

            <div className="career-date">

              <FaCalendarAlt />

              <span>

                Generated on{" "}

                {

                  new Date(
                    recommendation.createdAt
                  ).toLocaleDateString()

                }

              </span>

            </div>

          )

        }

        {/* =====================================
            AI Summary
        ===================================== */}

        <div className="career-section">

          <h3>

            <FaRobot />

            AI Summary

          </h3>

          <div className="career-summary-box">

            <p>

              {reason}

            </p>

          </div>

        </div>

        {/* =====================================
            Why This Career
        ===================================== */}

        <div className="career-section">

          <h3>

            <FaBrain />

            Why This Career?

          </h3>

          <div className="reason-card">

            <p>

              {reason}

            </p>

          </div>

        </div>

        {/* =====================================
            Next Learning Goal
        ===================================== */}

        <div className="career-section">

          <h3>

            <FaRoad />

            Current Learning Technology

          </h3>

          <div className="next-skill-card">

            <h2>

              {nextSkill}

            </h2>

            <p>

              Continue mastering this
              technology before unlocking
              the next step in your AI
              learning roadmap.

            </p>

          </div>

        </div>
                {/* =====================================
            Strengths
        ===================================== */}

        {

          strengths.length > 0 && (

            <div className="career-section">

              <h3>

                <FaCheckCircle />

                Your Strengths

              </h3>

              <div className="skill-tags">

                {

                  strengths.map((item, index) => (

                    <span
                      key={index}
                      className="strength-tag"
                    >

                      <FaCheckCircle />

                      {item}

                    </span>

                  ))

                }

              </div>

            </div>

          )

        }

        {/* =====================================
            Skills To Improve
        ===================================== */}

        {

          weaknesses.length > 0 && (

            <div className="career-section">

              <h3>

                <FaExclamationTriangle />

                Skills To Improve

              </h3>

              <div className="skill-tags">

                {

                  weaknesses.map((item, index) => (

                    <span
                      key={index}
                      className="weakness-tag"
                    >

                      <FaExclamationTriangle />

                      {item}

                    </span>

                  ))

                }

              </div>

            </div>

          )

        }

        {/* =====================================
            Learning Roadmap Preview
        ===================================== */}

        {

          roadmap.length > 0 && (

            <div className="career-section">

              <h3>

                <FaRoad />

                Upcoming Learning Roadmap

              </h3>

              <div className="roadmap-preview">

                {

                  roadmap.map((item, index) => (

                    <div
                      key={index}
                      className={`roadmap-card
                      ${item.status === "Completed"
                        ? "completed-roadmap"
                        : item.status === "In Progress"
                        ? "current-roadmap"
                        : "locked-roadmap"
                      }`}
                    >

                      <div className="roadmap-number">

                        {index + 1}

                      </div>

                      <div className="roadmap-content">

                        <h4>

                          {item.language}

                        </h4>

                        <p>

                          {

                            item.totalWeeks ||
                            item.totalDays ||
                            item.tasks?.length ||
                            1

                          }

                          {" "}
                          Learning Weeks

                        </p>

                      </div>

                      <div
                        className={`roadmap-status
                        ${item.status
                          ?.toLowerCase()
                          .replace(" ", "-")}`}
                      >

                        {item.status}

                      </div>

                    </div>

                  ))

                }

              </div>

            </div>

          )

        }

        {/* =====================================
            AI Recommendation Footer
        ===================================== */}

        <div className="career-footer">

          <FaChartLine />

          <p>

            This recommendation automatically
            updates whenever you complete new
            skill assessments or learning
            milestones.

          </p>

        </div>

        {/* =====================================
            Action Buttons
        ===================================== */}

        <div className="career-actions">

          <button
            className="primary-btn"
            onClick={() =>
              setActivePage("roadmap")
            }
          >

            View Complete Roadmap

            <FaArrowRight />

          </button>

          <button
            className="secondary-btn"
            onClick={() =>
              setActivePage("planner")
            }
          >

            Open Study Planner

          </button>

        </div>

      </div>

    </div>

  );

};

export default CareerRecommendation;