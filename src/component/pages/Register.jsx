import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/authApi";
import "./Register.css";

import registerBg from "../../assets/Register/register-bg.png";

import ProgressBar from "../ProgressBar/ProgressBar";
import PersonalDetail from "../PersonalInfo/PersonalDetail";
import AcademicDetail from "../Academic/AcademicDetail";
import Skill from "../Skills/Skills";
import Review from "../Review/Review";

const Register = () => {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({

    // Personal
    fullName: "",
    email: "",
    contact: "",
    gender: "",

   // Academic
educationLevel: "",

matricSchool: "",
matricPercentage: "",

intermediateCollege: "",
intermediatePercentage: "",

university: "",
department: "",
universityStatus: "",
    // Skills
    skills: [],
    softSkills: [],
    interestedFields: [],
    experienceLevel: "",

    // Review
    terms: false,

  });

  // ==========================
  // Handle Input
  // ==========================

  const handleChange = (e) => {

    const { name, value, checked, files, type } = e.target;

    setFormData((prev) => ({

      ...prev,

      [name]:
        files
          ? files[0]
          : type === "checkbox"
          ? checked
          : value,

    }));

  };

  // ==========================
  // Next Step


const nextStep = () => {

  // ==========================
  // Personal
  // ==========================

  if (step === 1) {

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.contact ||
      !formData.gender
    ) {

      alert("Please complete your personal information.");

      return;

    }

  }

  // ==========================
  // Academic
  // ==========================

  if (step === 2) {

    if (!formData.educationLevel) {

      alert("Please select your education level.");

      return;

    }

    // Matric Required

    if (
      !formData.matricSchool ||
      !formData.matricPercentage
    ) {

      alert("Please complete your matric information.");

      return;

    }

    // Intermediate Required

    if (
      formData.educationLevel === "Intermediate" ||
      formData.educationLevel === "University"
    ) {

      if (
        !formData.intermediateCollege ||
        !formData.intermediatePercentage
      ) {

        alert("Please complete your intermediate information.");

        return;

      }

    }

    // University Required

    if (
      formData.educationLevel === "University"
    ) {

      if (
        !formData.university ||
        !formData.department ||
        !formData.universityStatus
      ) {

        alert("Please complete your university information.");

        return;

      }

    }

  }

  // ==========================
  // Skills
  // ==========================

  if (step === 3) {

    if (!formData.experienceLevel) {

      alert("Please select your experience level.");
      return;

    }

  }
  if (step < 4) {

    setStep((prev) => prev + 1);

  }

};
  // ==========================
  // Previous
  // ==========================

  const previousStep = () => {

    if (step > 1) {

      setStep((prev) => prev - 1);

    }

  };

  // ==========================
  // Submit
  // ==========================

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.terms) {
    alert("Please accept the declaration.");
    return;
  }

  try {
    const response = await registerUser(formData);

    alert(response.data.message);

    console.log(response.data);

    // Reset Form
   setFormData({

  // Personal

  fullName: "",
  email: "",
  contact: "",
  gender: "",

  // Academic

  educationLevel: "",

  matricSchool: "",
  matricPercentage: "",

  intermediateCollege: "",
  intermediatePercentage: "",

  university: "",
  department: "",
  universityStatus: "",

  // Skills

  skills: [],
  softSkills: [],
   interestedFields: [],
  experienceLevel: "",

  // Review

  terms: false,

});

    setStep(1);

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Registration Failed"
    );

  }
};

  return (

    <section className="register">

      {/* Left */}

 {/* Left */}

<div className="register-left">

  <div className="left-bg-circle circle1"></div>
  <div className="left-bg-circle circle2"></div>

  <div className="left-content">

    <span className="left-badge">
      🚀 AI Career Learning Platform
    </span>

    <h1>
      Build Your
      <span> Future </span>
      With Artificial Intelligence
    </h1>

    <p>
      Join thousands of students discovering their ideal
      career path through Artificial Intelligence, personalized
      learning roadmaps, smart study planning and AI mentoring.
    </p>

    {/* Dashboard */}

    <div className="ai-dashboard">

      <div className="dashboard-header">

        <div className="ai-avatar">
          🤖
        </div>

        <div>

          <h3>AI Career Mentor</h3>

          <span>Online Now</span>

        </div>

      </div>

      <div className="dashboard-cards">

        <div className="mini-card">

          <h4>Career Match</h4>

          <strong>95%</strong>

        </div>

        <div className="mini-card">

          <h4>Study Planner</h4>

          <strong>Active</strong>

        </div>

        <div className="mini-card">

          <h4>Roadmap</h4>

          <strong>7 Modules</strong>

        </div>

        <div className="mini-card">

          <h4>AI Mentor</h4>

          <strong>24/7</strong>

        </div>

      </div>

      <div className="progress-box">

        <div className="progress-title">

          <span>Learning Progress</span>

          <strong>72%</strong>

        </div>

        <div className="progress-track">

          <div className="progress-fill"></div>

        </div>

      </div>

    </div>

    {/* Features */}

    <div className="feature-list">

      <div>✔ AI Career Recommendation</div>

      <div>✔ Personalized Study Planner</div>

      <div>✔ Smart Skill Assessment</div>

      <div>✔ AI Chat Mentor</div>

    </div>

  </div>

</div>

      {/* Right */}

      <div className="register-right">

        <div className="register-card">

          <h2>Create Your Student Account</h2>

          <p>

            Complete your registration to access the AI Career & Study Growth Platform.

          </p>

          <ProgressBar step={step} />

          <form onSubmit={handleSubmit}>

            {/* Step 1 */}

            {step === 1 && (

              <PersonalDetail
                formData={formData}
                handleChange={handleChange}
              />

            )}

            {/* Step 2 */}

            {step === 2 && (

              <AcademicDetail
                formData={formData}
                handleChange={handleChange}
              />

            )}

            {/* Step 3 */}

            {step === 3 && (

              <Skill
                formData={formData}
                setFormData={setFormData}
                handleChange={handleChange}
              />

            )}

            {/* Step 4 */}

            {step === 4 && (

              <Review
                formData={formData}
                handleChange={handleChange}
              />

            )}

            {/* Buttons */}

            <div className="register-buttons">

              {step > 1 && (

                <button
                  type="button"
                  className="previous-btn"
                  onClick={previousStep}
                >
                  Previous
                </button>

              )}

              {step < 4 ? (

                <button
                  type="button"
                  className="next-btn"
                  onClick={nextStep}
                >
                  Continue
                </button>

              ) : (

                <button
                  type="submit"
                  className="submit-btn"
                >
                  Create Account
                </button>

              )}

            </div>

            {/* Login */}

            <div className="login-link">

              Already have an account?

              <span onClick={() => navigate("/login")}>

                Login

              </span>

            </div>

          </form>

        </div>

      </div>

    </section>

  );

};

export default Register;