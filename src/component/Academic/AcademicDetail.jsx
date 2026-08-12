import "./AcademicDetail.css";
import {
  FaSchool,
  FaUniversity,
  FaPercentage,
  FaBuilding,
  FaGraduationCap,
} from "react-icons/fa";

const AcademicDetail = ({
  formData,
  handleChange,
}) => {
  return (
    <div className="academic">

      <h3>Academic Information</h3>

      <p>
        Tell us about your educational background to receive
        personalized career recommendations.
      </p>

      {/* =========================================
          Education Level
      ========================================= */}

      <div className="academic-card">

        <h4>
          Current Education Level
          <span>* Required</span>
        </h4>

        <div className="input-group">

          <label>Education Level</label>

          <div className="input-box">

            <FaGraduationCap />

            <select
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleChange}
            >
              <option value="">
                Select Education Level
              </option>

              <option value="Matric">
                Matric / Secondary
              </option>

              <option value="Intermediate">
                Intermediate / College
              </option>

              <option value="University">
                University
              </option>

            </select>

          </div>

        </div>

      </div>

      {/* =========================================
          Matric (Always Visible)
      ========================================= */}

      <div className="academic-card">

        <h4>
          Matric / Secondary School
          <span>* Required</span>
        </h4>

        <div className="academic-grid">

          <div className="input-group">

            <label>School Name</label>

            <div className="input-box">

              <FaSchool />

              <input
                type="text"
                name="matricSchool"
                placeholder="Enter school name"
                value={formData.matricSchool}
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="input-group">

            <label>Percentage</label>

            <div className="input-box">

              <FaPercentage />

              <input
                type="text"
                name="matricPercentage"
                placeholder="85%"
                value={formData.matricPercentage}
                onChange={handleChange}
              />

            </div>

          </div>

        </div>

      </div>

      {/* =========================================
          Intermediate
      ========================================= */}

      {(formData.educationLevel === "Intermediate" ||
        formData.educationLevel === "University") && (

        <div className="academic-card">

          <h4>
            Intermediate / College
            <span>* Required</span>
          </h4>

          <div className="academic-grid">

            <div className="input-group">

              <label>College Name</label>

              <div className="input-box">

                <FaSchool />

                <input
                  type="text"
                  name="intermediateCollege"
                  placeholder="Enter college name"
                  value={formData.intermediateCollege}
                  onChange={handleChange}
                />

              </div>

            </div>

            <div className="input-group">

              <label>Percentage</label>

              <div className="input-box">

                <FaPercentage />

                <input
                  type="text"
                  name="intermediatePercentage"
                  placeholder="78%"
                  value={formData.intermediatePercentage}
                  onChange={handleChange}
                />

              </div>

            </div>

          </div>

        </div>

      )}
            {/* =========================================
          University
      ========================================= */}

      {formData.educationLevel === "University" && (

        <div className="academic-card">

          <h4>
            University
            <span>* Required</span>
          </h4>

          <div className="academic-grid">

            <div className="input-group">

              <label>University Name</label>

              <div className="input-box">

                <FaUniversity />

                <input
                  type="text"
                  name="university"
                  placeholder="University Name"
                  value={formData.university}
                  onChange={handleChange}
                />

              </div>

            </div>

            <div className="input-group">

              <label>Department</label>

              <div className="input-box">

                <FaBuilding />

                <input
                  type="text"
                  name="department"
                  placeholder="Computer Science"
                  value={formData.department}
                  onChange={handleChange}
                />

              </div>

            </div>

          </div>

          <div className="status-group">

            <label>Current Status</label>

            <div className="status-options">

              <label>

                <input
                  type="radio"
                  name="universityStatus"
                  value="Continue"
                  checked={
                    formData.universityStatus ===
                    "Continue"
                  }
                  onChange={handleChange}
                />

                Continue

              </label>

              <label>

                <input
                  type="radio"
                  name="universityStatus"
                  value="Completed"
                  checked={
                    formData.universityStatus ===
                    "Completed"
                  }
                  onChange={handleChange}
                />

                Completed

              </label>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default AcademicDetail;