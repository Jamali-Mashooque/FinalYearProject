import { useState } from "react";
import "./Profile.css";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUniversity,
  FaGraduationCap,
  FaBriefcase,
  FaEdit,
} from "react-icons/fa";

import { updateProfile } from "../../../api/authApi";
import { useUser } from "../../../context/UserContext";

const Profile = () => {
  const { user, setUser, fetchUser, loading } = useUser();

  const [editMode, setEditMode] = useState(false);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await updateProfile(user);

      alert(res.data.message);

      await fetchUser();

      setEditMode(false);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to update profile."
      );
    }
  };

  return (
    <div className="profile-page">

      {/* Header */}

      <div className="profile-header">

        <div className="profile-avatar">
          {user.fullName?.charAt(0).toUpperCase()}
        </div>

        <div>

          {editMode ? (
            <input
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
            />
          ) : (
            <h2>{user.fullName}</h2>
          )}

          {editMode ? (
            <input
              type="text"
              name="department"
              value={user.department}
              onChange={handleChange}
            />
          ) : (
            <p>{user.department}</p>
          )}

          {editMode ? (
            <input
              type="text"
              name="university"
              value={user.university}
              onChange={handleChange}
            />
          ) : (
            <span>{user.university}</span>
          )}

        </div>

        <button
          onClick={() => setEditMode(!editMode)}
        >
          <FaEdit />
          {editMode ? "Cancel" : "Edit Profile"}
        </button>

      </div>

      {/* Personal Information */}

      <div className="profile-card">

        <h3>Personal Information</h3>

        <div className="profile-grid">

          <div>

            <FaUser />

            <span>Full Name</span>

            {editMode ? (
              <input
                type="text"
                name="fullName"
                value={user.fullName}
                onChange={handleChange}
              />
            ) : (
              <p>{user.fullName}</p>
            )}

          </div>

          <div>

            <FaEnvelope />

            <span>Email</span>

            <p>{user.email}</p>

          </div>

          <div>

            <FaPhone />

            <span>Phone</span>

            {editMode ? (
              <input
                type="text"
                name="contact"
                value={user.contact}
                onChange={handleChange}
              />
            ) : (
              <p>{user.contact}</p>
            )}

          </div>

          <div>

            <FaMapMarkerAlt />

            <span>Gender</span>

            {editMode ? (
              <select
                name="gender"
                value={user.gender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p>{user.gender}</p>
            )}

          </div>

        </div>

      </div>
            {/* Academic Information */}

      <div className="profile-card">

        <h3>Academic Information</h3>

        <div className="profile-grid">

          <div>

            <FaGraduationCap />

            <span>Matric School</span>

            <p>{user.matricSchool}</p>

          </div>

          <div>

            <FaGraduationCap />

            <span>Matric %</span>

            <p>{user.matricPercentage}%</p>

          </div>

          <div>

            <FaUniversity />

            <span>University</span>

            {editMode ? (
              <input
                type="text"
                name="university"
                value={user.university}
                onChange={handleChange}
              />
            ) : (
              <p>{user.university}</p>
            )}

          </div>

          <div>

            <FaUniversity />

            <span>Department</span>

            {editMode ? (
              <input
                type="text"
                name="department"
                value={user.department}
                onChange={handleChange}
              />
            ) : (
              <p>{user.department}</p>
            )}

          </div>

        </div>

      </div>

      {/* Skills */}

      {/* Technical Skills */}

<div className="profile-card">

  <h3>Technical Skills</h3>

  <div className="skills">

    {user.skills?.length > 0 ? (

      user.skills.map((skill, index) => (
        <span key={index}>{skill}</span>
      ))

    ) : (

      <p className="empty-text">
        No technical skills added yet.
      </p>

    )}

  </div>

</div>

{/* Soft Skills */}

<div className="profile-card">

  <h3>Soft Skills</h3>

  <div className="skills">

    {user.softSkills?.length > 0 ? (

      user.softSkills.map((skill, index) => (
        <span key={index}>{skill}</span>
      ))

    ) : (

      <p className="empty-text">
        No soft skills added yet.
      </p>

    )}

  </div>

</div>

{/* Interested Fields */}

<div className="profile-card">

  <h3>Interested Fields</h3>

  <div className="skills">

    {user.interestedFields?.length > 0 ? (

      user.interestedFields.map((field, index) => (
        <span key={index}>{field}</span>
      ))

    ) : (

      <p className="empty-text">
        No interested fields selected.
      </p>

    )}

  </div>

</div>


     {/* Experience */}

<div className="profile-card">

  <h3>Experience Level</h3>

  <div className="experience-box">

    <FaBriefcase />

    <div>

      {editMode ? (

        <select
          name="experienceLevel"
          value={user.experienceLevel}
          onChange={handleChange}
        >

          <option value="No Experience">
            No Experience
          </option>

          <option value="Beginner">
            Beginner
          </option>

          <option value="Intermediate">
            Intermediate
          </option>

          <option value="Advanced">
            Advanced
          </option>

        </select>

      ) : (

        <>
          <h4>
            {user.experienceLevel}
          </h4>

          <p>
            Current Experience Level
          </p>
        </>

      )}

    </div>

  </div>

</div>

      {editMode && (

        <button
          className="save-btn"
          onClick={handleUpdate}
        >
          Save Changes
        </button>

      )}

    </div>
  );
};

export default Profile;