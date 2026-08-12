import "./ViewRoadmapModal.css";
import { FaTimes } from "react-icons/fa";

const ViewRoadmapModal = ({ roadmap, onClose }) => {

  if (!roadmap) return null;

  return (
    <div className="view-roadmap-overlay">

      <div className="view-roadmap-modal">

        <div className="view-roadmap-header">

          <h2>Roadmap Details</h2>

          <button onClick={onClose}>
            <FaTimes />
          </button>

        </div>

        <div className="view-roadmap-body">

          <div className="roadmap-item">
            <label>Career</label>
            <p>{roadmap.career?.title || "N/A"}</p>
          </div>

          <div className="roadmap-item">
            <label>Title</label>
            <p>{roadmap.title}</p>
          </div>

          <div className="roadmap-item">
            <label>Description</label>
            <p>{roadmap.description}</p>
          </div>

          <div className="roadmap-item">
            <label>Order</label>
            <p>{roadmap.order}</p>
          </div>

          <div className="roadmap-item">
            <label>Duration</label>
            <p>{roadmap.duration}</p>
          </div>

          <div className="roadmap-item">
            <label>Status</label>
            <p>{roadmap.isActive ? "Active" : "Inactive"}</p>
          </div>

        </div>

      </div>

    </div>
  );

};

export default ViewRoadmapModal;