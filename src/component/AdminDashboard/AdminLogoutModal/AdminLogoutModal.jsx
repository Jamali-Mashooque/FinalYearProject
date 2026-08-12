import "./AdminLogoutModal.css";
import { FaSignOutAlt, FaTimes } from "react-icons/fa";

const AdminLogoutModal = ({ show, onClose, onLogout }) => {

  if (!show) return null;

  return (

    <div className="logout-overlay">

      <div className="logout-modal">

        <div className="logout-header">

          <h2>

            <FaSignOutAlt />

            Logout

          </h2>

          <button onClick={onClose}>

            <FaTimes />

          </button>

        </div>

        <div className="logout-body">

          <div className="logout-icon">

            <FaSignOutAlt />

          </div>

          <h3>Are you sure?</h3>

          <p>

            You are about to logout from the Admin Dashboard.

          </p>

        </div>

        <div className="logout-footer">

          <button
            className="cancel-btn"
            onClick={onClose}
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

export default AdminLogoutModal;