

import "./StudentDetailsModal.css";

import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUniversity,
  FaGraduationCap,
  FaBriefcase,
} from "react-icons/fa";

const StudentDetailsModal = ({ student, onClose }) => {
  if (!student) return null;

  return (
    <div className="student-modal-overlay">

      <div className="student-modal">

        <div className="student-modal-header">

          <h2>Student Details</h2>

          <button onClick={onClose}>
            <FaTimes />
          </button>

        </div>

        <div className="student-avatar">

          {student.fullName
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()}

        </div>

        <div className="student-info">

          <div>

            <FaUser />

            <strong>Name</strong>

            <p>{student.fullName}</p>

          </div>

          <div>

            <FaEnvelope />

            <strong>Email</strong>

            <p>{student.email}</p>

          </div>

          <div>

            <FaPhone />

            <strong>Phone</strong>

            <p>{student.contact}</p>

          </div>

          <div>

            <FaUniversity />

            <strong>University</strong>

            <p>{student.university || "-"}</p>

          </div>

          <div>

            <FaGraduationCap />

            <strong>Department</strong>

            <p>{student.department || "-"}</p>

          </div>

          <div>

            <FaBriefcase />

            <strong>interestedFields</strong>

            <p>{student.interestedFields}</p>

          </div>

          <div>

            <strong>Experience</strong>

            <p>{student.experienceLevel}</p>

          </div>

          <div>

            <strong>Status</strong>

            <p>
              {student.isVerified
                ? "Approved"
                : "Pending"}
            </p>

          </div>

        </div>

        <div className="student-skills">

          <h3>Skills</h3>

          <div className="skill-list">

            {student.skills?.map((skill, index) => (
              <span key={index}>{skill}</span>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default StudentDetailsModal;