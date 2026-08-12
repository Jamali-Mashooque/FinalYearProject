import { useEffect, useState } from "react";
import "./AdminStudents.css";
import StudentDetailsModal from "./StudentDetailsModal/StudentDetailsModal";
import {
  FaSearch,
  FaEye,
  FaCheck,
  FaTrash,
} from "react-icons/fa";

import {
  getAllUsers,
  approveUser,
  deleteUser,
} from "../../../api/adminApi";

const AdminStudents = () => {

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // ==========================
  // Fetch Students
  // ==========================

  const fetchStudents = async () => {
    try {

      const response = await getAllUsers();

      setStudents(response.users);

    } catch (error) {

      console.log(error);

      alert("Failed to load students.");

    }
  };

  useEffect(() => {

    fetchStudents();

  }, []);

  // ==========================
  // Approve Student
  // ==========================

  const handleApprove = async (id) => {

    try {

      const response = await approveUser(id);

      alert(response.message);

      fetchStudents();

    } catch (error) {

      console.log(error);

      alert("Approval Failed.");

    }

  };

  // ==========================
  // Delete Student
  // ==========================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {

      const response = await deleteUser(id);

      alert(response.message);

      fetchStudents();

    } catch (error) {

      console.log(error);

      alert("Delete Failed.");

    }

  };
const handleView = (student) => {
  setSelectedStudent(student);
  setShowModal(true);
};
  // ==========================
  // Search
  // ==========================

  const filteredStudents = students.filter((student) =>
    student.fullName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div className="admin-students">

      {/* Header */}

      <div className="students-header">

        <div>

          <h2>Students</h2>

          <p>
            Manage all registered students.
          </p>

        </div>

      </div>

      {/* Search */}

      <div className="students-toolbar">

        <div className="students-search">

          <FaSearch />

          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>

      {/* Table */}

      <div className="students-table">

        <table>

          <thead>

            <tr>

              <th>Name</th>

              <th>Email</th>

              <th>University</th>

              <th>Department</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

  {filteredStudents.map((student) => (

    <tr key={student._id}>

      <td>{student.fullName}</td>

      <td>{student.email}</td>

      <td>{student.university || "-"}</td>

      <td>{student.department || "-"}</td>

      <td>
        <span
          className={`status ${
            student.isVerified ? "active" : "pending"
          }`}
        >
          {student.isVerified ? "Approved" : "Pending"}
        </span>
      </td>

      <td>

        <div className="action-buttons">

          <button
  className="view"
  onClick={() => handleView(student)}
>
  <FaEye />
</button>

          {!student.isVerified && (
            <button
              className="edit"
              onClick={() => handleApprove(student._id)}
            >
              <FaCheck />
            </button>
          )}

          <button
            className="delete"
            onClick={() => handleDelete(student._id)}
          >
            <FaTrash />
          </button>

        </div>

      </td>

    </tr>

  ))}

</tbody>

        </table>

      </div>
{showModal && (
  <StudentDetailsModal
    student={selectedStudent}
    onClose={() => setShowModal(false)}
  />
)}
    </div>

  );

};

export default AdminStudents;