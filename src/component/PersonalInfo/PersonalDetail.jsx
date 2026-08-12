import "./PersonalDetail.css";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaVenusMars,
} from "react-icons/fa";

const PersonalDetail = ({ formData, handleChange }) => {
  return (
    <div className="personal">

      <h3>Personal Information</h3>

      <p>
        Fill in your personal information to continue your registration.
      </p>

      <div className="two-column">

        {/* Full Name */}

        <div className="input-group">

          <label>Full Name *</label>

          <div className="input-box">

            <FaUser />

            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
            />

          </div>

        </div>

        {/* Email */}

        <div className="input-group">

          <label>Email Address *</label>

          <div className="input-box">

            <FaEnvelope />

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

          </div>

        </div>

        {/* Contact */}

        <div className="input-group">

          <label>Contact Number *</label>

          <div className="input-box">

            <FaPhone />

            <input
              type="number"
              name="contact"
              placeholder="03XXXXXXXXX"
              value={formData.contact}
              onChange={handleChange}
            />

          </div>

        </div>

        {/* Date of Birth */}

        <div className="input-group">

          <label>Date of Birth *</label>

          <div className="input-box">

            <FaCalendarAlt />

            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />

          </div>

        </div>

        {/* Gender */}

        <div className="input-group full-width">

          <label>Gender *</label>

          <div className="input-box">

            <FaVenusMars />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer not to say">
              Other
              </option>
            </select>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PersonalDetail;