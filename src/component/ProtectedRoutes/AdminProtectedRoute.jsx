import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "Admin") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminProtectedRoute;