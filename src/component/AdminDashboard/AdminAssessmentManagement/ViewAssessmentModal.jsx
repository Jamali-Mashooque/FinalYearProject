import "./ViewAssessmentModal.css";

import { FaTimes } from "react-icons/fa";

const ViewAssessmentModal = ({
  assessment,
  onClose,
}) => {

  if (!assessment) return null;

  return (

    <div className="view-assessment-overlay">

      <div className="view-assessment-modal">

        {/* ================= Header ================= */}

        <div className="view-assessment-header">

          <h2>

            Assessment Details

          </h2>

          <button onClick={onClose}>

            <FaTimes />

          </button>

        </div>

        {/* ================= Body ================= */}

        <div className="view-assessment-body">

          <div className="assessment-item">

            <label>

              Student Name

            </label>

            <p>

              {assessment.student?.fullName || "-"}

            </p>

          </div>

          <div className="assessment-item">

            <label>

              Email

            </label>

            <p>

              {assessment.student?.email || "-"}

            </p>

          </div>

          <div className="assessment-item">

            <label>

              Technology

            </label>

            <p>

              {assessment.language}

            </p>

          </div>

          <div className="assessment-item">

            <label>

              Score

            </label>

            <p>

              {assessment.score}%

            </p>

          </div>

          <div className="assessment-item">

            <label>

              Correct Answers

            </label>

            <p>

              {assessment.correctCount} / {assessment.totalQuestions}

            </p>

          </div>

          <div className="assessment-item">

            <label>

              Status

            </label>

            <p>

              {assessment.status}

            </p>

          </div>

          <div className="assessment-item">

            <label>

              Strengths

            </label>

            <p>

              {

                assessment.strengths?.length

                  ? assessment.strengths.join(", ")

                  : "No strengths available."

              }

            </p>

          </div>

          <div className="assessment-item">

            <label>

              Weaknesses

            </label>

            <p>

              {

                assessment.weaknesses?.length

                  ? assessment.weaknesses.join(", ")

                  : "No weaknesses available."

              }

            </p>

          </div>

          <div className="assessment-item">

            <label>

              AI Feedback

            </label>

            <p>

              {

                assessment.aiFeedback ||

                "No feedback available."

              }

            </p>

          </div>

          <div className="assessment-item">

            <label>

              Completed

            </label>

            <p>

              {

                assessment.completed

                  ? "Yes"

                  : "No"

              }

            </p>

          </div>

          <div className="assessment-item">

            <label>

              Completed At

            </label>

            <p>

              {

                assessment.completedAt

                  ? new Date(
                      assessment.completedAt
                    ).toLocaleString()

                  : "-"

              }

            </p>

          </div>

          <div className="assessment-item">

            <label>

              Created At

            </label>

            <p>

              {

                new Date(
                  assessment.createdAt
                ).toLocaleDateString()

              }

            </p>

          </div>

        </div>

      </div>

    </div>

  );

};

export default ViewAssessmentModal;