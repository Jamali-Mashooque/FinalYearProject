import { useEffect, useState } from "react";
import "./DashboardHome.css";

import {
  FaUserGraduate,
  FaChartLine,
  FaBookReader,
  FaBrain,
  FaCheckCircle,
  FaArrowUp,
  FaLaptopCode,
  FaBullseye,
} from "react-icons/fa";

import { getProfile } from "../../../api/authApi";
import { getRecommendationHistory } from "../../../api/recommendationApi";
import { getStudyPlanner } from "../../../api/studyPlannerApi";
import { getAssessmentHistory } from "../../../api/assessmentApi";

const DashboardHome = () => {

  const [student, setStudent] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [planner, setPlanner] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {

      const [
        profileRes,
        recommendationRes,
        plannerRes,
        assessmentRes,
      ] = await Promise.all([
        getProfile(),
        getRecommendationHistory(),
        getStudyPlanner(),
        getAssessmentHistory(),
      ]);

      const profile = profileRes.data || profileRes;
      const recommendation = recommendationRes.data || recommendationRes;
      const planner = plannerRes.data || plannerRes;
      const assessment = assessmentRes.data || assessmentRes;

      if (profile.success) {
        setStudent(profile.user);
      }

      if (
        recommendation.success &&
        recommendation.history?.length
      ) {
        setRecommendation(recommendation.history[0]);
      }

      if (planner.success) {
        setPlanner(planner.planner || []);
      }

      if (assessment.success) {
        setAssessments(
          assessment.assessments || []
        );
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const currentTechnology =
    planner.find(
      item => item.status === "In Progress"
    );

  const completedTechnologies =
    planner.filter(
      item => item.status === "Completed"
    ).length;

  const latestAssessment =
    assessments[0] || null;

  const profileCompletion = (() => {

    if (!student) return 0;

    const fields = [
      student.fullName,
      student.university,
      student.department,
      student.interestedFields,
      student.skills?.length,
      student.softSkills?.length,
      student.experienceLevel,
    ];

    const completed =
      fields.filter(Boolean).length;

    return Math.round(
      (completed / fields.length) * 100
    );

  })();

  const overallProgress =
    planner.length
      ? Math.round(
          (completedTechnologies /
            planner.length) *
            100
        )
      : 0;

  if (loading) {
    return (
      <div className="dashboard-loading">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="dashboard-home">
            <div className="dashboard-hero-card">

        <div>

          <h1>
            Welcome Back,
            <span>
              {student?.fullName || " Student"}
            </span>
            👋
          </h1>

          <p>
            {recommendation
              ? `Your AI recommends a career in ${recommendation.recommendedCareer}. Keep learning to achieve your goal.`
              : "Generate your AI Career Recommendation to begin your personalized learning journey."}
          </p>

        </div>

      </div>


      <div className="stats-grid">

        <div className="stat-card">
          <FaUserGraduate />
          <h2>{profileCompletion}%</h2>
          <p>Profile Completion</p>
        </div>

        <div className="stat-card">
          <FaBrain />
          <h2>{recommendation?.matchScore || 0}%</h2>
          <p>Career Match</p>
        </div>

        <div className="stat-card">
          <FaBookReader />
          <h2>{completedTechnologies}</h2>
          <p>Completed Skills</p>
        </div>

        <div className="stat-card">
          <FaChartLine />
          <h2>{overallProgress}%</h2>
          <p>Learning Progress</p>
        </div>

      </div>


      <div className="dashboard-grid">

        <div className="card">

          <h3>🤖 AI Career Recommendation</h3>

          {recommendation ? (

            <>

              <div className="recommendation">

                <div>

                  <h2>
                    {recommendation.recommendedCareer}
                  </h2>

                  <small>
                    Match Score:
                    {" "}
                    {recommendation.matchScore}%
                  </small>

                </div>

              </div>

              <p>{recommendation.reason}</p>

            </>

          ) : (

            <p>No recommendation available yet.</p>

          )}

        </div>


        <div className="card">

          <h3>

            <FaLaptopCode />

            {" "}Current Learning

          </h3>

          {currentTechnology ? (

            <>

              <h2>{currentTechnology.language}</h2>

              <p>
                Day {currentTechnology.currentDay}
                {" "}of{" "}
                {currentTechnology.totalDays}
              </p>

              <div className="progress">

                <div
                  style={{
                    width: `${Math.round(
                      (currentTechnology.currentDay /
                        currentTechnology.totalDays) *
                        100
                    )}%`,
                  }}
                />

              </div>

            </>

          ) : (

            <p>No active technology.</p>

          )}

        </div>

      </div>
            <div className="dashboard-grid">

        {/* Today's Task */}

        <div className="card">

          <h3>
            📚 Today's Learning Task
          </h3>

          {currentTechnology ? (

            <ul className="task-list">

              <li>

                <FaCheckCircle />

                <span>
                  {
                    currentTechnology.tasks?.[
                      currentTechnology.currentDay - 1
                    ] || "No task available"
                  }
                </span>

              </li>

            </ul>

          ) : (

            <p>No task available.</p>

          )}

        </div>


        {/* Latest Assessment */}

        <div className="card">

          <h3>

            <FaBullseye />

            {" "}Latest Assessment

          </h3>

          {latestAssessment ? (

            <>

              <h2>
                {latestAssessment.language}
              </h2>

              <h3>
                {latestAssessment.score}%
              </h3>

              <p>
                {latestAssessment.feedback ||
                  "Assessment Completed"}
              </p>

            </>

          ) : (

            <p>
              No assessments completed yet.
            </p>

          )}

        </div>

      </div>


      <div className="dashboard-grid">

        {/* Learning Summary */}

        <div className="card">

          <h3>
            🔥 Learning Summary
          </h3>

          <div className="growth">

            <div>

              <FaArrowUp />

              <h2>
                {completedTechnologies}
              </h2>

              <p>
                Completed Technologies
              </p>

            </div>

            <div>

              <FaBookReader />

              <h2>
                {planner.length}
              </h2>

              <p>
                Total Roadmap
              </p>

            </div>

          </div>

        </div>


        {/* Overall Progress */}

        <div className="card">

          <h3>
            📈 Overall Progress
          </h3>

          <div className="progress-item">

            <span>
              Learning Progress
            </span>

            <div className="progress">

              <div
                style={{
                  width: `${overallProgress}%`,
                }}
              />

            </div>

          </div>

          {currentTechnology && (

            <div className="progress-item">

              <span>
                {currentTechnology.language}
              </span>

              <div className="progress">

                <div
                  style={{
                    width: `${Math.round(
                      (currentTechnology.currentDay /
                        currentTechnology.totalDays) *
                        100
                    )}%`,
                  }}
                />

              </div>

            </div>

          )}

        </div>

      </div>

    </div>

  );

};

export default DashboardHome;