import { useState } from "react";
import "./Skills.css";

const technicalSuggestions = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Python",
];

const softSuggestions = [
  "Communication",
  "Leadership",
  "Teamwork",
  "Creativity",
  "Problem Solving",
];

const fieldSuggestions = [
  "Web Development",
  "Artificial Intelligence",
  "Data Science",
  "Mobile Apps",
  "Cyber Security",
];

const Skill = ({
  formData,
  setFormData,
  handleChange,
}) => {

  const [technicalInput, setTechnicalInput] =
    useState("");

  const [softInput, setSoftInput] =
    useState("");

  const [fieldInput, setFieldInput] =
    useState("");

  // ==========================
  // Add Item
  // ==========================

  const addItem = (
    field,
    value,
    clearInput
  ) => {

    const item = value.trim();

    if (!item) return;

    if (formData[field].includes(item)) {

      clearInput("");

      return;

    }

    setFormData((prev) => ({
      ...prev,
      [field]: [
        ...prev[field],
        item,
      ],
    }));

    clearInput("");

  };

  // ==========================
  // Remove Item
  // ==========================

  const removeItem = (
    field,
    value
  ) => {

    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter(
        (item) => item !== value
      ),
    }));

  };

  // ==========================
  // Enter Key
  // ==========================

  const handleKeyDown = (
    e,
    field,
    value,
    clearInput
  ) => {

    if (e.key === "Enter") {

      e.preventDefault();

      addItem(
        field,
        value,
        clearInput
      );

    }

  };

  // ==========================
  // Reusable Section
  // ==========================

  const renderSection = (
    title,
    description,
    suggestions,
    field,
    input,
    setInput
  ) => (

    <div className="skill-group">

      <h3>{title}</h3>

      <p className="skill-description">
        {description}
      </p>

      <div className="suggestion-row">

        {suggestions.map((item) => (

          <button
            key={item}
            type="button"
            className="suggestion-chip"
            onClick={() =>
              addItem(
                field,
                item,
                setInput
              )
            }
          >
            {item}
          </button>

        ))}

      </div>

      <div className="input-wrapper">

        <input
          type="text"
          placeholder={`Type ${title.toLowerCase()}...`}
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={(e) =>
            handleKeyDown(
              e,
              field,
              input,
              setInput
            )
          }
        />

        <button
          type="button"
          className="add-btn"
          onClick={() =>
            addItem(
              field,
              input,
              setInput
            )
          }
        >
          Add
        </button>

      </div>

      <div className="selected-items">

        {formData[field].map((item) => (

          <div
            key={item}
            className="selected-chip"
          >

            {item}

            <span
              onClick={() =>
                removeItem(
                  field,
                  item
                )
              }
            >
              ×
            </span>

          </div>

        ))}

      </div>

    </div>

  );

  return (

    <div className="skill-section">

      {/* Technical Skills */}

      {renderSection(
        "Technical Skills",
        "Optional — Select suggestions or add your own technical skills.",
        technicalSuggestions,
        "skills",
        technicalInput,
        setTechnicalInput
      )}

      {/* Soft Skills */}

      {renderSection(
        "Soft Skills",
        "Optional — Select suggestions or add your own soft skills.",
        softSuggestions,
        "softSkills",
        softInput,
        setSoftInput
      )}

      {/* Interested Fields */}

      {renderSection(
        "Interested Fields",
        "Optional — Select the fields you're interested in. AI will recommend the best available career based on your profile.",
        fieldSuggestions,
        "interestedFields",
        fieldInput,
        setFieldInput
      )}

      {/* Experience */}

      <div className="form-group">

        <label>

          Experience Level

        </label>

        <select
          name="experienceLevel"
          value={
            formData.experienceLevel
          }
          onChange={handleChange}
        >

          <option value="">
            Select Experience
          </option>

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

      </div>

    </div>

  );

};

export default Skill;