import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaCheck,
  FaLock,
  FaBookOpen,
  FaChevronDown,
  FaChevronUp,
  FaClock,
} from "react-icons/fa";

import "./Roadmap.css";

import {
  getRecommendationHistory,
} from "../../../api/recommendationApi";

import {
  getStudyPlanner,
  generateStudyPlanner,
} from "../../../api/studyPlannerApi";

const Roadmap = ({ setActivePage }) => {

  const [recommendation, setRecommendation] = useState(null);

  const [planner, setPlanner] = useState([]);

  const [loading, setLoading] = useState(true);

  const [expanded, setExpanded] = useState(null);

  // ==========================================
  // Load Roadmap
  // ==========================================

  const loadRoadmap = async () => {

    try {

      // ----------------------------
      // Recommendation
      // ----------------------------

      const recommendationRes =
        await getRecommendationHistory();

      if (
        recommendationRes.success &&
        recommendationRes.history?.length > 0
      ) {

        setRecommendation(
          recommendationRes.history[0]
        );

      }

      // ----------------------------
      // Study Planner
      // ----------------------------

      let plannerRes =
        await getStudyPlanner();

      if (
        !plannerRes.planner ||
        plannerRes.planner.length === 0
      ) {

        await generateStudyPlanner();

        plannerRes =
          await getStudyPlanner();

      }

      setPlanner(
        plannerRes.planner || []
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadRoadmap();

  }, []);

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {

    return (

      <div className="roadmap-loading">

        Loading Your AI Roadmap...

      </div>

    );

  }

  // ==========================================
  // Empty
  // ==========================================

  if (!recommendation) {

    return (

      <div className="roadmap-loading">

        No Roadmap Found

      </div>

    );

  }

  // ==========================================
  // Summary
  // ==========================================

  const completedCount =
    planner.filter(
      tech => tech.status === "Completed"
    ).length;

  const currentTechnology =
    planner.find(
      tech => tech.status === "In Progress"
    );

  const nextTechnology =
    planner.find(
      tech => tech.status === "Locked"
    );

  // Overall roadmap progress
  // (average of all technology progress)

  const overallProgress =
    planner.length === 0
      ? 0
      : Math.round(
          planner.reduce(
            (sum, tech) =>
              sum + (tech.progress || 0),
            0
          ) / planner.length
        );

  return (

    <div className="roadmap-page">

      {/* =====================================
          Header
      ====================================== */}

      <div className="roadmap-header">

        <button
          className="back-btn"
          onClick={() =>
            setActivePage("career")
          }
        >

          <FaArrowLeft />

        </button>

        <div>

          <h1>

            {recommendation.recommendedCareer}

            {" "}Learning Roadmap

          </h1>

          <p>

            Personalized AI Study Journey

          </p>

        </div>

      </div>

      {/* =====================================
          Summary
      ====================================== */}

      <div className="roadmap-summary">

        <div className="summary-card">

          <h4>

            Overall Progress

          </h4>

          <div className="summary-progress">

            <div
              className="summary-fill"
              style={{
                width:
                  `${overallProgress}%`,
              }}
            />

          </div>

          <span>

            {overallProgress}%

          </span>

        </div>

        <div className="summary-card">

          <h4>

            Completed

          </h4>

          <h2>

            {completedCount}

            /

            {planner.length}

          </h2>

        </div>

        <div className="summary-card">

          <h4>

            Current Technology

          </h4>

          <h2>

            {
              currentTechnology
                ?.language || "-"
            }

          </h2>

        </div>

        <div className="summary-card">

          <h4>

            Next Technology

          </h4>

          <h2>

            {
              nextTechnology
                ?.language ||
              "Completed 🎉"
            }

          </h2>

        </div>

      </div>

      {/* =====================================
          Timeline Starts
      ====================================== */}

      
        <div className="timeline">

  {planner.map((tech, index) => {

    const completed =
      tech.status === "Completed";

    const current =
      tech.status === "In Progress";

    const locked =
      tech.status === "Locked";

    return (

      <div
        className="timeline-item"
        key={tech._id}
      >

        {/* Timeline */}

        <div className="timeline-left">

          <div
            className={`timeline-circle ${
              completed
                ? "completed"
                : current
                ? "current"
                : "locked"
            }`}
          >

            {

              completed ?

                <FaCheck />

              :

              current ?

                <FaBookOpen />

              :

                <FaLock />

            }

          </div>

          {

            index !== planner.length - 1 &&

            <div className="timeline-line" />

          }

        </div>

        {/* Card */}

        <div
          className={`timeline-card ${
            completed
              ? "completed-card"
              : current
              ? "current-card"
              : "locked-card"
          }`}
        >

          {/* =======================
              Header
          ======================== */}

          <div className="card-top">

            <div>

              <h3>

                {tech.language}

              </h3>

              <p>

                {

                  completed
                    ? "Technology Completed"

                    : current
                    ? "Currently Learning"

                    : "Locked Technology"

                }

              </p>

            </div>

            <span
              className={`status ${
                tech.status
                  .toLowerCase()
                  .replace(" ", "-")
              }`}
            >

              {tech.status}

            </span>

          </div>

          {/* =======================
              Progress
          ======================== */}

          <div className="progress-title">

            <span>

              Progress

            </span>

            <strong>

              {tech.progress}%

            </strong>

          </div>

          <div className="progress-track">

            <div
              className="progress-fill"
              style={{
                width:
                  `${tech.progress}%`
              }}
            />

          </div>

          {/* =======================
              Details
          ======================== */}

          <div className="technology-info">

            <div>

              <FaClock />

              Week

              {" "}

              <strong>

                {tech.currentDay}

              </strong>

              /

              {tech.totalDays}

            </div>

            <div>

              Completed

              {" "}

              <strong>

                {tech.completedDays}

              </strong>

            </div>

          </div>

          {/* =======================
              Quiz
          ======================== */}

          {

            tech.quizTaken && (

              <div className="score-box">

                <div>

                  <h4>

                    Quiz Score

                  </h4>

                  <p>

                    {

                      tech.quizPassed

                        ? "Passed ✅"

                        : "Failed"

                    }

                  </p>

                </div>

                <span>

                  {tech.quizScore}%

                </span>

              </div>

            )

          }

          {/* =======================
              Weekly Tasks
          ======================== */}

          {

            current && (

              <button

                className="expand-btn"

                onClick={() =>

                  setExpanded(

                    expanded === tech._id

                      ? null

                      : tech._id

                  )

                }

              >

                {

                  expanded === tech._id

                    ?

                    <>

                      Hide Weekly Tasks

                      <FaChevronUp />

                    </>

                    :

                    <>

                      View Weekly Tasks

                      <FaChevronDown />

                    </>

                }

              </button>

            )

          }

          {

            expanded === tech._id && (

              <div className="task-list">

                {

                  tech.tasks.map(

                    (task, taskIndex) => (

                      <div

                        key={taskIndex}

                        className={`task-item

                        ${

                          taskIndex + 1 <

                          tech.currentDay

                            ?

                            "day-completed"

                            :

                          taskIndex + 1 ===

                          tech.currentDay

                            ?

                            "day-current"

                            :

                            "day-locked"

                        }

                        `}

                      >

                        <div className="task-day">

                          {taskIndex + 1}

                        </div>

                        <div className="task-content">

                          <h4>

                            Week {taskIndex + 1}

                          </h4>

                          <p>

                            {task}

                          </p>

                        </div>

                      </div>

                    )

                  )

                }

              </div>

            )

          }

        </div>

      </div>

    );

  })}

</div>
</div>
);

};

export default Roadmap;