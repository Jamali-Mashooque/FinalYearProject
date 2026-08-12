import "./LogoutModal.css";
import { FaSignOutAlt } from "react-icons/fa";

const LogoutModal = ({ onCancel, onLogout }) => {
  return (
    <div className="logout-overlay">

      <div className="logout-modal">

        <div className="logout-icon">
          <FaSignOutAlt />
        </div>

        <h2>Logout</h2>

        <p>
          Are you sure you want to logout from your account?
        </p>

        <div className="logout-buttons">

          <button
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="logout-btn"
            onClick={onLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
};

export default LogoutModal;