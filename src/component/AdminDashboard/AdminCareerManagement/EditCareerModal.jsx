import { useEffect, useState } from "react";
import "./EditCareerModal.css";

import { updateCareer } from "../../../api/adminApi";

const EditCareerModal = ({
  career,
  onClose,
  fetchCareers,
}) => {

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    skills: "",
    icon: "",
  });

  useEffect(() => {

    if (career) {

      setFormData({
        title: career.title || "",
        category: career.category || "",
        description: career.description || "",
        skills: career.skills
          ? career.skills.join(", ")
          : "",
        icon: career.icon || "",
      });

    }

  }, [career]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await updateCareer(career._id, {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((item) => item.trim()),
      });

      alert("Career Updated Successfully");

      fetchCareers();

      onClose();

    } catch (error) {

      console.log(error);

      alert("Update Failed");

    }

  };

  return (

    <div className="career-modal-overlay">

      <div className="career-modal">

        <h2>Edit Career</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
          />

          <input
            type="text"
            name="icon"
            value={formData.icon}
            onChange={handleChange}
          />

          <div className="career-modal-buttons">

            <button type="submit">
              Update
            </button>

            <button
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default EditCareerModal;