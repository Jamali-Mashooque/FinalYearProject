import "./ViewCareerModal.css";
import { FaTimes } from "react-icons/fa";

const ViewCareerModal = ({ career, onClose }) => {

  if (!career) return null;

  return (
    <div className="view-career-overlay">

      <div className="view-career-modal">

        <div className="view-career-header">

          <h2>Career Details</h2>

          <button onClick={onClose}>
            <FaTimes />
          </button>

        </div>

        <div className="career-detail">

          <label>Career Title</label>

          <p>{career.title}</p>

        </div>

        <div className="career-detail">

          <label>Category</label>

          <p>{career.category}</p>

        </div>

        <div className="career-detail">

          <label>Description</label>

          <p>{career.description}</p>

        </div>

        <div className="career-detail">

          <label>Skills</label>

          <div className="skill-list">

            {career.skills?.map((skill, index) => (

              <span key={index}>
                {skill}
              </span>

            ))}

          </div>

        </div>

        <div className="career-detail">

          <label>Status</label>

          <p>
            {career.isActive ? "Active" : "Inactive"}
          </p>

        </div>

      </div>

    </div>
  );

};

export default ViewCareerModal;