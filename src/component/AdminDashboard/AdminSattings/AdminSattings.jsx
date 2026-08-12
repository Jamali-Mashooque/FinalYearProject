import "./AdminSattings.css";

import {
  FaUserShield,
  FaEnvelope,
  FaRobot,
  FaGlobe,
  FaServer,
  FaInfoCircle,
} from "react-icons/fa";

const AdminSettings = () => {

  return (

    <div className="admin-settings">

      {/* Header */}

      <div className="settings-header">

        <h2>System Settings</h2>

        <p>
          AI Career & Study Growth Platform Configuration
        </p>

      </div>

      {/* Top Cards */}

      <div className="settings-grid">

        {/* Admin */}

        <div className="settings-card">

          <h3>

            <FaUserShield />

            Admin Information

          </h3>

          <label>Administrator</label>

          <input
            type="text"
            value="Mashooque Ali"
            readOnly
          />

          <label>Email</label>

          <div className="input-icon">

            <FaEnvelope />

            <input
              type="email"
              value="admin@gmail.com"
              readOnly
            />

          </div>

        </div>

        {/* AI */}

        <div className="settings-card">

          <h3>

            <FaRobot />

            AI Configuration

          </h3>

          <label>AI Model</label>

          <input
            type="text"
            value="OpenAI GPT"
            readOnly
          />

          <label>Recommendation Engine</label>

          <input
            type="text"
            value="Active"
            readOnly
          />

          <label>Study Roadmap Generator</label>

          <input
            type="text"
            value="Active"
            readOnly
          />

        </div>

      </div>

      {/* Platform */}

      <div className="settings-card">

        <h3>

          <FaGlobe />

          Platform Information

        </h3>

        <label>Platform Name</label>

        <input
          type="text"
          value="AI Career & Study Growth Platform"
          readOnly
        />

        <label>Technology Stack</label>

        <div className="input-icon">

          <FaServer />

          <input
            type="text"
            value="MERN Stack"
            readOnly
          />

        </div>

        <label>Database</label>

        <input
          type="text"
          value="MongoDB"
          readOnly
        />

        <label>Version</label>

        <input
          type="text"
          value="Version 1.0"
          readOnly
        />

        <label>System Status</label>

        <div className="input-icon">

          <FaInfoCircle />

          <input
            type="text"
            value="Running Successfully"
            readOnly
          />

        </div>

      </div>

    </div>

  );

};

export default AdminSettings;