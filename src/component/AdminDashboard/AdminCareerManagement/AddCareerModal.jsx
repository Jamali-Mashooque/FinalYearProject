import { useState } from "react";
import "./AddCareerModal.css";

import { addCareer } from "../../../api/adminApi";

const AddCareerModal = ({ onClose, fetchCareers }) => {

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        skills: "",
        duration: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await addCareer({
                ...formData,
                skills: formData.skills
                    .split(",")
                    .map((skill) => skill.trim()),
            });

            fetchCareers();

            onClose();

            alert("Career Added Successfully");

        } catch (error) {

            console.log(error);

            alert("Failed to Add Career");

        }

    };

    return (

        <div className="career-modal-overlay">

            <div className="career-modal">

                <h2>Add Career</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="title"
                        placeholder="Career Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="skills"
                        placeholder="HTML, CSS, React"
                        value={formData.skills}
                        onChange={handleChange}
                    />

                     <input
                       type="text"
                       name="duration"
                       placeholder="Duration (e.g. 6 Months)"
                       value={formData.duration}
                       onChange={handleChange}
                    />

                    <div className="career-modal-buttons">

                        <button type="submit">
                            Save
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

export default AddCareerModal;