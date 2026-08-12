import "./Review.css";
import { FaUser, FaGraduationCap, FaStar } from "react-icons/fa";

const Review = ({ formData, handleChange }) => {
  return (
    <div className="review">

      <h3>Review Your Information</h3>

      <p>
        Please review your information before creating your account.
      </p>

      {/* Personal */}

      <div className="review-card">

        <div className="review-title">
          <FaUser />
          <h4>Personal Information</h4>
        </div>

        <div className="review-grid">

          <div>
            <span>Full Name</span>
            <p>{formData.fullName}</p>
          </div>

          <div>
            <span>Email</span>
            <p>{formData.email}</p>
          </div>

          <div>
            <span>Contact Number</span>
            <p>{formData.contact}</p>
          </div>

          <div>
            <span>Gender</span>
            <p>{formData.gender}</p>
          </div>

        </div>

      </div>

      {/* Academic */}

      <div className="review-card">

        <div className="review-title">
          <FaGraduationCap />
          <h4>Academic Information</h4>
        </div>

        <div className="review-grid">

          <div>
            <span>Matric School</span>
            <p>{formData.matricSchool}</p>
          </div>

          <div>
            <span>Matric Percentage</span>
            <p>{formData.matricPercentage}</p>
          </div>

          <div>
            <span>Intermediate College</span>
            <p>{formData.intermediateCollege || "-"}</p>
          </div>

          <div>
            <span>Intermediate Percentage</span>
            <p>{formData.intermediatePercentage || "-"}</p>
          </div>

          <div>
            <span>University</span>
            <p>{formData.university || "-"}</p>
          </div>

          <div>
            <span>Department</span>
            <p>{formData.department || "-"}</p>
          </div>

          <div>
            <span>Status</span>
            <p>{formData.universityStatus || "-"}</p>
          </div>

        </div>

      </div>

      {/* Skills */}

      <div className="review-card">

        <div className="review-title">
          <FaStar />
          <h4>Skills & Career Goal</h4>
        </div>

        <div className="review-grid">

          <div>
            <span>Technical Skills</span>
            <p>
              {formData.skills.length > 0
                ? formData.skills.join(", ")
                : "-"}
            </p>
          </div>

          <div>
            <span>Soft Skills</span>
            <p>
              {formData.softSkills.length > 0
                ? formData.softSkills.join(", ")
                : "-"}
            </p>
          </div>

          <div>
            <span>Career Goal</span>
            <p>{formData.careerGoal}</p>
          </div>

          <div>
            <span>Experience Level</span>
            <p>{formData.experienceLevel}</p>
          </div>

        </div>

      </div>

      {/* Terms */}

      <div className="checkbox">

        <input
          type="checkbox"
          id="terms"
          name="terms"
          checked={formData.terms}
          onChange={handleChange}
        />

        <label htmlFor="terms">
          I confirm that all the above information is correct.
        </label>

      </div>

      {/* Verification */}

      <div className="verify-note">

        <h4>📧 Email Verification</h4>

        <p>
          After submitting your registration, your account will be reviewed.
          Once approved, you'll receive an email to set your password and activate your account.
        </p>

      </div>

    </div>
  );
};

export default Review;