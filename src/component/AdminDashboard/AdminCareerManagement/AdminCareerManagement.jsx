import { useEffect, useState } from "react";
import "./AdminCareerManagement.css";

import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";

import {
  getAllCareers,
  deleteCareer,
} from "../../../api/adminApi";

import AddCareerModal from "./AddCareerModal";
import EditCareerModal from "./EditCareerModal";
import ViewCareerModal from "./ViewCareerModal";

const AdminCareerManagement = () => {
  const [careers, setCareers] = useState([]);
  const [search, setSearch] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [selectedCareer, setSelectedCareer] = useState(null);

  // ===========================
  // Fetch Careers
  // ===========================

  const fetchCareers = async () => {
    try {
      const response = await getAllCareers();
      setCareers(response.careers);
    } catch (error) {
      console.log(error);
      alert("Failed to load careers.");
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  // ===========================
  // Delete Career
  // ===========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this career?"
    );

    if (!confirmDelete) return;

    try {
      const response = await deleteCareer(id);

      alert(response.message);

      fetchCareers();
    } catch (error) {
      console.log(error);
      alert("Delete Failed.");
    }
  };

  // ===========================
  // View Career
  // ===========================

  const handleView = (career) => {
    setSelectedCareer(career);
    setShowViewModal(true);
  };

  // ===========================
  // Edit Career
  // ===========================

  const handleEdit = (career) => {
    setSelectedCareer(career);
    setShowEditModal(true);
  };

  // ===========================
  // Search
  // ===========================

  const filteredCareers = careers.filter((career) =>
    career.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="career-management">

      {/* Header */}

      <div className="career-header">
        <div>
          <h2>Career Management</h2>
          <p>Manage AI Career Recommendations</p>
        </div>

        <button onClick={() => setShowAddModal(true)}>
          <FaPlus />
          Add Career
        </button>
      </div>

      {/* Search */}

      <div className="career-search">
        <FaSearch />

        <input
          type="text"
          placeholder="Search career..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Cards */}

      <div className="career-grid">
        {filteredCareers.length > 0 ? (
          filteredCareers.map((career) => (
            <div
              className="career-card"
              key={career._id}
            >
              <div className="career-icon">
                {career.icon || "💼"}
              </div>

              <h3>{career.title}</h3>

              <p>
                <strong>Skills:</strong>
                <br />
                {career.skills?.join(", ")}
              </p>

              <span>{career.category}</span>

              <div className="career-actions">

                <button
                  className="view"
                  onClick={() => handleView(career)}
                >
                  <FaEye />
                </button>

                <button
                  className="edit"
                  onClick={() => handleEdit(career)}
                >
                  <FaEdit />
                </button>

                <button
                  className="delete"
                  onClick={() => handleDelete(career._id)}
                >
                  <FaTrash />
                </button>

              </div>

            </div>
          ))
        ) : (
          <h3>No Careers Found</h3>
        )}
      </div>

      {/* Add Career */}

      {showAddModal && (
        <AddCareerModal
          onClose={() => setShowAddModal(false)}
          fetchCareers={fetchCareers}
        />
      )}

      {/* Edit Career */}

      {showEditModal && (
        <EditCareerModal
          career={selectedCareer}
          onClose={() => setShowEditModal(false)}
          fetchCareers={fetchCareers}
        />
      )}

      {/* View Career */}

      {showViewModal && (
        <ViewCareerModal
          career={selectedCareer}
          onClose={() => setShowViewModal(false)}
        />
      )}

    </div>
  );
};

export default AdminCareerManagement;